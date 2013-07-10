/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: attr-lowercase', function(){

    it('Not all lowercase attr should result in an error', function(){
        var code = '<p TEST="abc">';
        var messages = HTMLHint.verify(code, cleanRules({'attr-lowercase': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('attr-lowercase');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);
    });

    it('Lowercase attr should not result in an error', function(){
        var code = '<p test="abc">';
        var messages = HTMLHint.verify(code, cleanRules({'attr-lowercase': true}));
        expect(messages.length).to.be(0);
    });

});