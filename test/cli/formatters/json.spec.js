const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: json', () => {
    it('should have stdout output with formatter json', (done) => {
      const expectedFileContent = fs
        .readFileSync(path.resolve(__dirname, 'json.json'), 'utf8')
        .replace(
          /\{\{path\}\}/g,
          path.resolve(__dirname, 'example.html').replace(/\\/g, '\\\\')
        )

      const expected = JSON.parse(expectedFileContent)

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'json',
        ].join(' '),
        (error, stdout, stderr) => {
          // HTMLHint should exit with code 1 when errors are found
          if (error) {
            expect(error.code).toBe(1)
          }

          expect(stdout).not.toBe('')

          const jsonStdout = JSON.parse(stdout)
          expect(typeof jsonStdout[0]).toBe('object')
          expect(jsonStdout[0].file).toContain('example.html')

          const stdoutMessages = jsonStdout[0].messages

          expect(stdoutMessages).toBeInstanceOf(Array)
          expect(stdoutMessages.length).toBe(expected[0].messages.length)

          for (let i = 0; i < stdoutMessages.length; i++) {
            expect(stdoutMessages[i]).toEqual(expected[0].messages[i])
          }

          expect(typeof jsonStdout[0].time).toBe('number')

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
