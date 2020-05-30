const expect = require('expect.js')

const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: compact', () => {
    it('should have stdout output with formatter compact', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'compact.txt'), 'utf8')
        .replace(
          /\{\{path\}\}/g,
          path
            .resolve(__dirname, '../../html/executable.html')
            // TODO: we need to fix windows backslash
            .replace('html\\executable.html', 'html/executable.html')
        )
        .replace(/\\u001b/g, '\u001b')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'compact',
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
