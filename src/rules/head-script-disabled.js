export default {
  id: 'head-script-disabled',
  description: 'The <script> tag cannot be used in a <head> tag.',
  init(parser, reporter) {
    var reScript = /^(text\/javascript|application\/javascript)$/i
    var isInHead = false

    var onTagStart = (event) => {
      var mapAttrs = parser.getMapAttrs(event.attrs)
      var type = mapAttrs.type
      var tagName = event.tagName.toLowerCase()

      if (tagName === 'head') {
        isInHead = true
      }

      if (
        isInHead === true &&
        tagName === 'script' &&
        (!type || reScript.test(type) === true)
      ) {
        reporter.warn(
          'The <script> tag cannot be used in a <head> tag.',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    }

    var onTagEnd = (event) => {
      if (event.tagName.toLowerCase() === 'head') {
        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
}
