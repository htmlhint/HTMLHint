import { Block } from '../htmlparser'
import { Rule } from '../types'

export default {
  id: 'tag-pair',
  description: 'Tag must be paired.',
  init(parser, reporter) {
    const stack: Array<Partial<Block>> = []
    const mapEmptyTags = parser.makeMap(
      'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    ) //HTML 4.01 + HTML 5

    parser.addListener('tagstart', (event) => {
      const tagName = event.tagName.toLowerCase()
      if (mapEmptyTags[tagName] === undefined && !event.close) {
        stack.push({
          tagName: tagName,
          line: event.line,
          raw: event.raw,
        })
      }
    })

    parser.addListener('tagend', (event) => {
      const tagName = event.tagName.toLowerCase()

      // Look up the matching start tag
      let pos
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].tagName === tagName) {
          break
        }
      }

      if (pos >= 0) {
        const arrTags = []
        for (let i = stack.length - 1; i > pos; i--) {
          arrTags.push(`</${stack[i].tagName}>`)
        }

        if (arrTags.length > 0) {
          const lastEvent = stack[stack.length - 1]
          reporter.error(
            `Tag must be paired, missing: [ ${arrTags.join(
              ''
            )} ], start tag match failed [ ${lastEvent.raw} ] on line ${
              lastEvent.line
            }.`,
            event.line,
            event.col,
            this,
            event.raw
          )
        }
        stack.length = pos
      } else {
        reporter.error(
          `Tag must be paired, no start tag: [ ${event.raw} ]`,
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })

    parser.addListener('end', (event) => {
      const arrTags = []

      for (let i = stack.length - 1; i >= 0; i--) {
        arrTags.push(`</${stack[i].tagName}>`)
      }

      if (arrTags.length > 0) {
        const lastEvent = stack[stack.length - 1]
        reporter.error(
          `Tag must be paired, missing: [ ${arrTags.join(
            ''
          )} ], open tag match failed [ ${lastEvent.raw} ] on line ${
            lastEvent.line
          }.`,
          event.line,
          event.col,
          this,
          ''
        )
      }
    })
  },
} as Rule
