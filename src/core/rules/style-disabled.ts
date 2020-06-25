import { Rule } from '../types'

export default {
  id: 'style-disabled',
  description: '<style> tags cannot be used.',
  init(parser, reportMessageCallback) {
    parser.addListener('tagstart', (event) => {
      if (event.tagName.toLowerCase() === 'style') {
        reportMessageCallback(
          'The <style> tag cannot be used.',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
