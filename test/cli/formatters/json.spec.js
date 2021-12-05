const ChildProcess = require('child_process')
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: json', () => {
    it('should have stdout output with formatter json', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '__fixtures__', 'example.html'),
          '--format',
          'json',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)

          expect(stdout.replace(/"time":\d+/, '"time":99')).toMatchSnapshot()

          expect(stderr).toBe('')
          done()
        }
      )
    })
  })
})
