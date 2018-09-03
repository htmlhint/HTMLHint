const expect = require('expect.js');

const HTMLHint = require('../../index').HTMLHint;

const ruldId = 'style-disabled';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
    it('Style tag should result in an error', function() {
        const code = '<body><style>body{}</style></body>';
        const messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Stylesheet link should not result in an error', function() {
        const code = '<body><link rel="stylesheet" href="test.css" /></body>';
        const messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
