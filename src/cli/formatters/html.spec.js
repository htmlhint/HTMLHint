const run = require('../../../test/test-utils').run
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: html', () => {
    it('should have stdout output with formatter html', async () => {
      const { exitCode, stdout, stderr } = await run(__dirname, [
        path.resolve(__dirname, '__fixtures__', 'example.html'),
        '--format',
        'html',
      ])

      expect(exitCode).toBe(1)

      expect(stdout).toMatchSnapshot('stdout')

      expect(stderr).toMatchSnapshot('stderr')
    })
  })
})
