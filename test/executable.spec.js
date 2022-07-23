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

describe('Config', () => {
  it('should not display warning log message when it can parse config file', (done) => {
    ChildProcess.exec(
      [
        'node',
        path.resolve(__dirname, '../bin/htmlhint'),
        path.resolve(__dirname, './html/executable.html'),
        '--config',
        path.resolve(__dirname, './conf/valid-json.conf'),
      ].join(' '),
      (error, stdout) => {
        expect(stdout).toContain('Config loaded:')
        done()
      }
    )
  })

  it('should display warning log message when it can not parse config file', (done) => {
    ChildProcess.exec(
      [
        'node',
        path.resolve(__dirname, '../bin/htmlhint'),
        path.resolve(__dirname, './html/executable.html'),
        '--config',
        path.resolve(__dirname, './conf/invalid-json.conf'),
      ].join(' '),
      (error, stdout) => {
        expect(stdout).toContain('Config could not be parsed:')
        done()
      }
    )
  })
})
