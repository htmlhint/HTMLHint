/**
 * Example custom rule for HTMLHint
 * This rule demonstrates how to create a custom rule that checks for specific patterns
 */

module.exports = function (HTMLHint) {
  HTMLHint.addRule({
    id: 'example-rule',
    description: 'Example custom rule that demonstrates custom rule creation',
    init: function (parser, reporter, options) {
      // Listen for start tags
      parser.addListener('tagstart', function (event) {
        const tagName = event.tagName.toLowerCase()
        const mapAttrs = parser.getMapAttrs(event.attrs)

        // Example: Check if elements have a title attribute when they should
        if (tagName === 'img' && !mapAttrs.title && !mapAttrs.alt) {
          reporter.warn(
            'Images should have either a title or alt attribute for accessibility',
            event.line,
            event.col,
            this,
            event.raw
          )
        }

        // Example: Check for specific class naming convention
        if (mapAttrs.class && options && options.classPattern) {
          const classPattern = new RegExp(options.classPattern)
          const classes = mapAttrs.class.split(/\s+/)

          for (const className of classes) {
            if (!classPattern.test(className)) {
              reporter.warn(
                `Class "${className}" does not match the required pattern: ${options.classPattern}`,
                event.line,
                event.col,
                this,
                event.raw
              )
            }
          }
        }
      })
    },
  })
}
