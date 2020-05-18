const expect = require('expect.js')

const ChildProcess = require('child_process')
const path = require('path')

describe('Executable', function () {
  it('should close stream before exit', function (done) {
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
      expect(stdoutEnd || processEnd).to.be(false)
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
    it(`should have stdout output with formatter ${format}`, function (done) {
      ChildProcess.exec(
        [
          'node',
          path.resolve(__dirname, '../bin/htmlhint'),
          path.resolve(__dirname, './html/executable.html'),
          '--format',
          'json',
        ].join(' '),
        (error, stdout, stderr) => {
          expect(error).to.be.an('object')
          expect(error.code).to.be.equal(1)
          expect(stdout).not.to.be.equal('')
          expect(stderr).to.be.equal('')
          done()
        }
      )
    })
  }
})
