/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  docsbars: [

    {
      type: 'category',
      label: 'Introduction',
      items: ['cbdb-overview','cbdb-architecture','cbdb-scenarios','cbdb-vs-gp-features']
     },

    {
      type: 'category',
      label: 'Deployment Guides',
      items: [
      {
        type: 'category',
        label: 'Install from Source Code',
        items: ['cbdb-macos-compile']
      },
      {
        type: 'category',
        label: 'Physical Machine Deployment',
        items: ['cbdb-op-software-hardware','cbdb-op-deploy-arch','cbdb-op-deploy-guide']
      }
     ]
    },

  ]
}

module.exports = sidebars;
