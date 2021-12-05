const ChildProcess = require('child_process')
const run = require('../../test/test-utils').run
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

  it(`should print help with --help`, async () => {
    const { exitCode, stdout, stderr } = await run(__dirname, ['--help'])

    expect(exitCode).toBe(0)
    expect(stdout).toMatchSnapshot('stdout')

    expect(stderr).toMatchSnapshot('stderr')
  })

  it(`should print help with -h`, async () => {
    const { exitCode, stdout, stderr } = await run(__dirname, ['-h'])

    expect(exitCode).toBe(0)
    expect(stdout).toMatchSnapshot('stdout')

    expect(stderr).toMatchSnapshot('stderr')
  })
})
