/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: id-unique', function(){

    it('Id redefine should result in an error', function(){
        var code = '<div id="test"></div><div id="test"></div>';
        var messages = HTMLHint.verify(code, cleanRules({'id-unique': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('id-unique');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(26);
        expect(messages[0].type).to.be('error');
    });

    it('Id no redefine should not result in an error', function(){
        var code = '<div id="test1"></div><div id="test2"></div>';
        var messages = HTMLHint.verify(code, cleanRules({'id-unique': true}));
        expect(messages.length).to.be(0);
    });

});