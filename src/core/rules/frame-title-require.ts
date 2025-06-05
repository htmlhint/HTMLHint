import { Rule } from '../types'

export default {
  id: 'frame-title-require',
  description: 'A <frame> or <iframe> element must have an accessible name.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const col = event.col + tagName.length + 1

      if (tagName === 'frame' || tagName === 'iframe') {
        // Check if element has role="presentation" or role="none"
        const role = mapAttrs['role']
        if (role === 'presentation' || role === 'none') {
          return // Rule passes - element semantics are overridden
        }

        // Check for accessible name attributes
        const hasAriaLabel =
          'aria-label' in mapAttrs && mapAttrs['aria-label'].trim() !== ''
        const hasAriaLabelledby =
          'aria-labelledby' in mapAttrs &&
          mapAttrs['aria-labelledby'].trim() !== ''
        const hasTitle = 'title' in mapAttrs && mapAttrs['title'].trim() !== ''

        if (!hasAriaLabel && !hasAriaLabelledby && !hasTitle) {
          reporter.warn(
            `A <${tagName}> element must have an accessible name.`,
            event.line,
            col,
            this,
            event.raw
          )
        }
      }
    })
  },
} as Rule
