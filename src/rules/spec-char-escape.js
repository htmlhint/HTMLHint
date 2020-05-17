export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  init(parser, reporter) {
    parser.addListener('text', (event) => {
      var raw = event.raw
      // TODO: improve use-cases for &
      // eslint-disable-next-line
      var reSpecChar = /([<>])|( \& )/g
      var match

      while ((match = reSpecChar.exec(raw))) {
        var fixedPos = parser.fixPos(event, match.index)
        reporter.error(
          'Special characters must be escaped : [ ' + match[0] + ' ].',
          fixedPos.line,
          fixedPos.col,
          this,
          event.raw
        )
      }
    })
  },
}
