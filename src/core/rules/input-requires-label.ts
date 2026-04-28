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
    const inputTags: Array<{
      event: Block
      col: number
      id?: string
      nested: boolean
    }> = []
    let labelDepth = 0
    const labelStateStack: Array<{
      hasText: boolean
      inputStartIndex: number
    }> = []

    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const col = event.col + tagName.length + 1

      if (tagName === 'input') {
        // label is not required for hidden input
        if (mapAttrs['type'] !== 'hidden') {
          inputTags.push({
            event: event,
            col: col,
            id: mapAttrs['id'],
            nested: labelDepth > 0,
          })
        }
      }

      if (tagName === 'label') {
        if ('for' in mapAttrs && mapAttrs['for'] !== '') {
          // explicit label: associates with the referenced control, not nested ones
          labelTags.push({ event: event, col: col, forValue: mapAttrs['for'] })
        } else if (!event.close) {
          // implicit label (no `for`): nesting labels the input
          // a self-closing <label/> opens no scope and emits no tagend
          labelDepth++
          labelStateStack.push({
            hasText: false,
            inputStartIndex: inputTags.length,
          })
        }
      }
    })

    parser.addListener('tagend', (event) => {
      if (event.tagName.toLowerCase() === 'label' && labelDepth > 0) {
        const state = labelStateStack.pop()
        if (state && !state.hasText) {
          for (let i = state.inputStartIndex; i < inputTags.length; i++) {
            inputTags[i].nested = false
          }
        } else if (state && state.hasText && labelStateStack.length > 0) {
          labelStateStack[labelStateStack.length - 1].hasText = true
        }
        labelDepth--
      }
    })

    parser.addListener('text', (event) => {
      if (
        labelDepth > 0 &&
        event.raw &&
        !/^\s*$/.test(event.raw) &&
        labelStateStack.length > 0
      ) {
        labelStateStack[labelStateStack.length - 1].hasText = true
      }
    })

    parser.addListener('end', () => {
      inputTags.forEach((inputTag) => {
        if (!inputTag.nested && !hasMatchingLabelTag(inputTag)) {
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
