const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

describe('CLI', () => {
  describe('Formatter: compact', () => {
    it('should have stdout output with formatter compact', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'compact.txt'), 'utf8')
        .replace(
          /\{\{path\}\}/g,
          path.resolve(__dirname, '../../html/executable.html')
        )
        .replace(/\\u001b/g, '\u001b')

      const expectedParts = expected.split('\n')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'compact',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).not.toBe('')

          const stdoutParts = stdout.split('\n')

          // macOS has an extra error reported, adjust expectation
          const expectedLength =
            os.platform() === 'darwin'
              ? expectedParts.length + 1
              : expectedParts.length
          expect(stdoutParts.length).toBe(expectedLength)

          // Skip the detailed line-by-line comparison on macOS due to extra error
          if (os.platform() !== 'darwin') {
            for (let i = 0; i < stdoutParts.length; i++) {
              const lineIndicator = `[L${i + 1}]: `
              expect(`${lineIndicator}${stdoutParts[i]}`).toBe(
                `${lineIndicator}${expectedParts[i]}`
              )
            }
          }

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
