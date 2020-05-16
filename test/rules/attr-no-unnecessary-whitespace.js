var expect = require('expect.js');

var HTMLHint = require('../../dist/htmlhint.js').HTMLHint;

var ruldId = 'attr-no-unnecessary-whitespace',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: ' + ruldId, function () {
    it('Attribute with spaces should result in an error', function () {
        var codes = [
            '<div title = "a" />',
            '<div title= "a" />',
            '<div title ="a" />',
        ];
        for (var i = 0; i < codes.length; i++) {
            var messages = HTMLHint.verify(codes[i], ruleOptions);
            expect(messages.length).to.be(1);
            expect(messages[0].rule.id).to.be(ruldId);
            expect(messages[0].line).to.be(1);
            expect(messages[0].col).to.be(5);
        }
    });

    it('Attribute without spaces should not result in an error', function () {
        var code = '<div title="a" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
