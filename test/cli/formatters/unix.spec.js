const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: unix', () => {
    it('should have stdout output with formatter unix', (done) => {
      jest.setTimeout(60000) // Set timeout to 60 seconds
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'unix.txt'), 'utf8')
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
          'unix',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).not.toBe('')

          const stdoutParts = stdout.split('\n')

          expect(stdoutParts.length).toBe(expectedParts.length)

          for (let i = 0; i < stdoutParts.length; i++) {
            const lineIndicator = `[L${i + 1}]: `
            expect(`${lineIndicator}${stdoutParts[i]}`).toBe(
              `${lineIndicator}${expectedParts[i]}`
            )
          }

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
