import React from "react";
import clsx from "clsx";
import { useWindowSize } from "@docusaurus/theme-common";
import {
  useActivePlugin,
  useDoc,
} from "@docusaurus/plugin-content-docs/client";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import ContentVisibility from "@theme/ContentVisibility";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { Props } from "@theme/DocItem/Layout";

import AiActions from "@site/src/components/common/AiActions";
import MarkdownAlternate from "@site/src/components/common/markdownTwin";

import styles from "./styles.module.css";

/**
 * Whether this doc has a Markdown twin to link to. Versions excluded from the
 * `markdown-export` plugin have none, so the menu and the `<link
 * rel="alternate">` must stay hidden there rather than pointing at a 404.
 *
 * Scoped by plugin id, because `current` names the unreleased version of every
 * docs instance -- PXF's only version is also `current`, and it is exported.
 */
function useHasMarkdownExport(version: string): boolean {
  const activePlugin = useActivePlugin();
  const data = usePluginData("markdown-export") as
    | { excludeVersions?: Record<string, string[]> }
    | undefined;

  const excluded = activePlugin
    ? data?.excludeVersions?.[activePlugin.pluginId]
    : undefined;
  return !(excluded ?? []).includes(version);
}

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const hasMarkdownExport = useHasMarkdownExport(metadata.version);
  return (
    <div className="row">
      <div className={clsx('col',!docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        {hasMarkdownExport && (
          <MarkdownAlternate permalink={metadata.permalink} />
        )}
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.docItemTopBar}>
              <DocBreadcrumbs />
              {hasMarkdownExport && (
                <AiActions permalink={metadata.permalink} />
              )}
            </div>
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && (
        <div className={clsx('col col--3', styles.docTocCol)}>
          {docTOC.desktop}
        </div>
      )}
    </div>
  );
}
