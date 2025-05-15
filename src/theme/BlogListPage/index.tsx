import { useLocation } from "@docusaurus/router";
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { Props } from "@theme/BlogListPage";
import BlogPostItems from "@theme/BlogPostItems";
import SearchMetadata from "@theme/SearchMetadata";
import clsx from "clsx";
import { useEffect, useState } from "react";
import BlogLayout from "../BlogLayout";

function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const { items, sidebar } = props;
  const [renderItems, setRenderItem] = useState(items);
  const location = useLocation();
  let rItem = items;
  useEffect(() => {
    const tagQuery = new URLSearchParams(location.search).get("tag");
    const searchKey = new URLSearchParams(location.search).get("key");

    if (tagQuery === "All" && searchKey === null) {
      setRenderItem(rItem);
      return;
    } else if (tagQuery) {
      rItem = items.filter((item) => {
        return item.content.metadata.tags.find(
          (item) => item.label === tagQuery
        );
      });
      setRenderItem(rItem);
    }
    if (searchKey) {
      rItem = items.filter((item) => {
        return (
          item.content.metadata.title
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          item.content.metadata.description
            .toLowerCase()
            .includes(searchKey.toLowerCase())
        );
      });
    }
    setRenderItem(rItem);
  }, [location]);

  return (
    <BlogLayout sidebar={sidebar} items={props.items}>
      <BlogPostItems items={renderItems} />
      {/* <BlogListPaginator metadata={metadata} /> */}
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
