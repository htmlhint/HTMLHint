/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: attr-value-empty', function(){

    it('Attribute value have no value should result in an error', function(){
        var code = '<input disabled>';
        var messages = HTMLHint.verify(code, {'attr-value-empty': true});
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('attr-value-empty');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
    });

    it('Attribute value closed by quote but no value should not result in an error', function(){
        var code = '<input disabled="">';
        var messages = HTMLHint.verify(code, {'attr-value-empty': true});
        expect(messages.length).to.be(0);
    });

    it('Attribute value closed by quote and have value should not result in an error', function(){
        var code = '<input disabled="disabled">';
        var messages = HTMLHint.verify(code, {'attr-value-empty': true});
        expect(messages.length).to.be(0);
    });

});