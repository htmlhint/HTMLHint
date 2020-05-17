export default {
  id: 'src-not-empty',
  description: 'The src attribute of an img(script,link) must have a value.',
  init: function (parser, reporter) {
    let self = this

    parser.addListener('tagstart', function (event) {
      let tagName = event.tagName
      let attrs = event.attrs
      let attr
      let col = event.col + tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (
          ((/^(img|script|embed|bgsound|iframe)$/.test(tagName) === true &&
            attr.name === 'src') ||
            (tagName === 'link' && attr.name === 'href') ||
            (tagName === 'object' && attr.name === 'data')) &&
          attr.value === ''
        ) {
          reporter.error(
            'The attribute [ ' +
              attr.name +
              ' ] of the tag [ ' +
              tagName +
              ' ] must have a value.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          )
        }
      }
    })
  },
}
