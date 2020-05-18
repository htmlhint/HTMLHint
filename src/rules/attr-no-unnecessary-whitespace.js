export default {
  id: 'attr-no-unnecessary-whitespace',
  description: 'No spaces between attribute names and values.',
  init: function (parser, reporter, options) {
    var self = this
    var exceptions = Array.isArray(options) ? options : []

    parser.addListener('tagstart', function (event) {
      var attrs = event.attrs
      var col = event.col + event.tagName.length + 1

      for (var i = 0; i < attrs.length; i++) {
        if (exceptions.indexOf(attrs[i].name) === -1) {
          var match = /(\s*)=(\s*)/.exec(attrs[i].raw.trim())
          if (match && (match[1].length !== 0 || match[2].length !== 0)) {
            reporter.error(
              `The attribute '${attrs[i].name}' must not have spaces between the name and value.`,
              event.line,
              col + attrs[i].index,
              self,
              attrs[i].raw
            )
          }
        }
      }
    })
  },
}
