import { Rule } from '../types'

export default {
  id: 'attr-no-protocol-relative-url',
  description:
    'The src and href attributes must not use protocol-relative URLs.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const col = event.col + event.tagName.length + 1

      for (const attr of event.attrs) {
        const attrName = attr.name.toLowerCase()

        if (
          (attrName === 'src' || attrName === 'href') &&
          // Match // after optional leading whitespace, e.g. "//cdn.example.com"
          // or " //cdn.example.com", but not "https://cdn.example.com" or "/app.js".
          /^\s*\/\//.test(attr.value)
        ) {
          reporter.warn(
            `The ${attr.name} attribute must use an explicit protocol instead of a protocol-relative URL.`,
            event.line,
            col + attr.index,
            this,
            attr.raw
          )
        }
      }
    })
  },
} as Rule
