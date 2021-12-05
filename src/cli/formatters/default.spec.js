const run = require('../../../test/test-utils').run
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: default', () => {
    it('should have stdout output with formatter default', async () => {
      const { exitCode, stdout, stderr } = await run(__dirname, [
        path.resolve(__dirname, '..', '__fixtures__', 'executable.html'),
      ])

      expect(exitCode).toBe(1)

      expect(stdout.replace(/(\d+ ms)/, '(99 ms)')).toMatchSnapshot()

      expect(stderr).toBe('')
    })
  })
})
