import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'meta-viewport-require',
  description:
    '<meta name="viewport"> with non-blank content must be present in <head> tag.',
  init(parser, reporter) {
    let headSeen = false
    let metaViewportSeen = false
    let metaViewportContent = ''
    let headEvent: Block | null = null

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headSeen = true
        headEvent = event
      } else if (tagName === 'meta') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        if (mapAttrs['name'] && mapAttrs['name'].toLowerCase() === 'viewport') {
          metaViewportSeen = true
          metaViewportContent = mapAttrs['content'] || ''
        }
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('end', () => {
      if (headSeen && headEvent) {
        if (!metaViewportSeen) {
          reporter.error(
            '<meta name="viewport"> must be present in <head> tag.',
            headEvent.line,
            headEvent.col,
            this,
            headEvent.raw
          )
        } else if (metaViewportContent.trim() === '') {
          reporter.error(
            '<meta name="viewport"> content attribute must not be empty.',
            headEvent.line,
            headEvent.col,
            this,
            headEvent.raw
          )
        }
      }
    })
  },
} as Rule
