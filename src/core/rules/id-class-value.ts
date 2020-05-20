import { Rule } from '../types'

export default {
  id: 'id-class-value',
  description:
    'The id and class attribute values must meet the specified rules.',
  init(parser, reporter, options) {
    const arrRules: { [option: string]: { regId: RegExp; message: string } } = {
      underline: {
        regId: /^[a-z\d]+(_[a-z\d]+)*$/,
        message:
          'The id and class attribute values must be in lowercase and split by an underscore.',
      },
      dash: {
        regId: /^[a-z\d]+(-[a-z\d]+)*$/,
        message:
          'The id and class attribute values must be in lowercase and split by a dash.',
      },
      hump: {
        regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
        message:
          'The id and class attribute values must meet the camelCase style.',
      },
    }
    let rule: { regId: RegExp; message: string } | boolean

    if (typeof options === 'string') {
      rule = arrRules[options]
    } else {
      rule = options
    }

    // TODO: we should check this in another way
    if (rule && rule.regId) {
      let regId = rule.regId
      const message = rule.message

      if (!(regId instanceof RegExp)) {
        regId = new RegExp(regId)
      }

      parser.addListener('tagstart', (event) => {
        const attrs = event.attrs
        let attr
        const col = event.col + event.tagName.length + 1

        for (let i = 0, l1 = attrs.length; i < l1; i++) {
          attr = attrs[i]

          if (attr.name.toLowerCase() === 'id') {
            if (regId.test(attr.value) === false) {
              reporter.warn(
                message,
                event.line,
                col + attr.index,
                this,
                attr.raw
              )
            }
          }

          if (attr.name.toLowerCase() === 'class') {
            const arrClass = attr.value.split(/\s+/g)
            let classValue

            for (let j = 0, l2 = arrClass.length; j < l2; j++) {
              classValue = arrClass[j]
              if (classValue && regId.test(classValue) === false) {
                reporter.warn(
                  message,
                  event.line,
                  col + attr.index,
                  this,
                  classValue
                )
              }
            }
          }
        }
      })
    }
  },
} as Rule
