import styles from "@site/src/css/pages/contribute.module.scss";
import clsx from "clsx";
import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";
import Card from "../components/contribute/Card";
import { formatStrHorizontalLine } from "../utils";
interface ConfigProps {
  headerCard: {
    titleText: string;
    subTitle: string;
  };
  textListItems: {
    title: string;
    content?: React.ReactNode;
    href?: string;
    linkText?: string;
    style?: React.CSSProperties;
    children?: React.ReactElement;
    id?: string;
  }[];
}
let CONTRIBUTE_PAGE_CONFIG: ConfigProps = {
  headerCard: {
    titleText:
      "From user to contributor, no contribution is too small. We welcome contributions from anyone, new and experienced!",
    subTitle: `Apache Cloudberry is maintained actively by a group of database
            experts by individuals and companies. We believe in the power of
            open source way and community. All contributions are encouraged,
            including code enhancements, bug fixes, feature proposals,
            documents, marketing, etc. We welcome contributions from anyone, new
            and experienced!`,
  },
  textListItems: [
    {
      title: "Find a Way to Contribute",
      content:
        "There are many ways you need to get started. The most common contributions include code, documentation, and community support. You can do a lot of things to make Cloudberry better. See the contribution guide to find a way to contribute, how you can ask for help, and what benefits you can get from your contribution.",
      linkText: "Check the contribution guide",
      href: "/contribute/how-to-contribute",
    },
    {
      title: "Working with Git & GitHub",
      content:
        "Don't rush to start! You need to learn how to work well with GitHub and Git, which will help you contribute and communicate with other members effectively. Here are the key points you will use in the future.",
      linkText: "Prepare your skills",
      href: "/contribute/git",
    },
    {
      style: { marginTop: 5, paddingBottom: 53 },
      title: "Code Contribution",
      children: (
        <div className={clsx(styles.codeContribution, "link-wrap")}>
          <Card
            className={styles.firstPosition}
            iconImgSrc="/img/home/feature/mef-light.svg"
            content="Learn the code conventions, contribution workflow, how to review code, and the contributor checklist."
            linkText="Make your code contribution"
            href="/contribute/code"
          />
          <Card
            className={styles.secondPosition}
            iconImgSrc="/img/home/feature/muc-light.svg"
            content="For any major changes to the Cloudberry, please consider initiating one proposal."
            linkText="See the proposal process"
            href="/contribute/proposal"
          />
        </div>
      ),
    },
    {
      title: "Documentation Contribution",
      content:
        "We welcome your documentation contributions, including website, and documentation.",
      linkText: "Help improve the doc",
      href: "/contribute/doc",
    },
    {
      title: "Getting Help",
      style: { marginTop: 10 },
      content: (
        <span>
          "Feel free to reach out to us in Slack{" "}
          <span className={styles.highLight}>#dev</span> channels or{" "}
          <span className={styles.highLight}>
            <LinkWithBaseUrl to="https://github.com/apache/cloudberry/discussions">
              GitHub Discussions
            </LinkWithBaseUrl>
          </span>{" "}
          when your contribution is blocked, especially when making your first
          contribution. Don't be shy, we're happy to help."
        </span>
      ),
    },
  ],
};

CONTRIBUTE_PAGE_CONFIG.textListItems.forEach((item) => {
  item.id = formatStrHorizontalLine(item.title);
});

const LINK_NAV_CONFIG = CONTRIBUTE_PAGE_CONFIG.textListItems
  .slice(0, -1)
  .map((item) => {
    return {
      label: item.title,
      id: item.id,
    };
  });

export { CONTRIBUTE_PAGE_CONFIG, LINK_NAV_CONFIG };
