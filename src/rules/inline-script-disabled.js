export default {
  id: 'inline-script-disabled',
  description: 'Inline script cannot be used.',
  init: function (parser, reporter) {
    const self = this

    parser.addListener('tagstart', function (event) {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1
      let attrName
      const reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        attrName = attr.name.toLowerCase()

        if (reEvent.test(attrName) === true) {
          reporter.warn(
            'Inline script [ ' + attr.raw + ' ] cannot be used.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          )
        } else if (attrName === 'src' || attrName === 'href') {
          if (/^\s*javascript:/i.test(attr.value)) {
            reporter.warn(
              'Inline script [ ' + attr.raw + ' ] cannot be used.',
              event.line,
              col + attr.index,
              self,
              attr.raw
            )
          }
        }
      }
    })
  },
}
