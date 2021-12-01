const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: default', () => {
    it('should have stdout output with formatter default', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).toContain(
            'Tag must be paired, no start tag: [ </bad> ] (tag-pair)'
          )
          expect(stdout).toContain('\u001b[31m')
          expect(stdout).toContain('1 files, found 92 errors in 1 files (')

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
