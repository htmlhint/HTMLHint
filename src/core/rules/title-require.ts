import { Block, Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'title-require',
  description: '<title> must be present in <head> tag.',
  init(parser, reporter) {
    let headBegin = false
    let hasTitle = false

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headBegin = true
      } else if (tagName === 'title' && headBegin) {
        hasTitle = true
      }
    }

    const onTagEnd: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (hasTitle && tagName === 'title') {
        // TODO: fix this error
        // @ts-expect-error
        const lastEvent: Block = event.lastEvent
        if (
          lastEvent.type !== 'text' ||
          (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)
        ) {
          reporter.error(
            '<title></title> must not be empty.',
            event.line,
            event.col,
            this,
            event.raw
          )
        }
      } else if (tagName === 'head') {
        if (hasTitle === false) {
          reporter.error(
            '<title> must be present in <head> tag.',
            event.line,
            event.col,
            this,
            event.raw
          )
        }

        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
} as Rule
