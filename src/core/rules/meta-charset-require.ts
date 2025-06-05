import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'meta-charset-require',
  description: '<meta charset=""> must be present in <head> tag.',
  init(parser, reporter) {
    let headSeen = false
    let metaCharsetSeen = false
    let metaCharsetContent = ''
    let headEvent: Block | null = null

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headSeen = true
        headEvent = event
      } else if (tagName === 'meta') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        if (mapAttrs['charset'] !== undefined) {
          metaCharsetSeen = true
          metaCharsetContent = mapAttrs['charset'] || ''
        }
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('end', () => {
      if (headSeen && headEvent) {
        if (!metaCharsetSeen) {
          reporter.error(
            '<meta charset=""> must be present in <head> tag.',
            headEvent.line,
            headEvent.col,
            this,
            headEvent.raw
          )
        } else if (metaCharsetContent.trim() === '') {
          reporter.error(
            '<meta charset=""> value must not be empty.',
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
