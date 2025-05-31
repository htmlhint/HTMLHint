import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'h1-require',
  description: '<h1> must be present in <body> tag and not be empty.',
  init(parser, reporter) {
    let bodyDepth = 0
    let hasH1InBody = false
    let bodyTagEvent: Block | null = null
    let currentH1Event: Block | null = null
    let h1IsEmpty = false

    const onTagStart: Listener = (event: Block) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'body') {
        bodyDepth++
        if (bodyDepth === 1) {
          hasH1InBody = false
          bodyTagEvent = event
        }
      } else if (tagName === 'h1' && bodyDepth > 0) {
        hasH1InBody = true
        currentH1Event = event
        h1IsEmpty = true // Assume empty until we find content
      }
    }

    const onText: Listener = (event: Block) => {
      // If we're inside an h1 tag and find non-whitespace text, mark it as not empty
      if (currentH1Event && h1IsEmpty) {
        if (event.raw && !/^\s*$/.test(event.raw)) {
          h1IsEmpty = false
        }
      }
    }

    const onTagEnd: Listener = (event: Block) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'h1' && currentH1Event) {
        if (h1IsEmpty) {
          reporter.warn(
            '<h1> tag must not be empty.',
            currentH1Event.line,
            currentH1Event.col,
            this,
            currentH1Event.raw
          )
        }
        currentH1Event = null
      } else if (tagName === 'body') {
        if (bodyDepth === 1 && !hasH1InBody && bodyTagEvent) {
          reporter.warn(
            '<h1> must be present in <body> tag.',
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
    parser.addListener('text', onText)
    parser.addListener('end', () => {
      // Handle case where <body> is not closed (malformed HTML)
      if (bodyDepth > 0 && !hasH1InBody && bodyTagEvent) {
        reporter.warn(
          '<h1> must be present in <body> tag.',
          bodyTagEvent.line,
          bodyTagEvent.col,
          this,
          bodyTagEvent.raw
        )
      }
    })
  },
} as Rule
