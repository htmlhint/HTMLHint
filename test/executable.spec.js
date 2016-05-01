var expect = require('expect.js');

var ChildProcess = require('child_process');
var path = require('path');

describe('Executable', function () {
    it('should close stream before exit', function (done) {
        var c = ChildProcess.spawn('node', [path.resolve(__dirname,'../bin/htmlhint'), '--format', 'json', path.resolve(__dirname,'./html/executable.html')]);
        var stdoutEnd = false;
        var processEnd = false;
        var isDone = 0;

        function checkDone() {
            isDone++;
            if (isDone == 2) {
                done();
            }
        }

        c.stdout.on('close', function() {
            stdoutEnd = true;
            checkDone();
        });

        c.on('exit', function() {
            processEnd = true;
            checkDone();
        });

        c.stdout.on('data', function() {
            expect(stdoutEnd || processEnd).to.be(false);
        });
    });
});
