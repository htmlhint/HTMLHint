const expect = require('expect.js')

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
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).to.contain(
            'Tag must be paired, no start tag: [ </bad> ] (tag-pair)'
          )
          expect(stdout).to.contain('\u001b[31m')
          expect(stdout).to.contain('1 files, found 92 errors in 1 files (')

          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
