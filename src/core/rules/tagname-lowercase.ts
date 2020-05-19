import { Rule } from '../types'

export default {
  id: 'tagname-lowercase',
  description: 'All html element names must be in lowercase.',
  init(parser, reporter, options) {
    const exceptions = Array.isArray(options) ? options : []

    parser.addListener('tagstart,tagend', (event) => {
      const tagName = event.tagName
      if (
        exceptions.indexOf(tagName) === -1 &&
        tagName !== tagName.toLowerCase()
      ) {
        reporter.error(
          `The html element name of [ ${tagName} ] must be in lowercase.`,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
