import { Rule } from '../types'

export default {
  id: 'doctype-html5',
  description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
  init(parser, reporter) {
    const onComment = (event) => {
      if (
        event.long === false &&
        event.content.toLowerCase() !== 'doctype html'
      ) {
        reporter.warn(
          'Invalid doctype. Use: "<!DOCTYPE html>"',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    }

    const onTagStart = () => {
      parser.removeListener('comment', onComment)
      parser.removeListener('tagstart', onTagStart)
    }

    parser.addListener('all', onComment)
    parser.addListener('tagstart', onTagStart)
  },
} as Rule
