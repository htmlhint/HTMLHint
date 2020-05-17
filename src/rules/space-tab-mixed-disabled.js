export default {
  id: 'space-tab-mixed-disabled',
  description: 'Do not mix tabs and spaces for indentation.',
  init: function (parser, reporter, options) {
    let self = this
    let indentMode = 'nomix'
    let spaceLengthRequire = null

    if (typeof options === 'string') {
      let match = options.match(/^([a-z]+)(\d+)?/)
      indentMode = match[1]
      spaceLengthRequire = match[2] && parseInt(match[2], 10)
    }

    parser.addListener('text', function (event) {
      let raw = event.raw
      let reMixed = /(^|\r?\n)([ \t]+)/g
      let match

      while ((match = reMixed.exec(raw))) {
        let fixedPos = parser.fixPos(event, match.index + match[1].length)
        if (fixedPos.col !== 1) {
          continue
        }

        let whiteSpace = match[2]
        if (indentMode === 'space') {
          if (spaceLengthRequire) {
            if (
              /^ +$/.test(whiteSpace) === false ||
              whiteSpace.length % spaceLengthRequire !== 0
            ) {
              reporter.warn(
                'Please use space for indentation and keep ' +
                  spaceLengthRequire +
                  ' length.',
                fixedPos.line,
                1,
                self,
                event.raw
              )
            }
          } else {
            if (/^ +$/.test(whiteSpace) === false) {
              reporter.warn(
                'Please use space for indentation.',
                fixedPos.line,
                1,
                self,
                event.raw
              )
            }
          }
        } else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
          reporter.warn(
            'Please use tab for indentation.',
            fixedPos.line,
            1,
            self,
            event.raw
          )
        } else if (/ +\t|\t+ /.test(whiteSpace) === true) {
          reporter.warn(
            'Do not mix tabs and spaces for indentation.',
            fixedPos.line,
            1,
            self,
            event.raw
          )
        }
      }
    })
  },
}
