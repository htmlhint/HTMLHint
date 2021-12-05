const run = require('../../../test/test-utils').run
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: json', () => {
    it('should have stdout output with formatter json', async () => {
      const { exitCode, stdout, stderr } = await run(__dirname, [
        path.resolve(__dirname, '__fixtures__', 'example.html'),
        '--format',
        'json',
      ])

      expect(exitCode).toBe(1)

      expect(
        JSON.parse(stdout.replace(/"time":\d+/, '"time":99'))
      ).toMatchSnapshot()

      expect(stderr).toBe('')
    })
  })
})
