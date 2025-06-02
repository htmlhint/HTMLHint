import HTMLParser, { Block } from '../htmlparser'
import Reporter from '../reporter'

export default {
  id: 'button-type-require',
  description:
    'The type attribute of a <button> element must be present with a valid value: "button", "submit", or "reset".',
  init(parser: HTMLParser, reporter: Reporter): void {
    parser.addListener('tagstart', (event: Block): void => {
      const tagName = event.tagName.toLowerCase()

      if (tagName === 'button') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        const col = event.col + tagName.length + 1

        if (mapAttrs.type === undefined) {
          reporter.warn(
            'The type attribute must be present on <button> elements.',
            event.line,
            col,
            this,
            event.raw
          )
        } else {
          const typeValue = mapAttrs.type.toLowerCase()
          if (
            typeValue !== 'button' &&
            typeValue !== 'submit' &&
            typeValue !== 'reset'
          ) {
            reporter.warn(
              'The type attribute of <button> must have a valid value: "button", "submit", or "reset".',
              event.line,
              col,
              this,
              event.raw
            )
          }
        }
      }
    })
  },
}
