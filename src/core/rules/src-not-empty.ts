import { Rule } from '../types'

export default {
  id: 'src-not-empty',
  description: 'The src attribute of an img(script,link) must have a value.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      // HTML tag and attribute names are ASCII case insensitive, so compare
      // against the lowercased form. The parser hands them over exactly as they
      // were written.
      const tagName = event.tagName.toLowerCase()
      const attrs = event.attrs
      let attr
      const col = event.col + tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        const attrName = attr.name.toLowerCase()

        if (
          ((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
            attrName === 'src') ||
            (tagName === 'link' && attrName === 'href') ||
            (tagName === 'object' && attrName === 'data')) &&
          attr.value === ''
        ) {
          reporter.error(
            `The attribute [ ${attr.name} ] of the tag [ ${tagName} ] must have a value.`,
            event.line,
            col + attr.index,
            this,
            attr.raw
          )
        }
      }
    })
  },
} as Rule
