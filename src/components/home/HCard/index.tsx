import Translate, { translate } from "@docusaurus/Translate";
import { LINKS } from "@site/src/consts/homeContent";
import useGetNewBlogList from "@site/src/hooks/useGetNewBlogList";
import { useIsMobile } from "@site/src/hooks/useIsMobile";
import clsx from "clsx";
import LinkWithBaseUrl from "../../common/LinkWithBaseUrl";
import styles from "./styles.module.scss";

export default function HCard() {
  const blogs = useGetNewBlogList();
  const newBlog = blogs[0];

  const headerDesc = (
    <div className={styles.textWrap}>
      <h1 className={styles.highText}>
        Welcome to Apache Cloudberry™ (Incubating)
      </h1>
      <p className={styles.description}>
        Apache Cloudberry is an advanced and mature open-source Massively Parallel Processing (MPP) database, 
        derived from the open-source version of the Pivotal Greenplum Database® but built on a more modern 
        PostgreSQL kernel and with more advanced enterprise capabilities. Cloudberry can serve as a data 
        warehouse and can also be used for large-scale analytics and AI/ML workloads.
      </p>
    </div>
  );

  return (
    <div className={clsx(styles.bannerContainer)}>
      <div className={styles.content}>
        <div className={styles.left}>
          {headerDesc}
          <div className={clsx(styles.btnWrap, "link-wrap")}>
            <LinkWithBaseUrl to="/community">
              <span className={styles.more}>
                <Translate>Community</Translate>
              </span>
            </LinkWithBaseUrl>
            <a href="https://inviter.co/apache-cloudberry" target="_blank" rel="noopener noreferrer">
              <span className={styles.more}>
                <Translate>Slack</Translate>
              </span>
            </a>
            <LinkWithBaseUrl to="/docs">
              <span className={styles.more}>
                <Translate>Docs</Translate>
              </span>
            </LinkWithBaseUrl>
            <LinkWithBaseUrl to={LINKS.github}>
              <span className={styles.hub}>
                <Translate>GitHub</Translate>
              </span>
            </LinkWithBaseUrl>
          </div>
        </div>
        {!useIsMobile() && (
          <div className={styles.right}>
          </div>
        )}
        <div className={styles.bline}></div>
      </div>

      <div className={styles.bottomTips}>
        <div className={styles.tipsContent}>
          <div className={styles.text}>
            <img
              className={styles.blogTextIcon}
              src="/img/home/hcard/new.svg"
              alt=""
            />
            <LinkWithBaseUrl to={newBlog.href}>{newBlog.title}</LinkWithBaseUrl>
          </div>
        </div>
      </div>

      <div className={styles.leftBox}></div>
      <div className={styles.rightBox}></div>
    </div>
  );
}
