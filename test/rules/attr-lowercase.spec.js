/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-lowercase',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Not all lowercase attr should result in an error - angular 2', function(){
        var code = '<p *NGFOR="dads">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);

        code = '<p [id]=""\r\n [TEST1]="abc" *TEST2="abc">';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(1);
        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(15);
    });

    it('Not all lowercase attr should result in an error', function(){
        var code = '<p TEST="abc">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);

        code = '<p id=""\r\n TEST1="abc" TEST2="abc">';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(1);
        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(2);
        expect(messages[1].col).to.be(13);
    });

    it('Lowercase attr should not result in an error', function(){
        var code = '<p test="abc">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Set is false not result in an error', function(){
        var code = '<p TEST="abc">';
        ruleOptions[ruldId] = false;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
