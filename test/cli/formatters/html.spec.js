const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: html', () => {
    // Increase timeout to 60 seconds to avoid timeout errors
    jest.setTimeout(60000)

    it('should have stdout output with formatter html', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'html.html'), 'utf8')
        .replace(/\{\{path\}\}/g, path.resolve(__dirname, 'example.html'))

      const expectedParts = expected
        .replace(/\r\n|\r|\n/g, '\n')
        .split('\n')
        .map((line) => {
          // Normalize CSS in style tags to match the minified version in the formatter
          return line.replace(
            /<style>(.*?)<\/style>/g,
            (match, p1) => `<style>${p1.replace(/\s+/g, '')}</style>`
          )
        })
        .filter((line) => line.trim() !== '')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, 'example.html'),
          '--format',
          'html',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).not.toBe('')

          const stdoutParts = stdout
            .replace(/\r\n|\r|\n/g, '\n')
            .split('\n')
            .map((line) => {
              // Normalize CSS in style tags to match the expected output
              return line.replace(
                /<style>(.*?)<\/style>/g,
                (match, p1) => `<style>${p1.replace(/\s+/g, '')}</style>`
              )
            })
            .filter((line) => line.trim() !== '')

          expect(stdoutParts.length).toBe(expectedParts.length)

          for (let i = 0; i < stdoutParts.length; i++) {
            const lineIndicator = `[L${i + 1}]: `
            expect(`${lineIndicator}${stdoutParts[i]}`).toBe(
              `${lineIndicator}${expectedParts[i]}`
            )
          }

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
