import { Rule } from '../types'

export default {
  id: 'attr-sorted',
  description: 'Attribute tags must be in proper order.',
  init(parser, reportMessageCallback) {
    const orderMap: { [key: string]: number } = {}
    const sortOrder = [
      'class',
      'id',
      'name',
      'src',
      'for',
      'type',
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
        if (orderMap[a] == undefined && orderMap[b] == undefined) {
          return 0
        }
        if (orderMap[a] == undefined) {
          return 1
        } else if (orderMap[b] == undefined) {
          return -1
        }
        return orderMap[a] - orderMap[b] || a.localeCompare(b)
      })

      if (originalAttrs !== JSON.stringify(listOfAttributes)) {
        reportMessageCallback(
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
