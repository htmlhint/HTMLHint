import { Rule } from '../types'

export default {
  id: 'attr-no-unnecessary-whitespace',
  description: 'No spaces between attribute names and values.',
  init(parser, reporter, options) {
    const exceptions: string[] = Array.isArray(options) ? options : []

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      const col = event.col + event.tagName.length + 1

      for (let i = 0; i < attrs.length; i++) {
        if (exceptions.indexOf(attrs[i].name) === -1) {
          const match = /(\s*)=(\s*)/.exec(attrs[i].raw.trim())
          if (match && (match[1].length !== 0 || match[2].length !== 0)) {
            reporter.error(
              `The attribute '${attrs[i].name}' must not have spaces between the name and value.`,
              event.line,
              col + attrs[i].index,
              this,
              attrs[i].raw
            )
          }
        }
      }
    })
  },
} as Rule
