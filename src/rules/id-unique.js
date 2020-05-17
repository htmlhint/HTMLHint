export default {
  id: 'id-unique',
  description: 'The value of id attributes must be unique.',
  init: function (parser, reporter) {
    let self = this
    let mapIdCount = {}

    parser.addListener('tagstart', function (event) {
      let attrs = event.attrs
      let attr
      let id
      let col = event.col + event.tagName.length + 1

      for (let i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i]

        if (attr.name.toLowerCase() === 'id') {
          id = attr.value

          if (id) {
            if (mapIdCount[id] === undefined) {
              mapIdCount[id] = 1
            } else {
              mapIdCount[id]++
            }

            if (mapIdCount[id] > 1) {
              reporter.error(
                'The id value [ ' + id + ' ] must be unique.',
                event.line,
                col + attr.index,
                self,
                attr.raw
              )
            }
          }
          break
        }
      }
    })
  },
}
