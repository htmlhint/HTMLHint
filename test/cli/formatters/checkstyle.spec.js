const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: checkstyle', () => {
    it('should have stdout output with formatter checkstyle', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'checkstyle.xml'), 'utf8')
        .replace('{{path}}', path.resolve(__dirname, 'example.html'))

      const expectedParts = expected.split('\n')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'checkstyle',
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
