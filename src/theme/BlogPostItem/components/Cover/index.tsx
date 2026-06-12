import { useBlogPost } from "@docusaurus/theme-common/internal";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface IProps {
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Cover(props: IProps) {
  const { metadata } = useBlogPost();
  const imgUrl = useBaseUrl(metadata.frontMatter.image);

  if (!metadata.frontMatter.image) {
    // Render a soft brand-tinted placeholder for posts without a cover
    return (
      <div
        onClick={props.onClick}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          background:
            "linear-gradient(135deg, rgba(255,168,0,0.18) 0%, rgba(255,209,43,0.18) 100%)",
          ...props.style,
        }}
      />
    );
  }

  return (
    <img
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        objectFit: "cover",
        cursor: "pointer",
        display: "block",
        ...props.style,
      }}
      onClick={props.onClick}
      src={imgUrl}
      alt=""
    />
  );
}
