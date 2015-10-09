/**
 * Copyright (c) 2015, DragorWW <DragorWW@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'unique-tags',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('one <title> and <main> tag should not result in an error', function(){
        var code = '<title></title><main></main>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('two and more <title> or/and <main> tag should result in an error', function(){
        var code = '<title></title><title></title>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);

        code = '<main></main><main></main>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);

        code = '<title></title><title></title><main></main><main></main>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
    });

    it('zero <title> and <main> should not result in an error', function(){
        var code = '<html><body></body></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
