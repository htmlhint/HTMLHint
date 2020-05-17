export default {
  id: 'attr-whitespace',
  description:
    'All attributes should be separated by only one space and not have leading/trailing whitespace.',
  init: function (parser, reporter, options) {
    const self = this
    const exceptions = Array.isArray(options) ? options : []

    parser.addListener('tagstart', function (event) {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      attrs.forEach(function (elem) {
        attr = elem
        const attrName = elem.name

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
