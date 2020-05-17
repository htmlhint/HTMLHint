const path = require('path')

const remarkImages = require('remark-images')
const rehypeTruncate = require('rehype-truncate')

module.exports = {
  title: 'HTMLHint',
  tagline: 'Static code analysis tool you need for your HTML',
  url: 'https://htmlhint.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'HTMLHint',
  projectName: 'HTMLHint',
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
          to: '/playground',
          position: 'left',
        },
        { search: true },
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
              href: 'https://discord.gg/suKkzP',
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
      copyright: `Copyright © ${new Date().getFullYear()} HTMLHint. Built with Docusaurus.`,
    },
  },
  plugins: [path.resolve(__dirname, './plugins/docusaurus-plugin-hotjar')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: `../docs`,
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/htmlhint/edit/HTMLHint/docs/',
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
