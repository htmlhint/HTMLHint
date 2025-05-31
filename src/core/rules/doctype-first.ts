import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'doctype-first',
  description:
    'Doctype must be declared first (comments and whitespace allowed before DOCTYPE).',
  init(parser, reporter) {
    let doctypeFound = false
    let nonCommentContentBeforeDoctype = false

    const allEvent: Listener = (event) => {
      // Skip start events and whitespace text events
      if (
        event.type === 'start' ||
        (event.type === 'text' && /^\s*$/.test(event.raw))
      ) {
        return
      }

      // If we've found a DOCTYPE, we're done
      if (doctypeFound) {
        return
      }

      // Check if this is a DOCTYPE declaration
      if (
        event.type === 'comment' &&
        event.long === false &&
        /^DOCTYPE\s+/i.test(event.content)
      ) {
        doctypeFound = true
        if (nonCommentContentBeforeDoctype) {
          // If we've already found non-comment content, report an error
          reporter.error(
            'Doctype must be declared before any non-comment content.',
            event.line,
            event.col,
            this,
            event.raw
          )
        }
        return
      }

      // If this is a comment, it's okay before the DOCTYPE
      if (event.type === 'comment') {
        return
      }

      // At this point, we have non-comment, non-whitespace content and no DOCTYPE yet
      nonCommentContentBeforeDoctype = true

      // Report error for the first non-comment content if no doctype found yet
      reporter.error(
        'Doctype must be declared before any non-comment content.',
        event.line,
        event.col,
        this,
        event.raw
      )

      // We only need to report the first error
      parser.removeListener('all', allEvent)
    }

    parser.addListener('all', allEvent)
  },
} as Rule
