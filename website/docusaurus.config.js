module.exports = {
  title: 'StateX',
  tagline: 'StateX - A React state management library',
  url: 'https://cloudioinc.github.io/',
  baseUrl: '/statex/',
  favicon: 'img/favicon.ico',
  organizationName: 'CloudIOInc',
  projectName: 'statex',
  themeConfig: {
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
            {
              label: 'GitHub',
              href: 'https://github.com/CloudIOInc/statex',
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
  plugins: [require.resolve('my-loaders')],
};
