const expect = require('expect.js')

const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: json', () => {
    it('should have stdout output with formatter json', (done) => {
      const expectedFileContent = fs
        .readFileSync(path.resolve(__dirname, 'json.json'), 'utf8')
        .replace(
          /\{\{path\}\}/g,
          path.resolve(__dirname, 'example.html').replace(/\\/g, '\\\\')
        )

      const expected = JSON.parse(expectedFileContent)

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'json',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).not.to.be.equal('')

          const jsonStdout = JSON.parse(stdout)
          expect(jsonStdout[0]).to.be.an('object')
          expect(jsonStdout[0].file).to.contain('example.html')

          const stdoutMessages = jsonStdout[0].messages

          expect(stdoutMessages).to.be.an(Array)
          expect(stdoutMessages.length).to.be.equal(expected[0].messages.length)

          for (let i = 0; i < stdoutMessages.length; i++) {
            expect(stdoutMessages[i]).to.be.eql(expected[0].messages[i])
          }

          expect(jsonStdout[0].time).to.be.a('number')

          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
