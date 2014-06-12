var expect = require('expect.js');

var LIB_DIR = process.env.HTMLHINT_COV ? '../../lib-cov' : '../../lib';
var formatter = require(LIB_DIR + '/formatters/text');

describe('Formatter: text', function () {

    it('format', function () {
        var output = formatter.format([
            {line:10,col:11,type:'error',message:'m1',rule:{id:'1',description:'d1',link:'link1'}},
            {line:100,col:22,type:'warn',message:'<m2>',rule:{id:'2',description:'d2',link:'link2'}}
        ], 'test.html');
        expect(output).to.be('test.html:\n' +
            '\tline 10, col 11: \u001b[31mm1\u001b[39m\n' +
            '\tline 100, col 22: \u001b[33m<m2>\u001b[39m\n' +
            '\n');
    });

    it('end', function () {
        expect(formatter.end(0)).to.be('No problem.'.green);
        expect(formatter.end(123)).to.be('123 problems.'.red);
    });
});