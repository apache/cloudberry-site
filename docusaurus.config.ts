import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
const config: Config = {
  title: "Apache Cloudberry (Incubating)",
  tagline: "One advanced and mature open-source MPP (Massively Parallel Processing) database. Open source alternative to Greenplum Database.",
  favicon: "/img/favicon.ico",
  url: "https://cloudberry.apache.org",
  baseUrl: "/",
  organizationName: "apache", // Usually your GitHub org/user name.
  projectName: "cloudberry-site", // Usually your repo name.

  // onBrokenLinks: "throw",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  
  plugins: [
    "docusaurus-plugin-sass",
    'docusaurus-plugin-matomo',
    [
      "@easyops-cn/docusaurus-search-local",
      { hashed: true, indexPages: true, language: ["en", "zh"] },
    ],
  ],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },

  presets: [
    [
      "classic",
      {
        pages: {
          admonitions: true,
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/apache/cloudberry-site/edit/main/",
          editLocalizedFiles: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: {
          postsPerPage: "ALL",
          path: "blog", // Path to the existing blog folder
          routeBasePath: "blog", // Route for the existing blog
          include: ["*.md", "*.mdx"], // File types to include for the existing blog

          feedOptions: {
            type: "all",
            title:
              "Apache Cloudberry (Incubating) is one advanced and mature open-source MPP (Massively Parallel Processing) databases available.",
          },
        },
        theme: {
          customCss: [
            "./src/css/custom.scss",
            "./src/css/design-style.scss",
            "./src/css/design-class.scss",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    title: "Apache Cloudberry (Incubating)",
    tagline: "one advanced and mature open-source MPP (Massively Parallel Processing) databases available.",
    favicon: "/img/favicon.ico",
    url: "https://cloudberry.apache.org",
    baseUrl: "/",
    organizationName: "apache", // Usually your GitHub org/user name.
    projectName: "cloudberry-site", // Usually your repo name.
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        href: "/",
        alt: "Apache Cloudberry (Incubating)",
        src: "/img/apache_cloudberry_color_black.svg",
        srcDark: "/img/apache_cloudberry_color_white.svg",
      },
      items: [
        {
          type: 'docsVersionDropdown',
          versions: ['current', '2.x', '1.x'],
        },
        {
          type: "docSidebar",
          sidebarId: "docsbars",
          position: "right",
          label: "Docs",
        },
        {
          label: "Community",
          position: "right",
          items: [
            {
              label: "Overview",
              to: "/community",
            },
            {
              label: "Slack Guide",
              to: "/community/slack",
            },
            {
              label: "WeChat Guide",
              to: "/community/wechat",
            },
            {
              label: "Community Events",
              to: "/community/events",
            },
            {
              label: "Mailing Lists",
              to: "/community/mailing-lists",
            },
            {
              label: "Brand Guidelines",
              to: "/community/brand",
            },
            {
              label: "Security Policy",
              to: "/community/security",
            },
           ],
        },
        {
          label: "Contribute",
          position: "right",
          items: [
            {
              label: "Overview",
              to: "/contribute",
            },
            {
              label: "How to Contribute",
              to: "/contribute/how-to-contribute",
            },
            {
              label: "Working with Git & GitHub",
              to: "/contribute/git",
            },
            {
              label: "Code Contribution Guide",
              to: "/contribute/code",
            },
            {
              label: "Proposal Guide",
              to: "/contribute/proposal",
            },
            {
              label: "Doc Contribution Guide",
              to: "/contribute/doc",
            },
           ],
        },
        { to: "/blog", label: "Blog", position: "right" },
        {
          to: "/docs/releases",
          label: "Download",
          position: "right",
        },
        {
          label: "Team",
          position: "right",
          items: [
            {
              label: "Who we are",
              to: "/team",
            },
            {
              label: "Inviting New Committers",
              to: "/team/new-committers",
            },
            {
              label: "Sign ICLA",
              to: "/team/sign-icla",
            },
            {
              label: "Setup the Apache account",
              to: "/team/setup-apache-email-account",
            },
           ],
        },
        {
          label: "Resources",
          position: "right",
          items: [
            {
               label: "Wiki",
               to: "https://github.com/apache/cloudberry/wiki",
             },
            {
              label: "Roadmap",
              to: "https://github.com/apache/cloudberry/discussions/868",
            },
            {
              label: "Forum",
              to: "https://github.com/apache/cloudberry/discussions",
            },
            {
              label: "Support",
              to: "/support",
             },
          ],
        },
 	      {
          label: 'ASF',
          position: 'right',
          items: [
            {
              label: 'Foundation',
              to: 'https://www.apache.org/'
            },
            {
              label: 'License',
              to: 'https://www.apache.org/licenses/'
            },
            {
              label: 'Events',
              to: 'https://www.apache.org/events/current-event.html'
            },
            {
              label: 'Privacy',
              to: 'https://privacy.apache.org/policies/privacy-policy-public.html'
            },
            {
              label: 'Security',
              to: 'https://www.apache.org/security/'
            },
            {
              label: 'Sponsorship',
              to: 'https://www.apache.org/foundation/sponsorship.html'
            },
            {
              label: 'Thanks',
              to: 'https://www.apache.org/foundation/thanks.html'
            },
            {
              label: 'Code of Conduct',
              to: 'https://www.apache.org/foundation/policies/conduct'
            },
          ]
        },
      ],
    },
    footer: {
      logo: {
        src: "/img/apache-incubator.svg",
        srcDark: "/img/apache-incubator.svg",
        href: "https://incubator.apache.org/",
        alt: "Apache Incubator logo",
      },
      copyright: `
      <p>
        Apache Cloudberry is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.
      </p>
      <p>
        Copyright © ${new Date().getFullYear()} The Apache Software Foundation, Licensed under the Apache License, Version 2.0.</p>
      <p>
        Apache®, the names of Apache projects, and the feather logo are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries.
      </p>
      `,
      links: [
        {
          title: "Support",
          items: [
            {
              label: "GitHub Issues",
              href: "https://github.com/apache/cloudberry/issues",
            },
            {
              label: "GitHub Discussions",
              href: "https://github.com/apache/cloudberry/discussions",
            },
            {
              label: "Slack",
              href: "https://inviter.co/apache-cloudberry",
            },
            {
              label: "Twitter",
              href: "https://x.com/ASFCloudberry",
            },
            {
              label: "Youtube",
              href: "https://youtube.com/@ApacheCloudberry",
            },
            {
              label: "Security",
              to: "/community/security",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Download",
              href: "https://github.com/apache/cloudberry/releases",
            },
            {
              label: "Documentation",
              to: "/docs/",
            },
            {
              label: "Events",
              to: "/community/events",
            },
            {
              label: "Brand Guidelines",
              href: "/community/brand",
            },
          ],
        },
        {
          title: "Contribution",
          items: [
            {
              label: "Working with Git & GitHub",
              to: "contribute/git",
            },
            {
              label: "Contribution Overview",
              to: "/contribute/how-to-contribute",
            },
            {
              label: "Code Contribution",
              to: "contribute/code",
            },
            {
              label: "Doc Contribution",
              to: "contribute/doc",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.okaidia,
    },
    // Change website analytics from Google Analytics to Matomo
    matomo: {
      matomoUrl: 'https://analytics.apache.org/',
      siteId: '66',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
