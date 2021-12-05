const ChildProcess = require('child_process')
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: compact', () => {
    it('should have stdout output with formatter compact', (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../../../bin/htmlhint'),
          path.resolve(__dirname, '..', '__fixtures__', 'executable.html'),
          '--format',
          'compact',
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
