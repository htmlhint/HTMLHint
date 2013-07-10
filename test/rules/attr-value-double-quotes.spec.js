/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: attr-value-double-quotes', function(){

    it('Attribute value closed by single quotes should result in an error', function(){
        var code = '<a href=\'abc\' title=abc>';
        var messages = HTMLHint.verify(code, cleanRules({'attr-value-double-quotes': true}));
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be('attr-value-double-quotes');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);
        expect(messages[1].rule.id).to.be('attr-value-double-quotes');
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(14);
    });

    it('Attribute value no closed should not result in an error', function(){
        var code = '<input type="button" disabled>';
        var messages = HTMLHint.verify(code, cleanRules({'attr-value-double-quotes': true}));
        expect(messages.length).to.be(0);
    });

    it('Lowercase attr should not result in an error', function(){
        var code = '<a href="abc">';
        var messages = HTMLHint.verify(code, cleanRules({'attr-value-double-quotes': true}));
        expect(messages.length).to.be(0);
    });

});