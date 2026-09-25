import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'title-require',
  description: '<title> must be present in <head> tag.',
  init(parser, reporter) {
    let headBegin = false
    let hasTitle = false
    let inTitle = false
    let titleHasText = false

    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (tagName === 'head') {
        headBegin = true
      } else if (tagName === 'title' && headBegin) {
        hasTitle = true
        inTitle = true
        titleHasText = false
      }
    }

    // Any non-whitespace text inside <title> counts, so content mixed with
    // comments (e.g. Apache SSI directives) is not reported as empty.
    const onText: Listener = (event) => {
      if (inTitle && /\S/.test(event.raw)) {
        titleHasText = true
      }
    }

    const onTagEnd: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      if (hasTitle && tagName === 'title') {
        inTitle = false
        if (!titleHasText) {
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
        parser.removeListener('text', onText)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
    parser.addListener('text', onText)
  },
} as Rule
