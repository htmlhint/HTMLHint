const ChildProcess = require('child_process')
const path = require('path')

describe('CLI', () => {
  describe('Formatter: junit', () => {
    it('should have stdout output with formatter junit', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '__fixtures__', 'example.html'),
          '--format',
          'junit',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(
            stdout.replace(/time="\d+\.\d+"/g, 'time="0.999"')
          ).toMatchSnapshot()

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
