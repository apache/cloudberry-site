import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * Maps a page permalink onto the Markdown twin emitted at build time by the
 * `markdown-export` plugin.
 *
 * Must stay in step with `permalinkToFile()` in
 * `src/plugins/markdown-export/index.js` -- if the two disagree, every link
 * built from this 404s.
 */
export function markdownPathFor(permalink: string): string {
  return permalink.endsWith("/") ? `${permalink}index.md` : `${permalink}.md`;
}

export interface Props {
  /** Permalink of the current page, as produced by the content plugin. */
  permalink: string;
}

/**
 * Advertises the page's Markdown twin from `<head>`.
 *
 * This is the only way a crawler can find those files: the "View as Markdown"
 * menu item is behind an `open &&` guard, so it never reaches the server-
 * rendered HTML, and nothing else on the page links to a `.md` URL. Unlike
 * that menu, this tag is unconditional -- it is the discovery surface.
 *
 * Absolute URLs, because a `rel="alternate"` resolved against the document is
 * technically fine but needlessly fragile for third-party consumers.
 */
export default function MarkdownAlternate({ permalink }: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <link
        rel="alternate"
        type="text/markdown"
        title="Markdown source"
        href={`${siteConfig.url}${markdownPathFor(permalink)}`}
      />
    </Head>
  );
}
