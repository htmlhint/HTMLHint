/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-no-title-case',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Camel case attr should not result in an error', function(){
        var code = '<p testTest="abc">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Title case attr should result in an error', function(){
        var code = '<p Test="AbcDef">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Title case attr should result in an error - angular 2', function(){
        var code = '<p *Test="AbcDef">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Title case attr should result in an error - angular 2', function(){
        var code = '<p [Test]="AbcDef">';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Set is false not result in an error', function(){
        var code = '<p NgFor="abc">';
        ruleOptions[ruldId] = false;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
