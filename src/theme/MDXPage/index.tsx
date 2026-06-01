import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import ColorCard from "@site/src/components/common/ColorCard";
import CommonLayout from "@site/src/components/common/Layout";
import MDXContent from "@theme/MDXContent";
import type { Props } from "@theme/MDXPage";
import TOC from "@theme/TOC";
import Unlisted from "@theme/Unlisted";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;

  const {
    metadata: { frontMatter, unlisted, description, title },
    assets,
  } = MDXPageContent;
  const { wrapperClassName, hide_table_of_contents: hideTableOfContents } =
    frontMatter;

  const showTOC =
    !hideTableOfContents && MDXPageContent.toc && MDXPageContent.toc.length > 0;

  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage
      )}
    >
      <CommonLayout>
        <ColorCard subText={description} titleText={title} />

        <div className={styles.mdxPageWrapper}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {unlisted && <Unlisted />}
            <article className="markdown">
              <MDXContent>
                <MDXPageContent />
              </MDXContent>
            </article>
          </div>

          {showTOC && (
            <div className={styles.rightContent} style={{ width: 220 }}>
              <TOC
                toc={MDXPageContent.toc}
                minHeadingLevel={frontMatter.toc_min_heading_level}
                maxHeadingLevel={frontMatter.toc_max_heading_level}
              />
            </div>
          )}
        </div>
      </CommonLayout>
    </HtmlClassNameProvider>
  );
}
