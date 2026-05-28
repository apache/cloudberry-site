import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";

export interface IPoweredByUser {
  /** Organization or project name. */
  name: string;
  /** Logo path under /static (e.g. "/img/powered-by/acme.svg"). Leave empty to render a text-only card. */
  logo?: string;
  /** Optional external link. */
  website?: string;
  /** Short description of how the organization uses Apache Cloudberry. */
  description?: string;
  /** Optional country/region label. */
  region?: string;
}

const SUBMIT_URL =
  "https://github.com/apache/cloudberry/discussions/1771";

const configData = {
  titleText: "Powered by Apache Cloudberry",
  subText:
    "Organizations and projects around the world are running their analytics workloads on Apache Cloudberry. This page highlights some of them and invites you to share your own story with the community.",
  introText: (
    <>
      The list below is community-maintained and is not an endorsement by The
      Apache Software Foundation. Entries are submitted by users themselves.
      Logos and trademarks belong to their respective owners. If you would like
      to add, update, or remove your organization, please open a comment in our{" "}
      <LinkWithBaseUrl
        href={SUBMIT_URL}
        className="active-color"
        target="_blank"
      >
        GitHub Discussion
      </LinkWithBaseUrl>
      .
    </>
  ),
  submitTitle: "Are you using Apache Cloudberry?",
  submitText: (
    <>
      We would love to hear from you. Tell us about your use case, scale, and
      what you are building. Adding your organization to this page is a simple
      way to support the project and help others discover Cloudberry in
      production.
    </>
  ),
  submitButtonText: "Share your story on GitHub",
  submitButtonUrl: SUBMIT_URL,
  guidelines: [
    "Provide your organization or project name.",
    "Attach a logo (SVG preferred, transparent background, at least 240px wide).",
    "Add a one or two sentence description of how you use Apache Cloudberry.",
    "Optionally include a website URL.",
  ],
  /**
   * Append your entries below. Drop the logo file under
   * `static/img/powered-by/` and reference it via an absolute path,
   * e.g. `/img/powered-by/your-org.svg`.
   */
  users: [
    // Example entries — replace with real users.
    // {
    //   name: "Acme Analytics",
    //   logo: "/img/powered-by/acme.svg",
    //   website: "https://acme.example.com",
    //   description:
    //     "Powers a multi-petabyte analytics platform serving thousands of internal users.",
    // },
    {
    name: "HashData",
    logo: "/img/powered-by/hashdata.png",
    website: "https://www.hashdata.cn/",
    description:
      "HashData Lightning and HashData Enterprise use Apache Cloudberry as their core engine.",
    },
    {
    name: "Synx Data Labs",
    logo: "/img/powered-by/synx.png",
    website: "https://www.synxdata.com/",
    description:
      "Synx Data Labs builds its data warehouse product SynxDB on Apache Cloudberry.",
    },
    {
    name: "Yandex Cloud",
    logo: "/img/powered-by/yandex-cloud.svg",
    website: "https://yandex.cloud/en/docs/managed-greenplum/",
    description:
      "Yandex MPP Analytics for PostgreSQL supports Apache Cloudberry.",
    },
  ] as IPoweredByUser[],
};

export default configData;
