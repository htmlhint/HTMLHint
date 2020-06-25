import { Rule } from '../types'

export default {
  id: 'attr-value-single-quotes',
  description: 'Attribute values must be in single quotes.',
  init(parser, reportMessageCallback) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (
          (attr.value !== '' && attr.quote !== "'") ||
          (attr.value === '' && attr.quote === '"')
        ) {
          reportMessageCallback(
            `The value of attribute [ ${attr.name} ] must be in single quotes.`,
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
