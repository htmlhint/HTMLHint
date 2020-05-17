export default {
  id: 'script-disabled',
  description: 'The <script> tag cannot be used.',
  init: function (parser, reporter) {
    'use strict'

    let self = this

    parser.addListener('tagstart', function (event) {
      if (event.tagName.toLowerCase() === 'script') {
        reporter.error(
          'The <script> tag cannot be used.',
          event.line,
          event.col,
          self,
          event.raw
        )
      }
    })
  },
}
