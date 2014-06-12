var expect = require('expect.js');

var LIB_DIR = process.env.HTMLHINT_COV ? '../../lib-cov' : '../../lib';
var formatter = require(LIB_DIR + '/formatters/checkstyle');

describe('Formatter: checkstyle', function () {

    it('start', function () {
        expect(formatter.start()).to.be('<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle>');
    });

    it('format', function () {
        var output = formatter.format([
            {line:10,col:11,type:'error',message:'m1',rule:{id:'tag-pair',description:'d1',link:'link1'}},
            {line:100,col:22,type:'warn',message:'<m2>',rule:{id:'id-unique',description:'d2',link:'link2'}}
        ], 'test.html');
        expect(output).to.be('\t<file name="test.html">\n' +
            '\t\t<error line="10" column="11" severity="error" message="m1" source="htmlhint.tag-pair"/>\n' +
            '\t\t<error line="100" column="22" severity="warn" message="&lt;m2&gt;" source="htmlhint.id-unique"/>\n' +
            '\t</file>');
    });

    it('end', function () {
        expect(formatter.end()).to.be('</checkstyle>');
    });
});