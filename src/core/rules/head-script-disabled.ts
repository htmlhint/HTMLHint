import { Listener } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'head-script-disabled',
  description: 'The <script> tag cannot be used in a <head> tag.',
  init(parser, reporter, options) {
    const reScript = /^(text\/javascript|application\/javascript)$/i
    let isInHead = false

    const onTagStart: Listener = (event) => {
      const mapAttrs = parser.getMapAttrs(event.attrs)
      const type = mapAttrs.type
      const defer = mapAttrs.defer
      const tagName = event.tagName.toLowerCase()

      if (tagName === 'head') {
        isInHead = true
      }

      if (isInHead === true && tagName === 'script') {
        // Check if this is a module script
        const isModule = type === 'module'

        // Check if this is a deferred script
        const isDeferred = defer !== undefined

        // Check if this is an async script
        const isAsync = mapAttrs.async !== undefined

        // Check if script type is executable JavaScript (or no type specified)
        const isExecutableScript =
          !type || reScript.test(type) === true || isModule

        if (isExecutableScript) {
          // If allow-non-blocking option is enabled, check for non-blocking attributes
          if (options === 'allow-non-blocking') {
            // Allow modules, deferred scripts, and async scripts
            if (!isModule && !isDeferred && !isAsync) {
              reporter.warn(
                'The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.',
                event.line,
                event.col,
                this,
                event.raw
              )
            }
          } else {
            // Default behavior: disallow all executable scripts in head
            reporter.warn(
              'The <script> tag cannot be used in a <head> tag.',
              event.line,
              event.col,
              this,
              event.raw
            )
          }
        }
      }
    }

    const onTagEnd: Listener = (event) => {
      if (event.tagName.toLowerCase() === 'head') {
        parser.removeListener('tagstart', onTagStart)
        parser.removeListener('tagend', onTagEnd)
      }
    }

    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
} as Rule
