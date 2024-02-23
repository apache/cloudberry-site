import React from "react";
import LinkWithBaseUrl from "../components/common/LinkWithBaseUrl";
import { isZhLangrage } from "../utils";

let HOME_HEADER_TIPS = "Cloudberry Database is open sourced now";

let FEATURE_HIGHLIGHT = [
  {
    icon: "/img/home/feature/muc.png",
    title: "More Use Cases",
    content:
      "Cloudberry Database can be used in different scenarios, including batch processing data warehouse offline, building data warehouse in real-time, and more. Also, you can use it as an alternative to existing MPP databases.",
  },
  {
    icon: "/img/home/feature/hesc.png",
    title: "Highly Elastic Scaling Capability",
    content:
      "Cloudberry Database can independently scale out computing and storage resources to achieve fully elastic adjustments in throughput, response time, and data capacity.",
  },
  {
    icon: "/img/home/feature/sac.png",
    title: "Strong Analytical Capability",
    content:
      "Inheriting the rich analytical features from PostgreSQL and Greenplum Database, Cloudberry Database leverages them to the cloud platform, and seamlessly integrates the mainstream ETL and BI tools.",
  },
  {
    icon: "/img/home/feature/cuwmt.png",
    title: "Catch up with Mainstream Technology",
    content:
      "Cloudberry Database supports mainstream data analytical features such as machine learning, graph calculation, and spatiotemporal analyses.",
  },
  {
    icon: "/img/home/feature/p14i.png",
    title: "PostgreSQL 14 Inside",
    content:
      "Cloudberry Database adopts the newer PostgreSQL version 14 inside to let users enjoy more with the backend global community.",
  },
  {
    icon: "/img/home/feature/mef.png",
    title: "More Enterprise Features",
    content:
      "Cloudberry Database supports multi-tenant management, relational data models, standard JDBC and ODBC interfaces, and more.",
  },
];

let WHY_CLOUDBERRY_DATABASE = [
  {
    pic: "/img/home/os.png",
    title: "100% Open Source",
    desc: "Cloudberry Database is 100% open-sourced with an active community. You can find all the source code on GitHub as you need.",
  },
  {
    pic: "/img/home/pr.png",
    title: "Production Ready",
    desc: "Cloudberry Database has been deployed in many critical production environments with high availability.",
  },
  {
    pic: "/img/home/pc.png",
    title: "PostgreSQL Compatibility",
    desc: "Cloudberry Database is highly compatible with PostgreSQL, enabling you to leverage the advantages of the strong PostgreSQL ecosystem.",
  },
];
let JOIN_COMMUNITY = {
  content: (
    <>
      Cloudberry Database has a growing open source community, with contributors
      from around the globe building features, documentation, and assisting
      other users. There are many ways to contribute to Cloudberry Database, and
      you can easily find the ones that suit your skills and interests to{" "}
      <b>
        <LinkWithBaseUrl style={{ color: "inherit" }} to={"/contribute"}>
          begin your contribution
        </LinkWithBaseUrl>
      </b>{" "}
      journey. Additionally, our community is always there to{" "}
      <b>
        <LinkWithBaseUrl style={{ color: "inherit" }} to="/support">
          help and provide support
        </LinkWithBaseUrl>
      </b>{" "}
      whenever you need it.
    </>
  ),
};

const LINKS = {
  github: "https://github.com/cloudberrydb",
  twitter: "https://twitter.com/cloudberrydb",
  youtube: "https://youtube.com/@cloudberrydb",
  community: "https://communityinviter.com/apps/cloudberrydb/welcome",
  wechat: "/community/wechat",
  discoverMore: "/docs",
};

// zh language
if (isZhLangrage()) {
  HOME_HEADER_TIPS = "Cloudberry Database is open sourced now";
  FEATURE_HIGHLIGHT = [
    {
      icon: "/img/home/feature/muc.png",
      title: "More Use Cases",
      content:
        "Cloudberry Database can be used in different scenarios, including batch processing data warehouse offline, building data warehouse in real-time, and more. Also, you can use it as an alternative to existing MPP databases.",
    },
    {
      icon: "/img/home/feature/hesc.png",
      title: "Highly Elastic Scaling Capability",
      content:
        "Cloudberry Database can independently scale out computing and storage resources to achieve fully elastic adjustments in throughput, response time, and data capacity.",
    },
    {
      icon: "/img/home/feature/sac.png",
      title: "Strong Analytical Capability",
      content:
        "Inheriting the rich analytical features from PostgreSQL and Greenplum Database, Cloudberry Database leverages them to the cloud platform, and seamlessly integrates the mainstream ETL and BI tools.",
    },
    {
      icon: "/img/home/feature/cuwmt.png",
      title: "Catch up with Mainstream Technology",
      content:
        "Cloudberry Database supports mainstream data analytical features such as machine learning, graph calculation, and spatiotemporal analyses.",
    },
    {
      icon: "/img/home/feature/p14i.png",
      title: "PostgreSQL 14 Inside",
      content:
        "Cloudberry Database adopts the newer PostgreSQL version 14 inside to let users enjoy more with the backend global community.",
    },
    {
      icon: "/img/home/feature/mef.png",
      title: "More Enterprise Features",
      content:
        "Cloudberry Database supports multi-tenant management, relational data models, standard JDBC and ODBC interfaces, and more.",
    },
  ];
  WHY_CLOUDBERRY_DATABASE = [
    {
      pic: "/img/home/os.png",
      title: "100% Open Source",
      desc: "Cloudberry Database is 100% open-sourced with an active community. You can find all the source code on GitHub as you need.",
    },
    {
      pic: "/img/home/pr.png",
      title: "Production Ready",
      desc: "Cloudberry Database has been deployed in many critical production environments with high availability.",
    },
    {
      pic: "/img/home/pc.png",
      title: "PostgreSQL Compatibility",
      desc: "Cloudberry Database is highly compatible with PostgreSQL, enabling you to leverage the advantages of the strong PostgreSQL ecosystem.",
    },
  ];
  JOIN_COMMUNITY.content = (
    <>
      Cloudberry Database has a growing open source community, with contributors
      from around the globe building features, documentation, and assisting
      other users. There are many ways to contribute to Cloudberry Database, and
      you can easily find the ones that suit your skills and interests to{" "}
      <b>
        <LinkWithBaseUrl style={{ color: "inherit" }} to={"/contribute"}>
          begin your contribution
        </LinkWithBaseUrl>
      </b>{" "}
      journey. Additionally, our community is always there to{" "}
      <b>
        <LinkWithBaseUrl style={{ color: "inherit" }} to="/support">
          help and provide support
        </LinkWithBaseUrl>
      </b>{" "}
      whenever you need it.
    </>
  );
}

export {
  FEATURE_HIGHLIGHT,
  HOME_HEADER_TIPS,
  JOIN_COMMUNITY,
  LINKS,
  WHY_CLOUDBERRY_DATABASE,
};
