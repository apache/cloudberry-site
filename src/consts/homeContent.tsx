import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";
import { isZhLangrage } from "../utils";
import DockerSvg from "/img/home/try-it-out/docker.svg";
import SystemSvg from "/img/home/try-it-out/system.svg";

let TIPS_CONTENT = (
  <LinkWithBaseUrl href="https://github.com/apache/cloudberry">
    <span>If you like Apache Cloudberry (Incubating), give it a star on GitHub! </span>
    <img src="/img/home/hcard/star.svg" alt="" />
  </LinkWithBaseUrl>
);

let MMP_ARCHITECTURE = {
  title: "MPP Architecture",
  list: [
    {
      pic: "/img/home/os.png",
      title: "Petabyte-Scale Data",
      content:
        "Apache Cloudberry offers excellent performance for handling large-scale data workloads with high throughput.",
    },
    {
      pic: "/img/home/pr.png",
      title: "Mature Technology",
      content:
        "Apache Cloudberry integrates solid PostgreSQL and Greenplum Database upstream technology, which both have wide adoption, active ecosystems, and tons of real-world use cases.",
    },
    {
      pic: "/img/home/pc.png",
      title: "Security Reinforcement",
      content:
        "Apache Cloudberry supports more encryption methods and algorithms including AES 128, AES 192, AES 256, DES and SCRAM-SHA-256, MD5, LDAP, and RADIUS.",
    },
  ],
};

let OUR_ROADMAP = {
  title: "Our Roadmap",
  subTitle: (
    <>
      <div>
        Welcome to join us in shaping the future of Apache Cloudberry,
      </div>
      <a
        className="active-color"
        href="https://github.com/apache/cloudberry/discussions/369"
        target="_blank"
      >
        check the roadmap details{" "}
        <img src="/img/home/our-roadmap/dot-arrow.svg" alt="" />
      </a>
    </>
  ),
  list: [
    {
      icon: "/img/home/feature/hesc.png",
      lightIcon: "/img/home/feature/hesc-light.png",
      title: "Streaming Support",
      content:
        "Apache Cloudberry is compatible with Greenplum Database, but with a newer PostgreSQL 14.4 kernel and more advanced features Greenplum doesn't support.",
    },
    {
      icon: "/img/home/feature/sac.png",
      lightIcon: "/img/home/feature/sac-light.png",
      title: "AI/ML ",
      content:
        "Inheriting the rich analytical features from PostgreSQL and Greenplum Database, Apache Cloudberry leverages them to the data platform, and seamlessly integrates the mainstream ETL and BI tools.",
    },
    {
      icon: "/img/home/feature/cuwmt.png",
      lightIcon: "/img/home/feature/cuwmt-light.png",
      title: "Strong Analytical Capability",
      content:
        "Apache Cloudberry has done a lot of work to speed up the query performance, including supporting parallel query execution, aggregation pushdown and supporting RuntimeFilter, and more.",
    },
    {
      icon: "/img/home/feature/p14i.png",
      lightIcon: "/img/home/feature/p14i-light.png",
      title: "Features and Enhancements",
      content:
        "Apache Cloudberry has a newer PostgreSQL 14.4 kernel inside to let users enjoy more with the backend global community.",
    },
    {
      icon: "/img/home/feature/mef.png",
      lightIcon: "/img/home/feature/mef-light.png",
      title: "Kernel Upgrade",
      content:
        "Apache Cloudberry supports password security policy, transparent data encryption (TDE) and more encryption algorithms besides the AES algorithm.",
    },
    {
      icon: "/img/home/feature/muc.png",
      lightIcon: "/img/home/feature/muc-light.png",
      title: "Utilities and Ecosystem",
      content:
        "Apache Cloudberry can be used in different scenarios, including batch processing data warehouse offline, building data warehouse in real-time, and more.",
    },
  ],
};

let TRY_IT_OUT = {
  title: "Try it out",
  list: [
    {
      title: "Build from source code.",
      content: (
        <>
          <div>
            <div>1. Clone the latest source code.</div>
            <span className="code-block">
              git clone https://github.com/apache/cloudberry.git
            </span>
          </div>
          <div>
            {" "}
            2. Build on your machine, check the{" "}
            <LinkWithBaseUrl
              className="active-color"
              href="https://cloudberry.apache.org/docs/cbdb-rockylinux8-ubuntu-compile/"
            >
              doc
            </LinkWithBaseUrl>
            .
          </div>
        </>
      ),
      img: <SystemSvg />,
    },
    {
      title: "Create your sandbox.",
      content: (
        <>
          You can also create one sandbox based on the Docker container. Follow
          the
          <LinkWithBaseUrl
            className="active-color"
            href="https://cloudberry.apache.org/bootcamp/#cloudberry-sandbox"
          >
            {" "}
            bootcamp{" "}
          </LinkWithBaseUrl>
          to set up.
        </>
      ),
      img: <DockerSvg />,
    },
  ],
};

let MEET_THE_COMMUNITY = {
  title: (
    <>
      <p>Meet the community</p>
    </>
  ),
};

let SLACK_TWITTER_TWITTER_WECHAT = {
  list: [
    {
      title: "Slack",
      icon: "/img/home/links/slack.svg",
      desc: "Global channels for community members.",
      link: "https://inviter.co/apache-cloudberry",
    },
    {
      title: "LinkedIn",
      icon: "/img/home/links/linked.svg",
      desc: "Follow us on LinkedIn",
      link: "https://www.linkedin.com/company/apache-cloudberry",
    },
    {
      title: "Twitter",
      icon: "/img/home/links/twitter.svg",
      desc: 'Follow @ASFCloudberry on Twitter("X" now).',
      link: "https://x.com/ASFCloudberry",
    },
    {
      title: "Youtube",
      icon: "/img/home/links/youtube.svg",
      desc: "Watch the latest videos.",
      link: "https://www.youtube.com/@ApacheCloudberry",
    },
    {
      title: "WeChat",
      icon: "/img/home/links/wechat.svg",
      desc: "Real-time chat in Mandarin Chinese.",
      link: "/community/wechat",
    },
  ],
};

let WANT_TO_CONTRIBUTE = {
  list: [
    {
      title: "Want to Contribute?",
      content: (
        <span>
          There are many ways to contribute to Apache Cloudberry (Incubating), and you can easily find the ones that suit your skills and interests to 
          <LinkWithBaseUrl className={"light-active-color"} href="/contribute">
            begin your contribution
          </LinkWithBaseUrl>
           journey.
        </span>
      ),
    },
    {
      icon: "/img/home/wtc.svg",
      title: "Get support",
      content: (
        <span>
          We are always here to
          <LinkWithBaseUrl className="active-color" href="/support">
            {" "}
            help and provide support{" "}
          </LinkWithBaseUrl>
          whenever you need it.
        </span>
      ),
    },
  ],
};

let FREQUENTLY_ASKED_QUESTIONS = {
  title: (
    <>
      <div>Frequently</div>
      <div>asked questions</div>
    </>
  ),
  list: [
    {
      title: "What's the product plan for the Apache Cloudberry (Incubating)?",
      content: (
        <>
          You can check our{" "}
          <LinkWithBaseUrl
            className="active-color"
            href="https://github.com/apache/cloudberry/discussions/369"
          >
            Roadmap 2024
          </LinkWithBaseUrl>{" "}
          document to see all the details.
        </>
      ),
    },
    {
      title:
        "What's the difference between Apache Cloudberry (Incubating) and Greenplum Database?",
      content: (
        <>
          Though Apache Cloudberry (Incubating) takes the Greenplum Database 7 as its codebase, Cloudberry has a newer solid PostgreSQL kernel built-in and has more features. You can check the 
          <LinkWithBaseUrl
            className="active-color"
            href="https://cloudberry.apache.org/docs/cbdb-vs-gp-features"
          >
            {" "}
            docs{" "}
          </LinkWithBaseUrl>
           for details.
        </>
      ),
    },
    {
      title:
        "Can I use Apache Cloudberry (Incubating) to replace our existing Greenplum Database clusters?",
      content:
        "Yes. One goal of Apache Cloudberry (Incubating) is to be compatible with Greenplum to let users can use Cloudberry the way using Greenplum. You can migrate from Greenplum to Cloudberry using gpbackup or other migration tools.",
    },
    {
      title: "How can I contribute to the Apache Cloudberry (Incubating)?",
      content: (
        <>
          We welcome contributions from anyone, new and experienced! Welcome to
          read our
          <LinkWithBaseUrl
            className="active-color"
            href="https://cloudberry.apache.org/contribute"
          >
            {" "}
            contribution guide{" "}
          </LinkWithBaseUrl>
           to learn more.
        </>
      ),
    },
  ],
};


const LINKS = {
  github: "https://github.com/apache/cloudberry",
  twitter: "https://x.com/ASFCloudberry",
  youtube: "https://youtube.com/@ApacheCloudberry",
  community: "https://inviter.co/apache-cloudberry",
  linkedIn: "https://www.linkedin.com/company/apache-cloudberry",
  wechat: "/community/wechat",
  discoverMore: "/docs",
};

export {
  FREQUENTLY_ASKED_QUESTIONS,
  LINKS,
  MEET_THE_COMMUNITY,
  MMP_ARCHITECTURE,
  OUR_ROADMAP,
  SLACK_TWITTER_TWITTER_WECHAT,
  TIPS_CONTENT,
  TRY_IT_OUT,
  WANT_TO_CONTRIBUTE,
};
