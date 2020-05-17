export default {
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  init: function (parser, reporter, options) {
    var self = this
    var exceptions = Array.isArray(options) ? options : []

    parser.addListener('tagstart', (event) => {
      var attrs = event.attrs
      var attr
      var col = event.col + event.tagName.length + 1

      attrs.forEach((elem) => {
        attr = elem
        var attrName = elem.name

        if (exceptions.indexOf(attrName) !== -1) {
          return
        }

        //Check first and last characters for spaces
        if (elem.value.trim(elem.value) !== elem.value) {
          reporter.error(
            'The attributes of [ ' +
              attrName +
              ' ] must not have trailing whitespace.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          )
        }

        if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
          reporter.error(
            'The attributes of [ ' +
              attrName +
              ' ] must be separated by only one space.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          )
        }
      })
    })
  },
}
