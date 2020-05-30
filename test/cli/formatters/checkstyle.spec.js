const expect = require('expect.js')

const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: checkstyle', () => {
    it('should have stdout output with formatter checkstyle', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'checkstyle.xml'), 'utf8')
        .replace(
          '{{path}}',
          path.resolve(__dirname, '../../html/executable.html')
        )
        // TODO: we need to fix windows backslash
        .replace('html\\executable.html', 'html/executable.html')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'checkstyle',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)
          expect(stdout).to.be.equal(expected)
          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
