import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'main-require',
  description: '<main> must be present in <body> tag.',
  init(parser, reporter) {
    let bodyDepth = 0
    let hasMainInBody = false
    let bodyTagEvent: Block | null = null

    const onTagStart: Listener = (event: Block) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'body') {
        bodyDepth++
        if (bodyDepth === 1) {
          hasMainInBody = false
          bodyTagEvent = event
        }
      } else if (tagName === 'main' && bodyDepth > 0) {
        hasMainInBody = true
      }
    }

    const onTagEnd: Listener = (event: Block) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'body') {
        if (bodyDepth === 1 && !hasMainInBody && bodyTagEvent) {
          reporter.warn(
            '<main> must be present in <body> tag.',
            bodyTagEvent.line,
            bodyTagEvent.col,
            this,
            bodyTagEvent.raw
          )
        }
        bodyDepth--
        if (bodyDepth < 0) bodyDepth = 0
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
    parser.addListener('end', () => {
      // Handle case where <body> is not closed (malformed HTML)
      if (bodyDepth > 0 && !hasMainInBody && bodyTagEvent) {
        reporter.warn(
          '<main> must be present in <body> tag.',
          bodyTagEvent.line,
          bodyTagEvent.col,
          this,
          bodyTagEvent.raw
        )
      }
    })
  },
} as Rule
