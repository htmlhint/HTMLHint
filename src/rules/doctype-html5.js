export default {
  id: 'doctype-html5',
  description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
  init: function (parser, reporter) {
    const self = this

    function onComment(event) {
      if (
        event.long === false &&
        event.content.toLowerCase() !== 'doctype html'
      ) {
        reporter.warn(
          'Invalid doctype. Use: "<!DOCTYPE html>"',
          event.line,
          event.col,
          self,
          event.raw
        )
      }
    }

    function onTagStart() {
      parser.removeListener('comment', onComment)
      parser.removeListener('tagstart', onTagStart)
    }

    parser.addListener('all', onComment)
    parser.addListener('tagstart', onTagStart)
  },
}
