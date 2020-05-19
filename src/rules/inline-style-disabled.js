export default {
  id: 'inline-style-disabled',
  description: 'Inline style cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      var attrs = event.attrs
      var attr
      var col = event.col + event.tagName.length + 1

      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (attr.name.toLowerCase() === 'style') {
          reporter.warn(
            `Inline style [ ${attr.raw} ] cannot be used.`,
            event.line,
            col + attr.index,
            this,
            attr.raw
          )
        }
      }
    })
  },
}
