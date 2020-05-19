export default {
  id: 'alt-require',
  description:
    'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const col = event.col + tagName.length + 1
      let selector

      if (tagName === 'img' && !('alt' in mapAttrs)) {
        reporter.warn(
          'An alt attribute must be present on <img> elements.',
          event.line,
          col,
          this,
          event.raw
        )
      } else if (
        (tagName === 'area' && 'href' in mapAttrs) ||
        (tagName === 'input' && mapAttrs['type'] === 'image')
      ) {
        if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
          selector = tagName === 'area' ? 'area[href]' : 'input[type=image]'
          reporter.warn(
            `The alt attribute of ${selector} must have a value.`,
            event.line,
            col,
            this,
            event.raw
          )
        }
      }
    })
  },
}
