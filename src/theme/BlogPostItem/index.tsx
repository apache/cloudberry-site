import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import type { Props } from "@theme/BlogPostItem";

import BlogPostItemContainer from "./Container";
import BlogPostItemContent from "./Content";
import BlogPostItemAuthors from "./components/Authors";
import BlogItemCover from "./components/Cover";
import BlogItemDesc from "./components/Desc";
import BlogItemTags from "./components/Tags";
import BlogItemTitle from "./components/Title";

import LinkWithBaseUrl from "@site/src/components/common/LinkWithBaseUrl";
import styles from "./styles.module.scss";

const BlogListItem = () => {
  const {
    metadata: { permalink },
  } = useBlogPost();

  return (
    <BlogPostItemContainer className={styles["blogList"]}>
      <header className="link-wrap">
        <LinkWithBaseUrl to={permalink}>
          <BlogItemCover />
          <div style={{ padding: "20px 22px 22px" }}>
            <div style={{ cursor: "pointer" }}>
              <BlogItemTags style={{ marginBottom: 12 }} />
              <BlogItemTitle />
              <BlogItemDesc style={{ marginTop: 10 }} />
            </div>
            <BlogPostItemAuthors />
          </div>
        </LinkWithBaseUrl>
      </header>
    </BlogPostItemContainer>
  );
};
const BlogDetailItem = ({ children }) => {
  return (
    <BlogPostItemContainer className={styles["blogDetail"]}>
      <header>
        <BlogItemTitle />
        <BlogPostItemAuthors />
      </header>
      {/* only show blog detail */}
      <BlogPostItemContent>{children}</BlogPostItemContent>
    </BlogPostItemContainer>
  );
};

export default function BlogPostItem({ children }: Props): JSX.Element {
  const { isBlogPostPage } = useBlogPost();
  const RenderComp = isBlogPostPage ? BlogDetailItem : BlogListItem;
  return <RenderComp>{children}</RenderComp>;
}
