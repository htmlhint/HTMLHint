import { Rule } from '../types'

// List of obsolete HTML5 tags
const OBSOLETE_TAGS = [
  'applet',
  'acronym',
  'bgsound',
  'dir',
  'frame',
  'frameset',
  'noframes',
  'isindex',
  'keygen',
  'listing',
  'menuitem',
  'nextid',
  'noembed',
  'plaintext',
  'rb',
  'rtc',
  'strike',
  'xmp',
  'basefont',
  'big',
  'blink',
  'center',
  'font',
  'marquee',
  'multicol',
  'nobr',
  'spacer',
  'tt',
]

export default {
  id: 'tag-no-obsolete',
  description: 'Disallows the use of obsolete HTML tags.',
  init(parser, reporter, _options) {
    parser.addListener('tagstart,tagend', (event) => {
      const tagName = event.tagName.toLowerCase()

      if (OBSOLETE_TAGS.includes(tagName)) {
        reporter.error(
          `The tag [ ${event.tagName} ] is obsolete in HTML5 and should not be used.`,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
