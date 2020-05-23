const path = require('path')

const remarkImages = require('remark-images')
const rehypeTruncate = require('rehype-truncate')

const PACKAGE = require('../package')
const GITHUB_URL = 'https://github.com/htmlhint/HTMLHint'

module.exports = {
  title: 'HTMLHint',
  tagline: 'Static code analysis tool you need for your HTML',
  url: PACKAGE.homepage,
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'HTMLHint',
  projectName: PACKAGE.name,
  scripts: ['https://buttons.github.io/buttons.js'],
  themeConfig: {
    googleAnalytics: { trackingID: 'UA-109578378-3' },
    hotjar: { hjid: 1812834 },
    navbar: {
      title: 'HTMLHint',
      logo: {
        alt: 'HTMLHint Logo',
        src: 'img/htmlhint.png',
      },
      links: [
        {
          label: 'Docs',
          to: '/docs/user-guide/getting-started',
          position: 'left',
        },
        {
          label: 'Playground',
          href: 'https://htmlhint-playground.netlify.app',
          position: 'left',
        },
        {
          href: 'https://github.com/HTMLHint/HTMLHint',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/htmlhint',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/nJ6J9CP',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/HTMLHint',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'HTMLHint organization',
              href: 'https://github.com/HTMLHint',
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} HTMLHint. Built with Docusaurus.`,
    },
  },
  plugins: [
    path.resolve(__dirname, './plugins/docusaurus-plugin-hotjar'),
    [
      '@docusaurus/plugin-sitemap',
      {
        cacheTime: 600 * 1000,
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: `${GITHUB_URL}/edit/develop/docs/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        remarkPlugins: [remarkImages],
        rehypePlugins: [rehypeTruncate],
      },
    ],
  ],
}
