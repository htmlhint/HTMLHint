import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'meta-description-require',
  description:
    '<meta name="description"> with non-blank content must be present in <head> tag.',
  init(parser, reporter) {
    let headSeen = false
    let metaDescriptionSeen = false
    let metaDescriptionContent = ''
    let headEvent: Block | null = null

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headSeen = true
        headEvent = event
      } else if (tagName === 'meta') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        if (
          mapAttrs['name'] &&
          mapAttrs['name'].toLowerCase() === 'description'
        ) {
          metaDescriptionSeen = true
          metaDescriptionContent = mapAttrs['content'] || ''
        }
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('end', () => {
      if (headSeen && headEvent) {
        if (!metaDescriptionSeen) {
          reporter.error(
            '<meta name="description"> must be present in <head> tag.',
            headEvent.line,
            headEvent.col,
            this,
            headEvent.raw
          )
        } else if (metaDescriptionContent.trim() === '') {
          reporter.error(
            '<meta name="description"> content attribute must not be empty.',
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
