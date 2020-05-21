import { Rule } from '../types'

const tagsTypings = {
  a: {
    selfclosing: false,
    attrsRequired: ['href', 'title'],
    redundantAttrs: ['alt'],
  },
  div: {
    selfclosing: false,
  },
  main: {
    selfclosing: false,
    redundantAttrs: ['role'],
  },
  nav: {
    selfclosing: false,
    redundantAttrs: ['role'],
  },
  script: {
    attrsOptional: [
      ['async', 'async'],
      ['defer', 'defer'],
    ],
  },
  img: {
    selfclosing: true,
    attrsRequired: ['src', 'alt', 'title'],
  },
}

const assign = function (target: { [prop: string]: unknown }) {
  let _source

  for (let i = 1; i < arguments.length; i++) {
    // TODO: fix this prefer-rest-params after typescript migration
    // eslint-disable-next-line prefer-rest-params
    _source = arguments[i]
    for (const prop in _source) {
      target[prop] = _source[prop]
    }
  }

  return target
}

export default {
  id: 'tags-check',
  description: 'Checks html tags.',
  init(parser, reporter, options) {
    if (typeof options !== 'boolean') {
      // TODO: fix this error
      // @ts-expect-error
      assign(tagsTypings, options)
    }

    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      const col = event.col + event.tagName.length + 1

      // TODO: find a better way to check this, e.g. switch-case
      const tagName = event.tagName.toLowerCase() as keyof typeof tagsTypings

      if (tagsTypings[tagName]) {
        // TODO: improve this later
        const currentTagType: any = tagsTypings[tagName]

        if (currentTagType.selfclosing === true && !event.close) {
          reporter.warn(
            `The <${tagName}> tag must be selfclosing.`,
            event.line,
            event.col,
            this,
            event.raw
          )
        } else if (currentTagType.selfclosing === false && event.close) {
          reporter.warn(
            `The <${tagName}> tag must not be selfclosing.`,
            event.line,
            event.col,
            this,
            event.raw
          )
        }

        if (currentTagType.attrsRequired) {
          // TODO: evaluate this with better typings
          currentTagType.attrsRequired.forEach((id: string) => {
            if (Array.isArray(id)) {
              const copyOfId = id.map((a) => a)
              const realID = copyOfId.shift()
              const values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      `The <${tagName}> tag must have attr '${realID}' with one value of '${values.join(
                        "' or '"
                      )}'.`,
                      event.line,
                      col,
                      this,
                      event.raw
                    )
                  }
                })
              } else {
                reporter.error(
                  `The <${tagName}> tag must have attr '${realID}'.`,
                  event.line,
                  col,
                  this,
                  event.raw
                )
              }
            } else if (
              !attrs.some((attr) => id.split('|').indexOf(attr.name) !== -1)
            ) {
              reporter.error(
                `The <${tagName}> tag must have attr '${id}'.`,
                event.line,
                col,
                this,
                event.raw
              )
            }
          })
        }

        if (currentTagType.attrsOptional) {
          // TODO: evaluate this with better typings
          currentTagType.attrsOptional.forEach((id: string[]) => {
            if (Array.isArray(id)) {
              const copyOfId = id.map((a) => a)
              const realID = copyOfId.shift()
              const values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      `The <${tagName}> tag must have optional attr '${realID}' with one value of '${values.join(
                        "' or '"
                      )}'.`,
                      event.line,
                      col,
                      this,
                      event.raw
                    )
                  }
                })
              }
            }
          })
        }

        if (currentTagType.redundantAttrs) {
          // TODO: evaluate this with better typings
          currentTagType.redundantAttrs.forEach((attrName: string) => {
            if (attrs.some((attr) => attr.name === attrName)) {
              reporter.error(
                `The attr '${attrName}' is redundant for <${tagName}> and should be ommited.`,
                event.line,
                col,
                this,
                event.raw
              )
            }
          })
        }
      }
    })
  },
} as Rule
