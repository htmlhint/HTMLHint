let tagsTypings = {
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

let assign = function (target) {
  let _source

  for (let i = 1; i < arguments.length; i++) {
    _source = arguments[i]
    for (let prop in _source) {
      target[prop] = _source[prop]
    }
  }

  return target
}

export default {
  id: 'tags-check',
  description: 'Checks html tags.',
  init: function (parser, reporter, options) {
    let self = this

    if (typeof options !== 'boolean') {
      assign(tagsTypings, options)
    }

    parser.addListener('tagstart', function (event) {
      let attrs = event.attrs
      let col = event.col + event.tagName.length + 1

      let tagName = event.tagName.toLowerCase()

      if (tagsTypings[tagName]) {
        let currentTagType = tagsTypings[tagName]

        if (currentTagType.selfclosing === true && !event.close) {
          reporter.warn(
            'The <' + tagName + '> tag must be selfclosing.',
            event.line,
            event.col,
            self,
            event.raw
          )
        } else if (currentTagType.selfclosing === false && event.close) {
          reporter.warn(
            'The <' + tagName + '> tag must not be selfclosing.',
            event.line,
            event.col,
            self,
            event.raw
          )
        }

        if (currentTagType.attrsRequired) {
          currentTagType.attrsRequired.forEach(function (id) {
            if (Array.isArray(id)) {
              let copyOfId = id.map(function (a) {
                return a
              })
              let realID = copyOfId.shift()
              let values = copyOfId

              if (
                attrs.some(function (attr) {
                  return attr.name === realID
                })
              ) {
                attrs.forEach(function (attr) {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      'The <' +
                        tagName +
                        "> tag must have attr '" +
                        realID +
                        "' with one value of '" +
                        values.join("' or '") +
                        "'.",
                      event.line,
                      col,
                      self,
                      event.raw
                    )
                  }
                })
              } else {
                reporter.error(
                  'The <' + tagName + "> tag must have attr '" + realID + "'.",
                  event.line,
                  col,
                  self,
                  event.raw
                )
              }
            } else if (
              !attrs.some(function (attr) {
                return id.split('|').indexOf(attr.name) !== -1
              })
            ) {
              reporter.error(
                'The <' + tagName + "> tag must have attr '" + id + "'.",
                event.line,
                col,
                self,
                event.raw
              )
            }
          })
        }

        if (currentTagType.attrsOptional) {
          currentTagType.attrsOptional.forEach(function (id) {
            if (Array.isArray(id)) {
              let copyOfId = id.map(function (a) {
                return a
              })
              let realID = copyOfId.shift()
              let values = copyOfId

              if (
                attrs.some(function (attr) {
                  return attr.name === realID
                })
              ) {
                attrs.forEach(function (attr) {
                  if (
                    attr.name === realID &&
                    values.indexOf(attr.value) === -1
                  ) {
                    reporter.error(
                      'The <' +
                        tagName +
                        "> tag must have optional attr '" +
                        realID +
                        "' with one value of '" +
                        values.join("' or '") +
                        "'.",
                      event.line,
                      col,
                      self,
                      event.raw
                    )
                  }
                })
              }
            }
          })
        }

        if (currentTagType.redundantAttrs) {
          currentTagType.redundantAttrs.forEach(function (attrName) {
            if (
              attrs.some(function (attr) {
                return attr.name === attrName
              })
            ) {
              reporter.error(
                "The attr '" +
                  attrName +
                  "' is redundant for <" +
                  tagName +
                  '> and should be ommited.',
                event.line,
                col,
                self,
                event.raw
              )
            }
          })
        }
      }
    })
  },
}
