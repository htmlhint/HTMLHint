const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: junit', () => {
    it('should have stdout output with formatter junit', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'junit',
        ].join(' '),
        (error, stdout, stderr) => {
          // HTMLHint should exit with code 1 when errors are found
          if (error) {
            expect(error.code).toBe(1)
          }

          expect(stdout).toContain('<?xml version="1.0" encoding="UTF-8"?>')
          expect(stdout).toContain('Found 20 errors')
          expect(stdout).toContain(
            '^ Tag must be paired, no start tag: [ </bad> ] (tag-pair)'
          )

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
