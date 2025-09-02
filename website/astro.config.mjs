// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLlmsTxt from 'starlight-llms-txt'

// https://astro.build/config
export default defineConfig({
  site: 'https://htmlhint.com/',
  base: '/',
  compressHTML: true,
  outDir: './build',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'HTMLHint',
      favicon: '/favicon.ico',
      defaultLocale: 'en-US',
      customCss: ['/src/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/htmlhint/htmlhint/edit/main/website/',
      },
      lastUpdated: true,
      pagination: false,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      plugins: [
        starlightLlmsTxt({
          projectName: 'HTMLHint',
        }),
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/htmlhint/htmlhint',
        },
        {
          icon: 'mastodon',
          label: 'Mastodon',
          href: 'https://mastodon.social/@htmlhint',
        },
        {
          icon: 'openCollective',
          label: 'Open Collective',
          href: 'https://opencollective.com/htmlhint',
        },
        {
          icon: 'stackOverflow',
          label: 'stackOverflow',
          href: 'https://stackoverflow.com/questions/tagged/htmlhint',
        },
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            href: 'https://fonts.gstatic.com/',
            rel: 'preconnect',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
            rel: 'stylesheet',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/site.webmanifest',
            crossorigin: 'use-credentials',
            fetchpriority: 'low',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://plausible.io/js/script.hash.outbound-links.pageview-props.tagged-events.js',
            defer: true,
            'data-domain': 'htmlhint.com',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: 'data:text/javascript,window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
            defer: true,
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'google-site-verification',
            content: 'SZqy8VdlOvKGm1TpPUAhIe6F1dHhhEmaFC2nmbv9-Tw',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'msvalidate.01',
            content: 'FE5F7C37D3394A82C074EB2713834A35',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'color-scheme',
            content: 'light dark',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'fediverse:creator',
            content: '@htmlhint@mastodon.social',
          },
        },
        {
          tag: 'script',
          attrs: {
            type: 'speculationrules',
          },
          content: `\n{\n  "prerender": [{\n    "where": {\n      "href_matches": "/*"\n    },\n    "eagerness": "moderate"\n  }]\n}\n`,
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          link: '/getting-started/',
        },
        {
          label: 'Configuration',
          link: '/configuration/',
        },
        {
          label: 'Usage',
          collapsed: true,
          autogenerate: { directory: 'usage' },
        },
        {
          label: 'Rules',
          collapsed: true,
          autogenerate: { directory: 'rules' },
        },
        {
          label: 'VS Code Extension',
          link: '/vs-code-extension/',
        },
        {
          label: 'Integrations',
          collapsed: true,
          autogenerate: { directory: 'integrations' },
        },
        {
          label: 'Changelog',
          link: '/changelog/',
        },
        {
          label: 'GitHub',
          link: 'https://github.com/htmlhint/htmlhint',
          attrs: { target: '_blank' },
        },
      ],
    }),
  ],
})
