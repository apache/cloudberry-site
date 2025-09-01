## Apache Cloudberry (Incubating) Website & Documentation

[![Website](https://img.shields.io/badge/Website-eebc46)](https://cloudberry.apache.org)
[![Documentation](https://img.shields.io/badge/Documentation-acd94a)](https://cloudberry.apache.org/docs)
[![Slack](https://img.shields.io/badge/Join_Slack-6a32c9)](https://inviter.co/apache-cloudberry)
[![Twitter Follow](https://img.shields.io/twitter/follow/ASFCloudberry)](https://twitter.com/ASFCloudberry)
[![WeChat](https://img.shields.io/badge/WeChat-eebc46)](https://cloudberry.apache.org/community/wechat)
[![Youtube](https://img.shields.io/badge/Youtube-gebc46)](https://youtube.com/@ApacheCloudberry)

---

## Website Directory Structure

```
.
├── LICENSE
├── NOTICE
├── README.md
├── babel.config.js
├── blog
├── docs
├── docusaurus.config.ts
├── global.d.ts
├── package-lock.json
├── package.json
├── scripts
├── sidebars.ts
├── src
├── static
└── tsconfig.json
```

Notable directories Description:

1. Blog

   The Blog post files are placed in the `blog` directory. You need
   to create one new folder for each new post and add the author
   information to the `blog/authors.yml`.

2. Document

   The latest version of the document is under the `docs` (en) 
   directory. Media including images, video can be placed in
   `docs/media` folder. You must add the new doc file name to
   `sidebars.js` to make it display on the website.

3. Pictures

   All images are placed in the `static/img` directory.

## Website Building

This website is built using [Docusaurus 3](https://docusaurus.io/), a
modern static website generator. If you don't know Docusaurus, please
learn more from [Docusaurus website](https://docusaurus.io/).

You can follow these steps to install and build the Apache Cloudberry
website in your local environment.

1. Clone website source

```
$ git clone https://github.com/apache/cloudberry-site.git
```

2. Install dependencies

Before building the website, you need to install dependencies to make
sure no errors when building.

```
$ npm install
```

3. Build and run

```
$ npm run build
$ npm run serve
```

This command generates static content into the `build` directory and
can be served using any static contents hosting service.

Then you can visit `localhost:3000` in the browser.

4. (Option) If you want to run the local development environment, you
   can skip Step 3 to run the following command directly:

```
$ npm run start
```

This command starts a local development server and opens up a browser
window. Most changes are reflected live without having to restart the
server.

## Document Contribution

Our documents are still in construction, welcome to help. If you're
interested in [document
contribution](https://cloudberry.apache.org/community/docs-contributing-guide),
you can submit the pull request
[here](https://github.com/apache/cloudberry-site/tree/main/docs).

# License

Apache License Version 2.0 (see LICENSE & NOTICE).
