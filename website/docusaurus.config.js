/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

module.exports = {
  title: 'StateX',
  tagline: 'A state management library for React',
  url: 'https://cloudioinc.github.io/',
  baseUrl: '/statex/',
  favicon: 'img/favicon.ico',
  organizationName: 'CloudIOInc',
  projectName: 'statex',
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-46294606-4',
    },
    algolia: {
      apiKey: '6b2cd755d4ade9ffd58e237a342a4f7c',
      indexName: 'statex',
    },
    navbar: {
      title: 'StateX',
      logo: {
        alt: 'StateX Logo',
        src: 'img/cloudio_icon.png',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/CloudIOInc/statex',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/CloudIOInc/statex',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/cloudio-inc/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/CloudIOPlatform',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'CloudIO',
              href: 'https://cloudio.io/',
            },
            {
              label: 'Blog',
              href: 'https://cloudio.io/resources/',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy',
              href: 'https://cloudio.io/privacy-policy/',
            },
            {
              label: 'Cookies',
              href: 'https://cloudio.io/cookie-policy/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CloudIO, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          homePageId: 'introduction/getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/CloudIOInc/statex/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: [require.resolve('@docusaurus/theme-live-codeblock')],
};
