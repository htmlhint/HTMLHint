const expect = require('expect.js')

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
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).to.contain('<?xml version="1.0" encoding="UTF-8"?>')
          expect(stdout).to.contain('Found 20 errors')
          expect(stdout).to.contain(
            '^ Tag must be paired, no start tag: [ </bad> ] (tag-pair)'
          )

          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
