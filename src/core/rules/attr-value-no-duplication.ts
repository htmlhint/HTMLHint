import { Rule } from '../types'

export default {
  id: 'attr-value-no-duplication',
  description: 'Attribute values should not contain duplicates.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      // Skip SVG elements entirely
      if (event.tagName.toLowerCase() === 'svg') {
        return
      }

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        // Skip content, media, and style attributes entirely
        if (
          attr.name.toLowerCase() === 'content' ||
          attr.name.toLowerCase() === 'd' ||
          attr.name.toLowerCase() === 'media' ||
          attr.name.toLowerCase() === 'sizes' ||
          attr.name.toLowerCase() === 'src' ||
          attr.name.toLowerCase() === 'style' ||
          attr.name.toLowerCase().startsWith('on') // Skip all event handlers (onclick, onchange, etc.)
        ) {
          continue
        }

        if (attr.value) {
          let values: string[]
          if (attr.name.toLowerCase() === 'media') {
            // For media, treat each comma-separated part as a whole
            values = attr.value
              .split(',')
              .map((part) => part.trim())
              .filter(Boolean)
          } else {
            // For other attributes, split by whitespace only
            values = attr.value.trim().split(/\s+/)
          }

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
