import { Rule } from '../types'

export default {
  id: 'attr-space-between',
  description: 'Attributes must be separated by a space.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const col = event.col + event.tagName.length + 1

      for (const { index, name, raw } of event.attrs) {
        if (!raw.match(/^\s/)) {
          reporter.error(
            `Attribute [ ${name} ] must be separated with a space.`,
            event.line,
            col + index,
            this,
            event.raw
          )
        }
      }
    })
  },
} as Rule
