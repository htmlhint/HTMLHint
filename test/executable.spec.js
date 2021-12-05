const ChildProcess = require('child_process')
const path = require('path')

describe('Executable', () => {
  it('should close stream before exit', (done) => {
    const c = ChildProcess.spawn('node', [
      path.resolve(__dirname, '../bin/htmlhint'),
      '--format',
      'json',
      path.resolve(__dirname, '__fixtures__', 'executable.html'),
    ])
    let stdoutEnd = false
    let processEnd = false
    let isDone = 0

    function checkDone() {
      isDone++
      if (isDone == 2) {
        done()
      }
    }

    c.stdout.on('close', () => {
      stdoutEnd = true
      checkDone()
    })

    c.on('exit', () => {
      processEnd = true
      checkDone()
    })

    c.stdout.on('data', () => {
      expect(stdoutEnd || processEnd).toBe(false)
    })
  })

  for (const format of [
    'checkstyle',
    'compact',
    'default',
    'html',
    'json',
    'junit',
    'markdown',
    'unix',
  ]) {
    it(`should have stdout output with formatter ${format}`, (done) => {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../bin/htmlhint'),
          path.resolve(__dirname, '__fixtures__', 'executable.html'),
          '--format',
          format,
        ].join(' '),
        (error, stdout, stderr) => {
          expect(typeof error).toBe('object')
          expect(error.code).toBe(1)
          expect(stdout).not.toBe('')
          expect(stderr).toBe('')
          done()
        }
      )
    })
  }
})
