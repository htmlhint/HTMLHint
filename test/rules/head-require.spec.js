/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

const expect = require('expect.js');

const HTMLHint = require('../../index').HTMLHint;

const ruldId = 'head-script-disabled';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
    it('External script in head should result in an error', function() {
        const code = '<head><script src="test.js"></script></head>';
        const messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Internal Script in head should result in an error', function() {
        let code = '<head><script>alert(1);</script></head>';
        let messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        code = '<head><script type="text/javascript">console.log(1)</script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        code = '<head><script type="application/javascript">console.log(2)</script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Script in body not result in an error', function() {
        const code = '<head></head><body><script src="test.js"></script></body>';
        const messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Template script in head not result in an error', function() {
        let code = '<head><script type="text/template"><img src="test.png" /></script></head>';
        let messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
        code = '<head><script type="text/ng-template"><img src="test.png" /></script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('No head not result in an error', function() {
        const code = '<html><script src="test.js"></script></html>';
        const messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
