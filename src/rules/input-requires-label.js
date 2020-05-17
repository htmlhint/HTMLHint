export default {
  id: 'input-requires-label',
  description: 'All [ input ] tags must have a corresponding [ label ] tag. ',
  init: function (parser, reporter) {
    var self = this
    var labelTags = []
    var inputTags = []

    parser.addListener('tagstart', (event) => {
      var tagName = event.tagName.toLowerCase()
      var mapAttrs = parser.getMapAttrs(event.attrs)
      var col = event.col + tagName.length + 1

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
            self,
            inputTag.event.raw
          )
        }
      })
    })

    function hasMatchingLabelTag(inputTag) {
      var found = false
      labelTags.forEach((labelTag) => {
        if (inputTag.id && inputTag.id === labelTag.forValue) {
          found = true
        }
      })
      return found
    }
  },
}
