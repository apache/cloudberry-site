import type { Props } from "@theme/BlogPostItem/Container";
export default function BlogPostItemContainer({
  children,
  className,
}: Props): JSX.Element {
  // const { isBlogPostPage } = useBlogPost();
  return (
    <article
      className={className}
      itemProp="blogPost"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {children}
    </article>
  );
}
