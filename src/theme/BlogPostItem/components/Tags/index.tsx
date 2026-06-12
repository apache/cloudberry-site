import { useBlogPost } from "@docusaurus/theme-common/internal";
export default function Tags({ style }: { style?: React.CSSProperties }) {
  const {
    frontMatter: { tags },
  } = useBlogPost();

  const tag = tags.map((text) => {
    return (
      <span
        key={text.toString()}
        style={{
          marginRight: 6,
          borderRadius: 999,
          fontSize: "0.75rem",
          fontWeight: 600,
          background: "rgba(254, 163, 21, 0.14)",
          color: "var(--color-accent, #ff5900)",
          padding: "3px 10px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          display: "inline-block",
        }}
      >
        {text.toString()}
      </span>
    );
  });
  return <div style={style}>{tag}</div>;
}
