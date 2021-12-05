const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: default', () => {
    it('should have stdout output with formatter default', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(
            __dirname,
            '..',
            '..',
            '__fixtures__',
            'executable.html'
          ),
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout.replace(/(\d+ ms)/, '(99 ms)')).toMatchSnapshot()

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
