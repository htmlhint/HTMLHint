const ChildProcess = require('child_process')
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: checkstyle', () => {
    it('should have stdout output with formatter checkstyle', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '__fixtures__', 'example.html'),
          '--format',
          'checkstyle',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout).toMatchSnapshot()

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
