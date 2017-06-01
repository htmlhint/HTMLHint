/**
 * Copyright (c) 2017, Markus Peroebner <markus.peroebner@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'button-type',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('type be empty on button should result in an error', function(){
        var code = '<button type="" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('type be xxx on button should result in an error', function(){
        var code = '<button type="xxx" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('type be submit on button should not result in an error', function(){
        var code = '<button type="button" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('type be reset on button should result in an error', function(){
        var code = '<button type="reset" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('type be button on button should result in an error', function(){
        var code = '<button type="button" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
