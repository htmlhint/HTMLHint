import { Rule } from '../types'

export default {
  id: 'tagname-specialchars',
  description: 'All html element names must not contain specialchars.',
  init(parser, reportMessageCallback) {
    const specialchars = /[^a-zA-Z0-9\-:_]/

    parser.addListener('tagstart,tagend', (event) => {
      const tagName = event.tagName
      if (specialchars.test(tagName)) {
        reportMessageCallback(
          `The html element name of [ ${tagName} ] contains special character.`,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
