/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'tagname-specialchars',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Special character in tag name should result in an error', function(){
        var code = '<@ href="link"></@><$pan>aab</$pan>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(4);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(16);
        expect(messages[2].rule.id).to.be(ruldId);
        expect(messages[2].line).to.be(1);
        expect(messages[2].col).to.be(20);
        expect(messages[3].rule.id).to.be(ruldId);
        expect(messages[3].line).to.be(1);
        expect(messages[3].col).to.be(29);
    });

    it('Tag name without special character should not result in an error', function(){
        var code = '<a href=""></a><span>test</span>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
