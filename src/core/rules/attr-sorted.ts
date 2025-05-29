import { Rule } from '../types'

export default {
  id: 'attr-sorted',
  description: 'Attribute tags must be in proper order.',
  init(parser, reporter) {
    const orderMap: { [key: string]: number } = {}
    const sortOrder = [
      'class',
      'id',
      'name',
      'src',
      'for',
      'type',
      'rel',
      'href',
      'value',
      'title',
      'alt',
      'role',
    ]

    for (let i = 0; i < sortOrder.length; i++) {
      orderMap[sortOrder[i]] = i
    }

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      const listOfAttributes = []

      for (let i = 0; i < attrs.length; i++) {
        listOfAttributes.push(attrs[i].name)
      }

      const originalAttrs = JSON.stringify(listOfAttributes)
      listOfAttributes.sort((a, b) => {
        // Sort a defined attribute.
        if (orderMap[a] !== undefined) {
          // With another defined attribute.
          if (orderMap[b] !== undefined) {
            return orderMap[a] - orderMap[b]
          }
          // With a data-* attribute or a lambda attribute.
          return -1
        }

        // Sort a data-* attribute.
        if (a.startsWith('data-')) {
          // With another data-* attribute.
          if (b.startsWith('data-')) {
            return a.localeCompare(b)
          }
          // With a defined attribute or a lambda attribute.
          return 1
        }

        // Sort a lambda attribute.
        // With a defined attribute.
        if (orderMap[b] !== undefined) {
          return 1
        }
        // With a data-* attribute.
        if (b.startsWith('data-')) {
          return -1
        }
        // With another lambda attribute.
        return a.localeCompare(b)
      })

      if (originalAttrs !== JSON.stringify(listOfAttributes)) {
        reporter.error(
          `Inaccurate order ${originalAttrs} should be in hierarchy ${JSON.stringify(
            listOfAttributes
          )} `,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
