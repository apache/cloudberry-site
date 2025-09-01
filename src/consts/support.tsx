import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";

const configData = {
  titleText: "Support for Apache Cloudberry",
  subText:
    "Welcome to our support page! Our team is ready to help you make the most of the Apache Cloudberry. Explore the resources and let us assist you in harnessing its full potential.",
  contentTextDesc:
    "This page shows that how you can ask for help and get support from our community.",
  tableData: [
    {
      type: (
        <LinkWithBaseUrl href="/docs/releases/" className="active-color">
          Download
        </LinkWithBaseUrl>
      ),
      desc: "You can download the Apache Cloudberry releases and see the changelogs.",
    },
    {
      type: (
        <LinkWithBaseUrl href="/docs" className="active-color">
          Documentation
        </LinkWithBaseUrl>
      ),
      desc: (
        <>
          Official documentation for Apache Cloudberry. You can explore it to
          discover more details about us. If you want to contribute, see{" "}
          <LinkWithBaseUrl href="/contribute/doc" className="active-color">
            the guide
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "Report bugs",
      desc: (
        <>
          Problems and issues in Apache Cloudberry core. If you find bugs,
          welcome to submit them{" "}
          <LinkWithBaseUrl
            href="https://github.com/apache/cloudberry/issues"
            className="active-color"
            target="_blank"
          >
            here
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "Report a security vulnerability",
      desc: (
        <>
          View our{" "}
          <LinkWithBaseUrl
            href="/community/security"
            className="active-color"
            target="_blank"
          >
            security policy
          </LinkWithBaseUrl>{" "}
          to learn how to report and contact us.
        </>
      ),
    },
    {
      type: "Q&A",
      desc: (
        <>
          Ask for help when running/developing Apache Cloudberry, visit GitHub{" "}
          <LinkWithBaseUrl
            href="https://github.com/apache/cloudberry/discussions/categories/q-a"
            className="active-color"
            target="_blank"
          >
            Discussions - QA
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "New ideas / Feature Requests",
      desc: (
        <>
          Share ideas for new features, visit{" "}
          <LinkWithBaseUrl
            href="https://github.com/apache/cloudberry/discussions/categories/ideas-feature-requests"
            className="active-color"
            target="_blank"
          >
            GitHub Discussions - Ideas
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "Code contribution",
      desc: (
        <>
          Fix bugs, add new features to Apache Cloudberry, visit our guide on{" "}
          <LinkWithBaseUrl
            href="/contribute/how-to-contribute"
            className="active-color"
          >
            "How to Contribute"
          </LinkWithBaseUrl>
          ,{" "}
          <LinkWithBaseUrl href="/contribute/git" className="active-color">
            {" "}
            "Working with Git & GitHub"
          </LinkWithBaseUrl>
          ,{" "}
          <LinkWithBaseUrl href="/contribute/code" className="active-color">
            "Code Contribution Guide"
          </LinkWithBaseUrl>
          , and{" "}
          <LinkWithBaseUrl href="/contribute/proposal" className="active-color">
            "Proposal Guide"
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "Community events",
      desc: (
        <>
          Including meetups, webinars, conferences, and more events, visit the{" "}
          <LinkWithBaseUrl href="/community/events" className="active-color">
            Events page
          </LinkWithBaseUrl>{" "}
          and subscribe events calendar.
        </>
      ),
    },
    {
      type: "Brand Guidelines",
      desc: (
        <>
          Guide on how to download, and use our logos and fonts, visit our{" "}
          <LinkWithBaseUrl href="/community/brand" className="active-color">
            Brand Guidelines
          </LinkWithBaseUrl>
          .
        </>
      ),
    },
    {
      type: "Social channels",
      desc: (
        <>
          Follow our{" "}
          <LinkWithBaseUrl
            href="https://x.com/ASFCloudberry"
            className="active-color"
            target="_blank"
          >
            Twitter
          </LinkWithBaseUrl>
          ,{" "}
          <LinkWithBaseUrl
            href="https://youtube.com/@ApacheCloudberry"
            className="active-color"
            target="_blank"
          >
            Youtube
          </LinkWithBaseUrl>{" "}
          to help spread good words on Apache Cloudberry. Welcome to{" "}
          <LinkWithBaseUrl
            href="/community/slack"
            className="active-color"
            target="_blank"
          >
            Slack
          </LinkWithBaseUrl>{" "}
          or{" "}
          <LinkWithBaseUrl
            href="/community/wechat"
            className="active-color"
            target="_blank"
          >
            WeChat
          </LinkWithBaseUrl>{" "}
          for real-time chat.
        </>
      ),
    },
  ],
  communitySupportText: "Community Support",
  commercialSupportText: "Commercial support",
  commercialDesc: (
    <>
      Commercial support is available from many companies that provide
      professional services to the Apache Cloudberry community. We will add more vendors' information here.
    </>
  ),
};

export default configData;
