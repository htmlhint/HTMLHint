const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')

jest.setTimeout(60000) // Set timeout to 60 seconds

// Add timing logs to debug execution time
describe('CLI', () => {
  console.time('Test Execution Time')
  afterAll(() => {
    console.timeEnd('Test Execution Time')
  })

  describe('Formatter: compact', () => {
    it('should have stdout output with formatter compact', (done) => {
      const expected = fs
        .readFileSync(path.resolve(__dirname, 'compact.txt'), 'utf8')
        .replace(
          /\{\{path\}\}/g,
          path.resolve(__dirname, '../../html/executable.html')
        )
        .replace(/\\u001b/g, '\u001b')

      const expectedParts = expected.split('\n')

      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '../../html/executable.html'),
          '--format',
          'compact',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).not.toBe('')

          const stdoutParts = stdout.split('\n')

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
