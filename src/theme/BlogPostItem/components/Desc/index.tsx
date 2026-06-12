import { useBlogPost } from "@docusaurus/theme-common/internal";
export default function Desc({ style }: { style?: React.CSSProperties }) {
  const { metadata } = useBlogPost();
  return (
    <div
      className="two-lines-ellipsis"
      style={{
        color: "var(--color-text-muted)",
        lineHeight: 1.6,
        fontSize: "0.9375rem",
        ...style,
      }}
    >
      {metadata.description}
    </div>
  );
}
