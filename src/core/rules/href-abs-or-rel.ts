import { Rule } from '../types'

export default {
  id: 'href-abs-or-rel',
  description: 'An href attribute must be either absolute or relative.',
  init(parser, reporter, options) {
    const hrefMode = options === 'abs' ? 'absolute' : 'relative'

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (attr.name === 'href') {
          if (
            (hrefMode === 'absolute' && /^\w+?:/.test(attr.value) === false) ||
            (hrefMode === 'relative' &&
              /^https?:\/\//.test(attr.value) === true)
          ) {
            reporter.warn(
              `The value of the href attribute [ ${attr.value} ] must be ${hrefMode}.`,
              event.line,
              col + attr.index,
              this,
              attr.raw
            )
          }
          break
        }
      }
    })
  },
} as Rule
