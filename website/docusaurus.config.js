// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const PACKAGE = require('../package.json')
const GITHUB_URL = 'https://github.com/htmlhint/HTMLHint'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HTMLHint',
  tagline: 'Static code analysis tool you need for your HTML',
  url: PACKAGE.homepage,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'HTMLHint',
  projectName: PACKAGE.name,
  scripts: ['https://buttons.github.io/buttons.js'],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: `${GITHUB_URL}/edit/master/docs/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: { trackingID: 'UA-109578378-3' },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'HTMLHint',
        logo: {
          alt: 'HTMLHint Logo',
          src: 'img/htmlhint.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'user-guide/getting-started',
            position: 'left',
            label: 'Docs',
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
                label: 'X (Twitter)',
                href: 'https://x.com/HTMLHint',
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
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
