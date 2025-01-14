import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";
import { formatStrHorizontalLine, isZhLangrage } from "../utils";

let BOOTCAMP_PAGE_CONFIG = {
  headerCard: {
    titleText: "Apache Cloudberry Bootcamp",
    subText:
      "Join us on an exciting journey to explore the features of Cloudberry using a Docker engine-based sandbox. Get ready to elevate your database skills. Happy exploring!",
  },
  DATA_0: {
    title: "Bootcamp Outline",
    subTitle: "Cloudberry Sandbox",
    card: {
      content:
        "This document guides you on how to quickly set up and connect to a single-node Cloudberry in a Docker environment. You can try out Cloudberry by performing some basic operations and running SQL commands.",
      link: { text: "Create your Sandox", href: "/bootcamp/cbdb-sandbox" },
    },
  },
  DATA_101: {
    title: "101-Cloudberry Tourials",
    subText: (
      <>
        This part contains a series of tutorials for quickly trying out
        Cloudberry based on the Cloudberry Sandbox. Before starting
        to read the tutorials, you are expected to finish installing the
        single-node Apache Cloudberry by following the{" "}
        <span className="active-color">Cloudberry Sandbox</span>.
      </>
    ),
    cardLine1: [
      {
        title: "Lesson 0",
        link: {
          text: "Introduction to Database and Cloudberry Architecture",
          href: "/bootcamp/101-0-introduction-to-database-and-cloudberry-architecture",
        },
        style: { width: 221 },
      },
      {
        title: "Lesson 1",
        link: {
          text: "Create Users and Roles",
          href: "/bootcamp/101-1-create-users-and-roles",
        },
        style: { width: 221 },
      },
      {
        title: "Lesson 2",
        link: {
          text: "Create and Prepare Database",
          href: "/bootcamp/101-2-create-and-prepare-database",
        },
        style: { width: 221 },
      },
      {
        title: "Lesson 3",
        link: {
          text: "Create Tables",
          href: "/bootcamp/101-3-create-tables",
        },
        style: { width: 221 },
      },
    ],
    cardLine2: [
      {
        title: "Lesson 4",
        link: {
          text: "Create Users and Roles",
          href: "/bootcamp/101-4-data-loading",
        },
        style: { width: 305.33 },
      },
      {
        title: "Lesson 5",
        link: {
          text: "Create and Prepare Database",
          href: "/bootcamp/101-5-queries-and-performance-tuning",
        },
      },
      {
        title: "Lesson 6",
        link: {
          text: "Backup and Restore Operations",
          href: "/bootcamp/101-6-backup-and-recovery-operations",
        },
      },
    ],
  },
  DATA_102: {
    title: "102-Cloudberry Crash Course",
    card: {
      link: {
        text: "Click to start",
        href: "/bootcamp/102-cbdb-crash-course",
      },
      content:
        "This crash course provides an extensive overview of Cloudberry, an open-source Massively Parallel Processing (MPP) database. It covers key concepts, features, utilities, and hands-on exercises to become proficient with Cloudberry.",
    },
  },
  DATA_103: {
    title: "103-Cloudberry Performance Benchmark",
    subText: `This tutorial will show you how to perform a Cloudberry performance
  benchmark in the Cloudberry Sandbox Docker image. The benchmark
  process consists of two parts:`,
    cardLine: [
      {
        title: "103-1",
        style: { width: 474 },
        link: {
          text: "TPC-H benchmark",
          href: "/bootcamp/103-cbdb-performance-benchmark-tpch",
        },
      },
      {
        title: "103-2",
        style: { width: 474 },
        link: {
          text: "TPC-DS benchmark",
          href: "/bootcamp/103-cbdb-performance-benchmark-tpcds",
        },
      },
    ],
  },
  DATA_104: {
    title: "104-Cloudberry for Data Science",
    cardLine: [
      {
        title: "104-1",
        style: { width: 474 },
        link: {
          text: "Introduction to Cloudberry In-Database Analytics",
          href: "/bootcamp/104-1-introduction-to-cloudberry-in-database-analytics",
        },
      },
    ],
  },
  GET_SOURCE: {
    title: "Get the Source",
    content: (
      <>
        You can get the whole Bootcamp source code from the GitHub repo{" "}
        <LinkWithBaseUrl
          to="https://github.com/apache/cloudberry-bootcamp"
          className="active-color"
        >
          apache/cloudberry-bootcamp
        </LinkWithBaseUrl>
        .
      </>
    ),
  },
};

let LINK_NAV_CONFIG = Object.keys(BOOTCAMP_PAGE_CONFIG)
  .map((key) => {
    if (key === "DATA_0") {
      const title = BOOTCAMP_PAGE_CONFIG[key].subTitle;
      return {
        label: title,
        id: formatStrHorizontalLine(title),
      };
    } else if (key.startsWith("DATA")) {
      return {
        label: BOOTCAMP_PAGE_CONFIG[key].title,
        id: formatStrHorizontalLine(BOOTCAMP_PAGE_CONFIG[key].title),
      };
    }
  })
  .filter(Boolean);

export { BOOTCAMP_PAGE_CONFIG, LINK_NAV_CONFIG };
