export default {
  id: 'id-class-ad-disabled',
  description:
    'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      let attrName
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        attrName = attr.name

        if (/^(id|class)$/i.test(attrName)) {
          if (/(^|[-_])ad([-_]|$)/i.test(attr.value)) {
            reporter.warn(
              'The value of attribute ' +
                attrName +
                ' cannot use the ad keyword.',
              event.line,
              col + attr.index,
              this,
              attr.raw
            )
          }
        }
      }
    })
  },
}
