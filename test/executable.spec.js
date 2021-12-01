const ChildProcess = require('child_process')
const path = require('path')

describe('Executable', () => {
  it('should close stream before exit', (done) => {
    const c = ChildProcess.spawn('node', [
      path.resolve(__dirname, '../bin/htmlhint'),
      '--format',
      'json',
      path.resolve(__dirname, './html/executable.html'),
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
})
