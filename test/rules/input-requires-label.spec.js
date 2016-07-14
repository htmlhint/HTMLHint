/**
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruleId = 'input-requires-label',
    ruleOptions = {};

ruleOptions[ruleId] = true;

describe('Rules: '+ruleId, function(){

    it('Input tag with a matching label should result in no error', function () {
        var code = '<input id="some-id" type="password" /> <label for="some-id"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Input tag with no matching label should result in an error', function () {
        var code = '<input type="password">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruleId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Input tag with no matching label should result in an error', function () {
        var code = '<input id="some-id" type="password" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruleId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Input tag with no id should result in an error', function () {
        var code = '<input type="password" /> <label for="some-id"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruleId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

});
