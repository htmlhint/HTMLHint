export default {
  id: 'head-script-disabled',
  description: 'The <script> tag cannot be used in a <head> tag.',
  init(parser, reporter) {
    const reScript = /^(text\/javascript|application\/javascript)$/i
    let isInHead = false

    const onTagStart = (event) => {
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const type = mapAttrs.type
      const tagName = event.tagName.toLowerCase()

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

    const onTagEnd = (event) => {
      if (event.tagName.toLowerCase() === 'head') {
        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
}
