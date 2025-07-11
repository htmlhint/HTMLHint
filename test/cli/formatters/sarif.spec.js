const ChildProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

describe('CLI', () => {
  describe('Formatter: sarif', () => {
    it('should have stdout output with formatter sarif', (done) => {
      const expectedFileContent = fs
        .readFileSync(path.resolve(__dirname, 'sarif.sarif'), 'utf8')
        .replace(/\{\{path\}\}/g, 'test/cli/formatters/example.html')

      const expected = JSON.parse(expectedFileContent)

      var child = ChildProcess.spawn('node', [
        path.resolve(__dirname, '../../../bin/htmlhint'),
        path.resolve(__dirname, 'example.html'),
        '--format',
        'sarif',
      ])

      child.stdout.on('data', function (stdout) {
        expect(stdout).not.toBe('')

        if (os.platform() !== 'darwin') {
          const jsonStdout = JSON.parse(stdout)
          expect(typeof jsonStdout).toBe('object')
          expect(
            jsonStdout['runs'][0]['artifacts'][0]['location']['uri']
          ).toContain('example.html')

          const stdoutResults = jsonStdout['runs'][0]['results']
          const stdoutRules = jsonStdout['runs'][0]['tool']['driver']['rules']

          expect(stdoutResults).toBeInstanceOf(Array)
          expect(stdoutResults.length).toBe(
            expected['runs'][0]['results'].length
          )

          expect(stdoutRules).toBeInstanceOf(Array)
          expect(stdoutRules.length).toBe(
            expected['runs'][0]['tool']['driver']['rules'].length
          )

          for (let i = 0; i < stdoutResults.length; i++) {
            expect(stdoutResults[i]).toEqual(expected['runs'][0]['results'][i])
          }

          for (let i = 0; i < stdoutRules.length; i++) {
            expect(stdoutRules[i]).toEqual(
              expected['runs'][0]['tool']['driver']['rules'][i]
            )
          }
        }
      })

      child.stderr.on('data', function (stderr) {
        expect(stderr).toBe('')
      })

      child.on('close', function (code) {
        expect(code).toBe(1)

        // Check if htmlhint.sarif file was created
        const sarifFilePath = path.resolve(process.cwd(), 'htmlhint.sarif')
        expect(fs.existsSync(sarifFilePath)).toBe(true)

        // Verify the file content matches the stdout
        const fileContent = fs.readFileSync(sarifFilePath, 'utf8')
        const fileJson = JSON.parse(fileContent)

        if (os.platform() !== 'darwin') {
          expect(typeof fileJson).toBe('object')
          expect(
            fileJson['runs'][0]['artifacts'][0]['location']['uri']
          ).toContain('example.html')

          const fileResults = fileJson['runs'][0]['results']
          const fileRules = fileJson['runs'][0]['tool']['driver']['rules']

          expect(fileResults).toBeInstanceOf(Array)
          expect(fileResults.length).toBe(expected['runs'][0]['results'].length)

          expect(fileRules).toBeInstanceOf(Array)
          expect(fileRules.length).toBe(
            expected['runs'][0]['tool']['driver']['rules'].length
          )

          for (let i = 0; i < fileResults.length; i++) {
            expect(fileResults[i]).toEqual(expected['runs'][0]['results'][i])
          }

          for (let i = 0; i < fileRules.length; i++) {
            expect(fileRules[i]).toEqual(
              expected['runs'][0]['tool']['driver']['rules'][i]
            )
          }
        }

        // Clean up the created file
        if (fs.existsSync(sarifFilePath)) {
          fs.unlinkSync(sarifFilePath)
        }

        done()
      })
    })
  })
})
