export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  init: function (parser, reporter) {
    const self = this

    parser.addListener('text', function (event) {
      const raw = event.raw
      // TODO: improve use-cases for &
      // eslint-disable-next-line
      const reSpecChar = /([<>])|( \& )/g
      let match

      while ((match = reSpecChar.exec(raw))) {
        const fixedPos = parser.fixPos(event, match.index)
        reporter.error(
          'Special characters must be escaped : [ ' + match[0] + ' ].',
          fixedPos.line,
          fixedPos.col,
          self,
          event.raw
        )
      }
    })
  },
}
