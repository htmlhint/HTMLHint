import { Rule } from '../types'

export default {
  id: 'attr-value-no-duplication',
  description:
    'Class attributes should not contain duplicate values. Other attributes can be checked via configuration.',
  init(parser, reporter, options) {
    // Default attributes to check - by default, only check class
    const defaultAttributesToCheck = ['class']

    // Allow custom configuration of attributes to check
    const attributesToCheck = Array.isArray(options)
      ? options
      : defaultAttributesToCheck

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        const attrName = attr.name.toLowerCase()

        // Strict check - only process attributes in our allowlist
        if (!attributesToCheck.includes(attrName)) {
          continue
        }

        // Only process attributes with values containing spaces
        if (!attr.value || !/\s/.test(attr.value)) {
          continue
        }

        // Split by whitespace - this is appropriate for class, id, role, etc.
        const values = attr.value.trim().split(/\s+/)
        const duplicateMap: { [value: string]: boolean } = {}

        for (const value of values) {
          if (value && duplicateMap[value] === true) {
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
    })
  },
} as Rule
