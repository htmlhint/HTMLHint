/**
 * Contributed by Jeff Nassiff <jnassiff@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'tag-self-terminated',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Disallowed self-terminating tags result in an error', function(){
        var code = '<div id="empty" class="nothing" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('warning');
    });

    it('Allowed unterminated tags do not error', function(){
        var code = '<br><img src="a.jpg">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Allowed self-terminating tags do not error', function(){
        var code = '<br /><img src="a.jpg"/>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Allowed properly terminated tags do not error', function(){
        var code = '<div id="empty" class="nothing"></div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});