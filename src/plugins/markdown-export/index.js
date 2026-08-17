/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * markdown-export
 *
 * Emits a plain-Markdown twin next to every generated HTML page, so that any
 * page URL answers with clean Markdown when `.md` is appended:
 *
 *   /docs/introduction/cbdb-overview  ->  /docs/introduction/cbdb-overview.md
 *
 * The output is aimed at LLM consumption: React/MDX machinery is stripped, but
 * the prose, tables and code samples are kept verbatim. Nothing about the
 * rendered site changes -- this plugin only adds files to the build output.
 *
 * Companion pieces (not implemented here): an llms.txt index, and the
 * per-page "Copy as Markdown" menu that links to these URLs.
 */

const fs = require("fs/promises");
const path = require("path");
const logger = require("@docusaurus/logger");

const { sitemapPermalinks, markdownPathFor } = require("./registry");

const PLUGIN_NAME = "markdown-export";

/** Components that carry no prose of their own; drop the tag, keep children. */
const STRUCTURAL_TAGS = ["Tabs", "TabItem"];
/** Components whose content lives in JS, not Markdown; nothing to salvage. */
const OPAQUE_TAGS = ["DocCardList", "Timeline", "Contributors"];

const DROP_TAG_RE = new RegExp(
  `^\\s*</?(?:${[...STRUCTURAL_TAGS, ...OPAQUE_TAGS].join("|")})\\b[^>]*/?>\\s*$`,
);

/**
 * The same structural tags, but wherever they sit on a line. Authors usually
 * give them their own line, in which case `DROP_TAG_RE` has already handled
 * them; this catches `<TabItem label="x">text</TabItem>` written inline, whose
 * closing tag would otherwise survive into the Markdown.
 *
 * Only the structural tags: dropping an opaque tag inline would leave its
 * children behind, and those are JS expressions, not prose.
 */
const STRUCTURAL_INLINE_RE = new RegExp(
  `</?(?:${STRUCTURAL_TAGS.join("|")})\\b[^>]*/?>`,
  "g",
);

/**
 * ESM imports only. Deliberately requires a `from "..."` clause (or a bare
 * side-effect import) so that Java's `import java.sql.Connection;` and
 * Python's `import pyodbc` are never matched -- those appear in code samples.
 */
const ESM_IMPORT_RE =
  /^import\s+(?:[^;'"]*\s+from\s+)?['"][^'"]+['"];?\s*$|^import\s+[\w*{][^;]*\s+from\s+['"][^'"]+['"];?\s*$/;

/** `export const history = [ ... ]` and friends. Never matches `export FOO=bar`. */
const ESM_EXPORT_RE = /^export\s+(?:const|let|var|default|function|class|\{)\b/;

const FENCE_RE = /^\s*(`{3,}|~{3,})/;

/**
 * Docusaurus' escape hatch for putting JSX where MDX would not otherwise allow
 * it. It looks like a code fence but its contents are *evaluated*, not
 * displayed, so it must be unwrapped rather than passed through verbatim.
 * @see https://docusaurus.io/docs/markdown-features/react#markdown-and-jsx-interoperability
 */
const MDX_CODE_BLOCK = "mdx-code-block";

// ---------------------------------------------------------------------------
// Front matter
// ---------------------------------------------------------------------------

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/;

function splitFrontMatter(raw) {
  const match = FRONT_MATTER_RE.exec(raw);
  if (!match) {
    return { fields: {}, body: raw };
  }
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    // Top-level scalars only; nested YAML is irrelevant to what we emit.
    const kv = /^([A-Za-z_][\w-]*):[ \t]*(.*)$/.exec(line);
    if (kv) {
      fields[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, "$1");
    }
  }
  return { fields, body: raw.slice(match[0].length) };
}

// ---------------------------------------------------------------------------
// Body sanitiser
// ---------------------------------------------------------------------------

/**
 * Strip MDX/JSX constructs while leaving fenced code blocks completely
 * untouched. Fence tracking is what makes this safe: the docs contain shell
 * samples with `export VAR=...`, Java samples with `import java.sql.*;`, and
 * pg_filedump output containing literal `<Header>` / `<Data>` markers -- all of
 * which a line-oriented stripper would happily corrupt.
 *
 * @returns {{body: string, hasH1: boolean, prose: string}}
 *   `prose` is the emitted text minus every fenced block -- the only region
 *   where a leaked component tag would be a real defect. Collected here rather
 *   than by a second pass so the two can never disagree about fence state.
 */
function sanitizeBody(body) {
  const lines = body.split("\n");
  const out = [];
  const prose = [];

  let fence = null; // {char: '`'|'~', len: number}
  let inMdxComment = false;
  let exportDepth = null; // bracket balance while consuming an ESM export

  let hasH1 = false;

  for (const line of lines) {
    // --- fenced code: verbatim passthrough, and the only place we track state
    const fenceMatch = FENCE_RE.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) {
        const info = line.slice(line.indexOf(marker) + marker.length).trim();
        // A transparent fence contributes no delimiters of its own; its body
        // falls through to the MDX handling below.
        fence = {
          char: marker[0],
          len: marker.length,
          transparent: info === MDX_CODE_BLOCK,
        };
        if (!fence.transparent) {
          out.push(line);
        }
        continue;
      }
      if (marker[0] === fence.char && marker.length >= fence.len) {
        const { transparent } = fence;
        fence = null;
        if (!transparent) {
          out.push(line);
        }
        continue;
      }
      out.push(line);
      continue;
    }
    if (fence && !fence.transparent) {
      out.push(line);
      continue;
    }

    // --- multi-line constructs opened on an earlier line
    if (inMdxComment) {
      if (line.includes("*/}")) {
        inMdxComment = false;
      }
      continue;
    }
    if (exportDepth !== null) {
      exportDepth += bracketDelta(line);
      if (exportDepth <= 0) {
        exportDepth = null;
      }
      continue;
    }

    // --- single-line MDX machinery
    if (ESM_IMPORT_RE.test(line)) {
      continue;
    }
    if (ESM_EXPORT_RE.test(line)) {
      const delta = bracketDelta(line);
      if (delta > 0) {
        exportDepth = delta;
      }
      continue;
    }
    if (line.includes("{/*")) {
      if (!line.includes("*/}")) {
        inMdxComment = true;
        continue;
      }
      const stripped = line.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").trim();
      if (stripped === "") {
        continue;
      }
      out.push(stripped);
      continue;
    }

    // --- components
    // A tab's `label` is real prose (e.g. "For Rocky Linux 8"); promote it to
    // bold text so the branch each code block belongs to survives.
    let text = line.replace(
      /<TabItem\b[^>]*\blabel=(["'])(.*?)\1[^>]*>/g,
      (_all, _quote, label) => `**${label}**\n`,
    );
    if (DROP_TAG_RE.test(text)) {
      continue;
    }
    const withoutStructural = text.replace(STRUCTURAL_INLINE_RE, "");
    if (withoutStructural.trim() === "" && text.trim() !== "") {
      continue;
    }
    text = withoutStructural;

    if (!hasH1 && /^#\s+\S/.test(text)) {
      hasH1 = true;
    }
    out.push(text);
    prose.push(text);
  }

  const collapsed = out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { body: collapsed, hasH1, prose: prose.join("\n") };
}

function bracketDelta(line) {
  let delta = 0;
  for (const ch of line) {
    if (ch === "(" || ch === "[" || ch === "{") delta++;
    else if (ch === ")" || ch === "]" || ch === "}") delta--;
  }
  return delta;
}

// ---------------------------------------------------------------------------
// Self-check
// ---------------------------------------------------------------------------

/**
 * Every capitalised binding an ESM import brings into scope -- i.e. every name
 * that could legally appear as `<Name />` further down the file.
 */
const IMPORT_BINDINGS_RE =
  /^import\s+(?:(\w+)\s*(?:,\s*\{([^}]*)\})?|\{([^}]*)\})\s+from\s+['"][^'"]+['"]/gm;

/**
 * @param {string} raw the untouched source file
 * @returns {string[]} component names this file could render
 */
function importedComponents(raw) {
  const names = new Set();

  for (const match of raw.matchAll(IMPORT_BINDINGS_RE)) {
    const [, defaultBinding, ...namedGroups] = match;
    const candidates = [defaultBinding];
    for (const group of namedGroups) {
      if (group) {
        // `{ Foo, Bar as Baz }` -- the local name is what gets rendered.
        candidates.push(...group.split(",").map((part) => part.trim().split(/\s+/).pop()));
      }
    }
    for (const name of candidates) {
      if (name && /^[A-Z]/.test(name)) {
        names.add(name);
      }
    }
  }
  return [...names];
}

/**
 * Flags components that survived sanitising.
 *
 * Derived from each file's own imports rather than from a hard-coded list, so
 * this check covers components that do not exist yet: introduce
 * `<Admonition />` tomorrow and it is audited without touching this plugin.
 *
 * Scanning for bare capitalised tags instead would be unusable -- the docs are
 * full of placeholder notation (`<SEGID>`, `<PID>`, `<YYYYMMDD>`) and Rust
 * generics (`<T>`, `<AnyRange>`) that are prose, not JSX.
 *
 * @returns {string[]} names still present in the emitted prose
 */
function leakedComponents(raw, prose) {
  return importedComponents(raw).filter(
    (name) =>
      new RegExp(`</?${name}\\b`).test(prose) ||
      new RegExp(`^import\\s[^\\n]*\\b${name}\\b`, "m").test(prose),
  );
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function renderMarkdown({ fields, body, hasH1, canonicalUrl }) {
  const header = ["---"];
  if (fields.title) {
    header.push(`title: ${yamlQuote(fields.title)}`);
  }
  if (fields.description) {
    header.push(`description: ${yamlQuote(fields.description)}`);
  }
  header.push(`source: ${canonicalUrl}`);
  header.push("---");

  // Docusaurus synthesises the <h1> from front matter when the body has none;
  // replay that here so the Markdown twin is not left title-less.
  if (!hasH1 && fields.title) {
    header.push("", `# ${fields.title}`);
  }

  return `${header.join("\n")}\n\n${body}\n`;
}

// ---------------------------------------------------------------------------
// Path mapping
// ---------------------------------------------------------------------------

/** `@site/docs/foo.md` -> absolute path. */
function resolveSource(source, siteDir) {
  return source.startsWith("@site/")
    ? path.join(siteDir, source.slice("@site/".length))
    : path.resolve(siteDir, source);
}

/**
 * `/docs/introduction/cbdb-overview` -> `<outDir>/docs/introduction/cbdb-overview.md`
 * `/docs/`                           -> `<outDir>/docs/index.md`
 */
function permalinkToFile(permalink, baseUrl, outDir) {
  let rel = markdownPathFor(permalink);
  if (baseUrl && baseUrl !== "/" && rel.startsWith(baseUrl)) {
    rel = rel.slice(baseUrl.length);
  }
  rel = rel.replace(/^\/+/, "");

  const target = path.join(outDir, ...rel.split("/"));

  // Refuse to escape the build directory, whatever a permalink claims.
  const resolved = path.resolve(target);
  if (resolved !== path.resolve(outDir) && !resolved.startsWith(path.resolve(outDir) + path.sep)) {
    return null;
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// Content collection
// ---------------------------------------------------------------------------

function collectDocs(allContent, excludeVersions) {
  const entries = [];
  const instances = allContent["docusaurus-plugin-content-docs"] ?? {};

  for (const [pluginId, content] of Object.entries(instances)) {
    const excluded = excludeVersions[pluginId] ?? [];
    for (const version of content?.loadedVersions ?? []) {
      if (excluded.includes(version.versionName)) {
        continue;
      }
      for (const doc of version.docs ?? []) {
        // `drafts` live in a separate array, but guard anyway.
        if (doc.draft) {
          continue;
        }
        entries.push({
          permalink: doc.permalink,
          source: doc.source,
          pluginId,
          version: version.versionName,
        });
      }
    }
  }
  return entries;
}

function collectBlog(allContent) {
  const entries = [];
  const instances = allContent["docusaurus-plugin-content-blog"] ?? {};

  for (const content of Object.values(instances)) {
    for (const post of content?.blogPosts ?? []) {
      const meta = post?.metadata ?? post;
      if (!meta?.permalink || !meta?.source) {
        continue;
      }
      entries.push({ permalink: meta.permalink, source: meta.source });
    }
  }
  return entries;
}

/**
 * The pages plugin does not expose its Markdown sources through `allContent`,
 * but its routing is a plain mirror of the filesystem, so walk it directly.
 * Only `.md` pages qualify -- `.tsx` pages have no Markdown to export.
 */
async function collectPages(pagesDir, baseUrl) {
  const entries = [];

  async function walk(dir) {
    let dirents;
    try {
      dirents = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const dirent of dirents) {
      const abs = path.join(dir, dirent.name);
      if (dirent.isDirectory()) {
        await walk(abs);
        continue;
      }
      // Leading `_` marks a partial; Docusaurus does not route those.
      if (!dirent.name.endsWith(".md") || dirent.name.startsWith("_")) {
        continue;
      }

      const rel = path.relative(pagesDir, abs).split(path.sep).join("/");
      const routePath = rel.replace(/\.md$/, "").replace(/(^|\/)index$/, "$1");
      entries.push({
        permalink: `${baseUrl}${routePath}`,
        source: abs,
      });
    }
  }

  await walk(pagesDir);
  return entries;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Where the dev server's twins live. Inside `.docusaurus`, which is already
 * git-ignored and cleared by `docusaurus clear`.
 */
function devOutDir(siteDir) {
  return path.join(siteDir, ".docusaurus", PLUGIN_NAME);
}

/**
 * Writes the Markdown twin for every entry.
 *
 * @param {object} args
 * @param {Array<{permalink: string, source: string}>} args.entries
 * @param {string} args.outDir where the twins go
 * @param {string} args.siteDir
 * @param {{baseUrl: string, url: string}} args.siteConfig
 * @param {boolean} [args.skipUnchanged]
 *   Skip an entry whose twin is newer than its source. Used by the dev server,
 *   which re-exports on every content reload; a production build always starts
 *   from an empty output directory, so there is nothing to skip.
 * @returns {Promise<{written: number, bytes: number, failures: string[], leaks: string[]}>}
 */
async function exportTwins({
  entries,
  outDir,
  siteDir,
  siteConfig,
  skipUnchanged = false,
}) {
  let written = 0;
  let bytes = 0;
  const failures = [];
  const leaks = [];

  await Promise.all(
    entries.map(async ({ permalink, source }) => {
      const target = permalinkToFile(permalink, siteConfig.baseUrl, outDir);
      if (!target) {
        failures.push(`${permalink} (refused: escapes outDir)`);
        return;
      }

      try {
        const sourcePath = resolveSource(source, siteDir);

        if (skipUnchanged) {
          const [sourceStat, targetStat] = await Promise.all([
            fs.stat(sourcePath),
            fs.stat(target).catch(() => null),
          ]);
          if (targetStat && targetStat.mtimeMs >= sourceStat.mtimeMs) {
            return;
          }
        }

        const raw = await fs.readFile(sourcePath, "utf8");
        const { fields, body } = splitFrontMatter(raw);
        const sanitized = sanitizeBody(body);
        const markdown = renderMarkdown({
          fields,
          body: sanitized.body,
          hasH1: sanitized.hasH1,
          canonicalUrl: `${siteConfig.url}${permalink}`,
        });

        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, markdown, "utf8");

        written++;
        bytes += Buffer.byteLength(markdown);

        const leaked = leakedComponents(raw, sanitized.prose);
        if (leaked.length > 0) {
          leaks.push(`${permalink} -> ${leaked.join(", ")}`);
        }
      } catch (err) {
        failures.push(`${permalink} (${err.message})`);
      }
    }),
  );

  return { written, bytes, failures, leaks };
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {{
 *   docs?: boolean,
 *   blog?: boolean,
 *   pages?: boolean,
 *   excludeVersions?: Record<string, string[]>,
 *   excludeFromSitemap?: Record<string, string[]>,
 * }} options
 *   Both exclusion lists are keyed by docs plugin id, because version names are
 *   only unique within an instance: the unreleased version of every instance is
 *   called `current`, so a flat list would take PXF down with `docs/next`.
 *
 *   `excludeVersions` skips a version entirely -- no file, no menu, no
 *   `<link rel="alternate">`. `excludeFromSitemap` is narrower: the twin is
 *   written and linked from the page, it simply is not advertised to crawlers.
 */
module.exports = function markdownExportPlugin(context, options = {}) {
  const {
    docs = true,
    blog = true,
    pages = true,
    excludeVersions = {},
    excludeFromSitemap = {},
  } = options;

  /**
   * @type {Array<{
   *   permalink: string, source: string, pluginId?: string, version?: string,
   * }>}
   *   `pluginId`/`version` are absent for blog posts and standalone pages,
   *   which are unversioned and therefore never excluded.
   */
  let entries = [];

  return {
    name: PLUGIN_NAME,

    async allContentLoaded({ allContent, actions }) {
      const { siteDir, baseUrl } = context;
      const collected = [];

      // Single source of truth for the UI: the per-page menu must not offer a
      // Markdown link on versions we skip. Shipping the whole permalink list
      // would bloat every bundle, so publish just the exclusion list.
      actions.setGlobalData({ excludeVersions });

      if (docs) {
        collected.push(...collectDocs(allContent, excludeVersions));
      }
      if (blog) {
        collected.push(...collectBlog(allContent));
      }
      if (pages) {
        collected.push(
          ...(await collectPages(path.join(siteDir, "src", "pages"), baseUrl)),
        );
      }

      // Same source can be routed twice (e.g. a version alias); keep one file
      // per permalink.
      const seen = new Set();
      entries = collected.filter(({ permalink }) => {
        if (seen.has(permalink)) {
          return false;
        }
        seen.add(permalink);
        return true;
      });

      // Hand the sitemap-eligible subset to the sitemap plugin. Rebuilt from
      // scratch each time so the dev server's repeated reloads cannot
      // accumulate stale permalinks.
      sitemapPermalinks.clear();
      for (const { permalink, pluginId, version } of entries) {
        const quiet =
          version !== undefined &&
          (excludeFromSitemap[pluginId] ?? []).includes(version);
        if (!quiet) {
          sitemapPermalinks.add(permalink);
        }
      }

      // Under `docusaurus start` this is the only chance to write the twins --
      // see `configureWebpack` below for how they get served.
      if (process.env.NODE_ENV !== "production") {
        const { written, failures } = await exportTwins({
          entries,
          outDir: devOutDir(siteDir),
          siteDir,
          siteConfig: context.siteConfig,
          skipUnchanged: true,
        });
        if (written > 0) {
          logger.info(
            `[${PLUGIN_NAME}] ${written} Markdown twin(s) written for the dev server.`,
          );
        }
        if (failures.length > 0) {
          logger.warn(
            `[${PLUGIN_NAME}] ${failures.length} twin(s) failed:\n  ${failures.join("\n  ")}`,
          );
        }
      }
    },

    /**
     * `postBuild` never runs under `docusaurus start`, so without this the
     * dev server has no twins to serve: the menu is visible but every link
     * resolves to the SPA shell, which renders blank and copies HTML.
     *
     * `devServer.static` is an array, so webpack-merge appends to Docusaurus'
     * own entries instead of replacing them. Overriding `setupMiddlewares`
     * would have been the other option, but that key merges by replacement and
     * would drop the middleware behind the dev error overlay.
     */
    configureWebpack(_config, isServer) {
      if (isServer || process.env.NODE_ENV === "production") {
        return {};
      }
      return {
        devServer: {
          static: [
            {
              publicPath: context.baseUrl,
              directory: devOutDir(context.siteDir),
            },
          ],
        },
      };
    },

    async postBuild({ outDir, siteDir, siteConfig }) {
      if (entries.length === 0) {
        logger.warn(`[${PLUGIN_NAME}] no pages collected; nothing exported.`);
        return;
      }

      const { written, bytes, failures, leaks } = await exportTwins({
        entries,
        outDir,
        siteDir,
        siteConfig,
      });

      logger.success(
        `[${PLUGIN_NAME}] exported ${written} Markdown files (${(
          bytes /
          1024 /
          1024
        ).toFixed(1)} MB).`,
      );

      if (failures.length > 0) {
        logger.warn(
          `[${PLUGIN_NAME}] ${failures.length} page(s) failed:\n  ${failures.join("\n  ")}`,
        );
      }

      // Not fatal: a leaked tag makes one page's Markdown uglier, which is no
      // reason to block a site publish. It does mean STRUCTURAL_TAGS /
      // OPAQUE_TAGS above need a new entry.
      if (leaks.length > 0) {
        logger.warn(
          `[${PLUGIN_NAME}] ${leaks.length} page(s) leaked component markup; ` +
            `add the component to STRUCTURAL_TAGS or OPAQUE_TAGS:\n  ${leaks.join("\n  ")}`,
        );
      }
    },
  };
};
