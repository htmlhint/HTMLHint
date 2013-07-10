/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: tagname-lowercase', function(){

    it('The tag name not all lower case should result in an error', function(){
        var code = '<A href=""></A><SPAN>aab</spaN>';
        var messages = HTMLHint.verify(code, cleanRules({'tagname-lowercase': true}));
        expect(messages.length).to.be(4);
        expect(messages[0].rule.id).to.be('tagname-lowercase');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[1].rule.id).to.be('tagname-lowercase');
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(12);
        expect(messages[2].rule.id).to.be('tagname-lowercase');
        expect(messages[2].line).to.be(1);
        expect(messages[2].col).to.be(16);
        expect(messages[3].rule.id).to.be('tagname-lowercase');
        expect(messages[3].line).to.be(1);
        expect(messages[3].col).to.be(25);
    });

    it('All lower case tag name should not result in an error', function(){
        var code = '<a href=""></a><span>test</span>';
        var messages = HTMLHint.verify(code, cleanRules({'tagname-lowercase': true}));
        expect(messages.length).to.be(0);
    });

});