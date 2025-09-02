import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'form-method-require',
  description:
    'The method attribute of a <form> element must be present with a valid value: "get", "post", or "dialog".',
  init(parser, reporter) {
    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()

      if (tagName === 'form') {
        const mapAttrs = parser.getMapAttrs(event.attrs)
        const col = event.col + tagName.length + 1

        if (mapAttrs.method === undefined) {
          reporter.warn(
            'The method attribute must be present on <form> elements.',
            event.line,
            col,
            this,
            event.raw
          )
        } else {
          const methodValue = mapAttrs.method.toLowerCase()
          if (
            methodValue !== 'get' &&
            methodValue !== 'post' &&
            methodValue !== 'dialog'
          ) {
            reporter.warn(
              'The method attribute of <form> must have a valid value: "get", "post", or "dialog".',
              event.line,
              col,
              this,
              event.raw
            )
          }
        }
      }
    }

    parser.addListener('tagstart', onTagStart)
  },
} as Rule
