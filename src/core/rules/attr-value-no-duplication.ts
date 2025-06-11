import { Rule } from '../types'

export default {
  id: 'attr-value-no-duplication',
  description: 'Attribute values should not contain duplicates.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (attr.value) {
          // Split attribute value by whitespace to get individual values
          const values = attr.value.trim().split(/\s+/)
          const duplicateMap: { [value: string]: boolean } = {}

          for (const value of values) {
            if (duplicateMap[value] === true) {
              reporter.error(
                `Duplicate value [ ${value} ] was found in attribute [ ${attr.name} ].`,
                event.line,
                col + attr.index,
                this,
                attr.raw
              )
              break // Only report the first duplicate found per attribute
            }
            duplicateMap[value] = true
          }
        }
      }
    })
  },
} as Rule
