/**
* Copyright (c) Dylan Martin <dmarticus@gmail.com>
* MIT Licensed
*/

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'no-hard-coded-text',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Spaces inside tag qtranslate should result in an error', function(){
        var code = '<a qtranslate>TEXT TOOLS</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(19);
    });

    it('single word with lowercase letters inside qtranslate tag should result in an error', function() {
        var code = '<a qtranslate>Cancel</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(5);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(16);
    });

    it('multi word phrase with no spaces inside qtranslate tag should pass', function(){
        var code = '<a qtranslate>TEXT_TOOLS</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('single word with all capital letters inside qtranslate tag should pass', function() {
        var code = '<a qtranslate>CANCEL</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
