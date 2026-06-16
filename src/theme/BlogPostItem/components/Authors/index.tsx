import { useBlogPost } from "@docusaurus/theme-common/internal";
export default function BlogPostItemHeaderAuthors({
  styles,
}: {
  styles?: React.CSSProperties;
}): JSX.Element {
  const {
    metadata: { authors, formattedDate },
  } = useBlogPost();
  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  return (
    <div
      style={{
        color: "var(--color-text-muted)",
        fontSize: "0.8125rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 14,
        ...styles,
      }}
    >
      <span
        style={{
          maxWidth: 180,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          fontWeight: 500,
          color: "var(--color-text)",
        }}
      >
        {authors.map((author, index) => {
          return (
            <span key={index}>
              {author.name}
              {index < authors.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </span>
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--color-border-strong)",
        }}
      />
      <span>{formattedDate}</span>
    </div>
  );
}
