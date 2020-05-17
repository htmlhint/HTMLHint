export default {
  id: 'style-disabled',
  description: '<style> tags cannot be used.',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      if (event.tagName.toLowerCase() === 'style') {
        reporter.warn(
          'The <style> tag cannot be used.',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
}
