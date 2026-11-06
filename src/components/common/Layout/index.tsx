import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
interface IProps {
  children: React.ReactElement | React.ReactElement[];
}
export default function CommonLayout({ children }: IProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Apache Cloudberry is an advanced and mature open-source MPP database built on PostgreSQL, and the open-source alternative to Greenplum for large-scale analytics and data warehousing."
    >
      {/* The main tag is used for special handling of layout styles, and cannot be a div tag here */}
      <main>{children}</main>
    </Layout>
  );
}
