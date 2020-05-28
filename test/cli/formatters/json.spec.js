const expect = require('expect.js')

const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: json', () => {
    it('should have stdout output with formatter json', (done) => {
      const expected = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'json.json'), 'utf8').replace(
          /\{\{path\}\}/g,
          path
            .resolve(__dirname, '../../html/executable.html')
            // TODO: we need to fix windows backslash
            .replace('html\\executable.html', 'html/executable.html')
        )
      )

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'json',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).not.to.be.equal('')
          const jsonStdout = JSON.parse(stdout)
          expect(jsonStdout[0]).to.be.an('object')
          expect(jsonStdout[0].file).to.contain('executable.html')
          expect(jsonStdout[0].messages).to.be.eql(expected[0].messages)
          expect(jsonStdout[0].time).to.be.a('number')

          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
