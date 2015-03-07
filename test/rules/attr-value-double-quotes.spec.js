/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../lib/htmlhint.src.js").HTMLHint;

var ruldId = 'attr-value-double-quotes',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Attribute value closed by single quotes should result in an error', function(){
        var code = "<a href='abc' title=abc style=''>";
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(3);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);
        expect(messages[1].rule.id).to.be(ruldId);
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(14);
        expect(messages[2].rule.id).to.be(ruldId);
        expect(messages[2].line).to.be(1);
        expect(messages[2].col).to.be(24);
    });

    it('Attribute value no closed should not result in an error', function(){
        var code = '<input type="button" disabled style="">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});