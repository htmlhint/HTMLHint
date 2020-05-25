import { Block } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'input-requires-label',
  description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
  init(parser, reporter) {
    const labelTags: Array<{
      event: Block
      col: number
      forValue?: string
    }> = []
    const inputTags: Array<{ event: Block; col: number; id?: string }> = []

    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const col = event.col + tagName.length + 1

      if (tagName === 'input') {
        inputTags.push({ event: event, col: col, id: mapAttrs['id'] })
      }

      if (tagName === 'label') {
        if ('for' in mapAttrs && mapAttrs['for'] !== '') {
          labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] })
        }
      }
    })

    parser.addListener('end', () => {
      inputTags.forEach((inputTag) => {
        if (!hasMatchingLabelTag(inputTag)) {
          reporter.warn(
            'No matching [ label ] tag found.',
            inputTag.event.line,
            inputTag.col,
            this,
            inputTag.event.raw
          )
        }
      })
    })

    function hasMatchingLabelTag(inputTag: { id?: string }) {
      let found = false
      labelTags.forEach((labelTag) => {
        if (inputTag.id && inputTag.id === labelTag.forValue) {
          found = true
        }
      })
      return found
    }
  },
} as Rule
