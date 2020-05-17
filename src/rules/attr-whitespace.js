export default {
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  init: function (parser, reporter, options) {
    let self = this
    let exceptions = Array.isArray(options) ? options : []

    parser.addListener('tagstart', function (event) {
      let attrs = event.attrs
      let attr
      let col = event.col + event.tagName.length + 1

      attrs.forEach(function (elem) {
        attr = elem
        let attrName = elem.name

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
