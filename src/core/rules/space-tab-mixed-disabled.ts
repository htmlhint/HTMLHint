import { Rule } from '../types'

export default {
  id: 'space-tab-mixed-disabled',
  description: 'Do not mix tabs and spaces for indentation.',
  init(
    parser,
    reportMessageCallback,
    options?: { mode: 'tab' } | { mode: 'space'; size?: number } | undefined
  ) {
    const indentMode: 'tab' | 'space' | 'nomix' = options?.mode ?? 'nomix'
    const defaultSize = 4
    let spaceLengthRequire: number | null =
      options?.mode === 'space' ? options?.size ?? defaultSize : null

    if (typeof spaceLengthRequire === 'number') {
      if (spaceLengthRequire <= 0 || spaceLengthRequire > 8) {
        spaceLengthRequire = defaultSize
      }
    }

    parser.addListener('text', (event) => {
      const raw = event.raw
      const reMixed = /(^|\r?\n)([ \t]+)/g
      let match

      while ((match = reMixed.exec(raw))) {
        const fixedPos = parser.fixPos(event, match.index + match[1].length)
        if (fixedPos.col !== 1) {
          continue
        }

        const whiteSpace = match[2]
        if (indentMode === 'space') {
          if (spaceLengthRequire) {
            if (
              /^ +$/.test(whiteSpace) === false ||
              whiteSpace.length % spaceLengthRequire !== 0
            ) {
              reportMessageCallback(
                `Please use space for indentation and keep ${spaceLengthRequire} length.`,
                fixedPos.line,
                1,
                this,
                event.raw
              )
            }
          } else {
            if (/^ +$/.test(whiteSpace) === false) {
              reportMessageCallback(
                'Please use space for indentation.',
                fixedPos.line,
                1,
                this,
                event.raw
              )
            }
          }
        } else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
          reportMessageCallback(
            'Please use tab for indentation.',
            fixedPos.line,
            1,
            this,
            event.raw
          )
        } else if (/ +\t|\t+ /.test(whiteSpace) === true) {
          reportMessageCallback(
            'Do not mix tabs and spaces for indentation.',
            fixedPos.line,
            1,
            this,
            event.raw
          )
        }
      }
    })
  },
} as Rule
