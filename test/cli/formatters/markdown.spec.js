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
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

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
