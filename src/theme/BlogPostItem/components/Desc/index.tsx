import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
export default function Desc({ style }: { style?: React.CSSProperties }) {
  const { metadata } = useBlogPost();
  return (
    <div
      style={{
        color: "var(--color-text-muted)",
        lineHeight: 1.6,
        fontSize: "0.9375rem",
        marginTop: 12,
        ...style,
      }}
    >
      {metadata.description}
    </div>
  );
}
