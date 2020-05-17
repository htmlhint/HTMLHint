var tagsTypings = {
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

var assign = function (target) {
  var _source

  for (var i = 1; i < arguments.length; i++) {
    _source = arguments[i]
    for (var prop in _source) {
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
      assign(tagsTypings, options)
    }

    parser.addListener('tagstart', (event) => {
      var attrs = event.attrs
      var col = event.col + event.tagName.length + 1

      var tagName = event.tagName.toLowerCase()

      if (tagsTypings[tagName]) {
        var currentTagType = tagsTypings[tagName]

        if (currentTagType.selfclosing === true && !event.close) {
          reporter.warn(
            'The <' + tagName + '> tag must be selfclosing.',
            event.line,
            event.col,
            this,
            event.raw
          )
        } else if (currentTagType.selfclosing === false && event.close) {
          reporter.warn(
            'The <' + tagName + '> tag must not be selfclosing.',
            event.line,
            event.col,
            this,
            event.raw
          )
        }

        if (currentTagType.attrsRequired) {
          currentTagType.attrsRequired.forEach((id) => {
            if (Array.isArray(id)) {
              var copyOfId = id.map((a) => a)
              var realID = copyOfId.shift()
              var values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
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
                      this,
                      event.raw
                    )
                  }
                })
              } else {
                reporter.error(
                  'The <' + tagName + "> tag must have attr '" + realID + "'.",
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
                'The <' + tagName + "> tag must have attr '" + id + "'.",
                event.line,
                col,
                this,
                event.raw
              )
            }
          })
        }

        if (currentTagType.attrsOptional) {
          currentTagType.attrsOptional.forEach((id) => {
            if (Array.isArray(id)) {
              var copyOfId = id.map((a) => a)
              var realID = copyOfId.shift()
              var values = copyOfId

              if (attrs.some((attr) => attr.name === realID)) {
                attrs.forEach((attr) => {
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
          currentTagType.redundantAttrs.forEach((attrName) => {
            if (attrs.some((attr) => attr.name === attrName)) {
              reporter.error(
                "The attr '" +
                  attrName +
                  "' is redundant for <" +
                  tagName +
                  '> and should be ommited.',
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
}
