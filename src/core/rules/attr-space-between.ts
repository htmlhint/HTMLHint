import { Rule } from '../types'

export default {
  id: 'attr-space-between',
  description: 'Attribute must have spaces between.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      for (const { index, name, raw } of event.attrs) {
        const col = event.col + event.tagName.length + 1

        if (!raw.match(/^\s/)) {
          reporter.error(
            `Attribute "${name}" must be separated with a space`,
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
