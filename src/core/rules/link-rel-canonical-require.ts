import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'link-rel-canonical-require',
  description:
    '<link rel="canonical"> with non-blank href must be present in <head> tag.',
  init(parser, reporter) {
    let headSeen = false
    let linkCanonicalSeen = false
    let linkCanonicalHref = ''
    let headEvent: Block | null = null

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headSeen = true
        headEvent = event
      } else if (tagName === 'link') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        if (mapAttrs['rel'] && mapAttrs['rel'].toLowerCase() === 'canonical') {
          linkCanonicalSeen = true
          linkCanonicalHref = mapAttrs['href'] || ''
        }
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('end', () => {
      if (headSeen && headEvent) {
        if (!linkCanonicalSeen) {
          reporter.error(
            '<link rel="canonical"> must be present in <head> tag.',
            headEvent.line,
            headEvent.col,
            this,
            headEvent.raw
          )
        } else if (linkCanonicalHref.trim() === '') {
          reporter.error(
            '<link rel="canonical"> href attribute must not be empty.',
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
