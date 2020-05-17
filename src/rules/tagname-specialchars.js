export default {
  id: 'tagname-specialchars',
  description: 'All html element names must be in lowercase.',
  init: function (parser, reporter) {
    var self = this
    var specialchars = /[^a-zA-Z0-9\-:_]/

    parser.addListener('tagstart,tagend', function (event) {
      var tagName = event.tagName
      if (specialchars.test(tagName)) {
        reporter.error(
          'The html element name of [ ' +
            tagName +
            ' ] contains special character.',
          event.line,
          event.col,
          self,
          event.raw
        )
      }
    })
  },
}
