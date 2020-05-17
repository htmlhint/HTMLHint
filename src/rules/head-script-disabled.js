export default {
  id: 'head-script-disabled',
  description: 'The <script> tag cannot be used in a <head> tag.',
  init: function (parser, reporter) {
    let self = this
    let reScript = /^(text\/javascript|application\/javascript)$/i
    let isInHead = false

    function onTagStart(event) {
      let mapAttrs = parser.getMapAttrs(event.attrs)
      let type = mapAttrs.type
      let tagName = event.tagName.toLowerCase()

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
          self,
          event.raw
        )
      }
    }

    function onTagEnd(event) {
      if (event.tagName.toLowerCase() === 'head') {
        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
}
