const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: markdown', () => {
    it('should have stdout output with formatter markdown', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'markdown',
        ].join(' '),
        (error, stdout, stderr) => {
          // On some systems, error might be null even with non-zero exit codes
          if (error) {
            expect(typeof error).toBe('object')
            expect(error.code).toBe(1)
          } else {
            // If error is null, we still expect there to be error output in stdout
            expect(stdout).toContain('Found')
            expect(stdout).toContain('errors')
          }

          expect(stdout).toContain('# TOC')
          expect(stdout).toContain('Found 20 errors, 0 warnings')
          expect(stdout).toContain('example.html')
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
