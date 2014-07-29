/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * Copyright (c) 2014, Takeshi Kurosawa <taken.spc@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'alt-require',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Img tag have empty alt attribute should not result in an error', function(){
        var code = '<img width="200" height="300" alt="">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Img tag have non empty alt attribute should not result in an error', function(){
        var code = '<img width="200" height="300" alt="test">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Img tag have not alt attribute should result in an error', function(){
        var code = '<img width="200" height="300">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(5);
        expect(messages[0].type).to.be('warning');
    });

    /* A tag can have shape and coords attributes and not have alt attribute */
    it('A tag have not alt attribute should not result in an error', function(){
        var code = '<a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Area tag have not href and alt attributes should not result in an error', function(){
        var code = '<area>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Area[href] tag have not alt attribute should result in an error', function(){
        var code = '<area href="#test">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(6);
        expect(messages[0].type).to.be('warning');
    });

    it('Area[href] tag have empty alt attribute should result in an error', function(){
        var code = '<area href="#test" alt="">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(6);
        expect(messages[0].type).to.be('warning');
    });

    it('Area[href] tag have non emtpy alt attribute should not result in an error', function(){
        var code = '<area href="#test" alt="test">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Input tag have not type and alt attributes should not result in an error', function(){
        var code = '<input>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Input[type="text"] tag have not alt attribute should not result in an error', function(){
        var code = '<input type="text">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Input[type="image"] tag have not alt attribute should result in an error', function(){
        var code = '<input type="image">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Input[type="image"] tag have empty alt attribute should result in an error', function(){
        var code = '<input type="image" alt="">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Input[type="image"] tag have non emtpy alt attribute should not result in an error', function(){
        var code = '<input type="image" alt="test">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
