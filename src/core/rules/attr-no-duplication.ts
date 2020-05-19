export default {
  id: 'attr-no-duplication',
  description: 'Elements cannot have duplicate attributes.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      let attrName
      const col = event.col + event.tagName.length + 1

      const mapAttrName = {}

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]
        attrName = attr.name

        if (mapAttrName[attrName] === true) {
          reporter.error(
            `Duplicate of attribute name [ ${attr.name} ] was found.`,
            event.line,
            col + attr.index,
            this,
            attr.raw
          )
        }
        mapAttrName[attrName] = true
      }
    })
  },
}
