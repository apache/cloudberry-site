import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";

let TIPS_CONTENT = (
  <LinkWithBaseUrl href="https://github.com/apache/cloudberry">
    <span>If you like Apache Cloudberry (Incubating), give it a star on GitHub! </span>
    <img src="/img/home/hcard/star.svg" alt="" />
  </LinkWithBaseUrl>
);

let MEET_THE_COMMUNITY = {
  title: (
    <>
      <div>Meet the community</div>
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
            href="https://github.com/apache/cloudberry/discussions/868"
          >
            Roadmap
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
  SLACK_TWITTER_TWITTER_WECHAT,
  TIPS_CONTENT,
  WANT_TO_CONTRIBUTE,
};
