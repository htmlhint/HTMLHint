const expect = require('expect.js')

const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: html', () => {
    it('should have stdout output with formatter html', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'html.html'), 'utf8')
        .replace(/\{\{path\}\}/g, path.resolve(__dirname, 'example.html'))

      const expectedParts = expected.split('\n')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'html',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)

          expect(stdout).not.to.equal('')

          const stdoutParts = stdout.split('\n')

          expect(stdoutParts.length).to.be.equal(expectedParts.length)

          for (let i = 0; i < stdoutParts.length; i++) {
            const lineIndicator = `[L${i + 1}]: `
            expect(`${lineIndicator}${stdoutParts[i]}`).to.be.equal(
              `${lineIndicator}${expectedParts[i]}`
            )
          }

          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  })
})
