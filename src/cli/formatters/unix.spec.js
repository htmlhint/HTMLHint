const run = require('../../../test/test-utils').run
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: unix', () => {
    it('should have stdout output with formatter unix', async () => {
      const { exitCode, stdout, stderr } = await run(__dirname, [
        path.resolve(__dirname, '..', '__fixtures__', 'executable.html'),
        '--format',
        'unix',
      ])
      expect(exitCode).toBe(1)

      expect(stdout).toMatchSnapshot()

      expect(stderr).toBe('')
    })
  })
})
