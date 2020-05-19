export default {
  id: 'attr-unsafe-chars',
  description: 'Attribute values cannot contain unsafe chars.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1
      // exclude \x09(\t), \x0a(\r), \x0d(\n)
      // eslint-disable-next-line no-misleading-character-class, no-control-regex
      const regUnsafe = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
      let match

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        match = attr.value.match(regUnsafe)

        if (match !== null) {
          const unsafeCode = escape(match[0])
            .replace(/%u/, '\\u')
            .replace(/%/, '\\x')
          reporter.warn(
            'The value of attribute [ ' +
              attr.name +
              ' ] cannot contain an unsafe char [ ' +
              unsafeCode +
              ' ].',
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
