// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

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
        baseUrl: 'https://github.com/htmlhint/htmlhint/edit/main/website/docs/',
      },
      lastUpdated: true,
      pagination: false,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/htmlhint/htmlhint',
        },
        {
          icon: 'x.com',
          label: 'x',
          href: 'https://x.com/htmlhint',
        },
        {
          icon: 'openCollective',
          label: 'Open Collective',
          href: 'https://opencollective.com/htmlhint',
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
