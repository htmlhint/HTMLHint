import { Rule } from '../types'

export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  init(parser, reportMessageCallback) {
    parser.addListener('text', (event) => {
      const raw = event.raw
      // TODO: improve use-cases for &
      const reSpecChar = /([<>])|( \& )/g
      let match

      while ((match = reSpecChar.exec(raw))) {
        const fixedPos = parser.fixPos(event, match.index)
        reportMessageCallback(
          `Special characters must be escaped : [ ${match[0]} ].`,
          fixedPos.line,
          fixedPos.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
