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
 * Cross-plugin handoff: which Markdown twins sitemap.xml should advertise.
 *
 * The sitemap plugin cannot read a manifest written by `markdown-export`,
 * because `postBuild` hooks run *concurrently* -- see the `Promise.all` in
 * `@docusaurus/core/lib/commands/build/buildLocale.js` -- so the two would
 * race. `allContentLoaded` does strictly precede every `postBuild`, so a
 * module-level set filled there is reliably populated by the time
 * `createSitemapItems` is called.
 *
 * Both sides run in the same Node process, so this is shared state rather
 * than serialised data. It is deliberately the only such coupling.
 *
 * Note this is a subset of what gets exported: a page can have a twin that the
 * sitemap deliberately stays quiet about. See `excludeFromSitemap` in
 * index.js.
 */

/** @type {Set<string>} permalinks, exactly as the content plugins report them */
const sitemapPermalinks = new Set();

/**
 * The one rule mapping a permalink onto its Markdown twin, shared by the
 * exporter (which turns it into a file path) and the sitemap (which turns it
 * into a URL).
 *
 * `markdownPathFor()` in `src/components/common/markdownTwin/index.tsx`
 * repeats it for the browser bundle, deliberately: pulling this build-time
 * module into the client would ship the permalink set to every visitor.
 *
 * @param {string} permalink
 * @returns {string}
 */
function markdownPathFor(permalink) {
  return permalink.endsWith("/") ? `${permalink}index.md` : `${permalink}.md`;
}

module.exports = { sitemapPermalinks, markdownPathFor };
