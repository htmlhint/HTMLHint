export default {
  id: 'script-disabled',
  description: 'The <script> tag cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      if (event.tagName.toLowerCase() === 'script') {
        reporter.error(
          'The <script> tag cannot be used.',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
}
