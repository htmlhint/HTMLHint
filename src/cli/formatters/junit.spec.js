const run = require('../../../test/test-utils').run
const path = require('path')
const serializer = require('jest-serializer-path')

expect.addSnapshotSerializer(serializer)

describe('CLI', () => {
  describe('Formatter: junit', () => {
    it('should have stdout output with formatter junit', async () => {
      const { exitCode, stdout, stderr } = await run(__dirname, [
        path.resolve(__dirname, '__fixtures__', 'example.html'),
        '--format',
        'junit',
      ])
      expect(exitCode).toBe(1)

      expect(
        stdout.replace(/time="\d+\.\d+"/g, 'time="0.999"')
      ).toMatchSnapshot()

      expect(stderr).toBe('')
    })
  })
})
