import { Rule } from '../types'

export default {
  id: 'doctype-first',
  description: 'Doctype must be declared first.',
  init(parser, reporter) {
    const allEvent = (event) => {
      if (
        event.type === 'start' ||
        (event.type === 'text' && /^\s*$/.test(event.raw))
      ) {
        return
      }

      if (
        (event.type !== 'comment' && event.long === false) ||
        /^DOCTYPE\s+/i.test(event.content) === false
      ) {
        reporter.error(
          'Doctype must be declared first.',
          event.line,
          event.col,
          this,
          event.raw
        )
      }

      parser.removeListener('all', allEvent)
    }

    parser.addListener('all', allEvent)
  },
} as Rule
