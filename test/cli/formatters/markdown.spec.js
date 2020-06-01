const expect = require('expect.js')

const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: markdown', () => {
    it('should have stdout output with formatter markdown', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'markdown',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).to.contain('# TOC')
          expect(stdout).to.contain('Found 92 errors, 0 warnings')
          expect(stdout).to.contain('executable.html')
          expect(stdout).to.contain(
            '^ Tag must be paired, no start tag: [ </bad> ] (tag-pair)'
          )

          expect(stderr).to.be.equal('')
        }
      )
      done()
    })
  })
})
