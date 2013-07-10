/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: tag-self-close', function(){

    it('The empty tag no closed should result in an error', function(){
        var code = '<br><img src="test.jpg">';
        var messages = HTMLHint.verify(code, cleanRules({'tag-self-close': true}));
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be('tag-self-close');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('warning');
        expect(messages[1].rule.id).to.be('tag-self-close');
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(5);
        expect(messages[1].type).to.be('warning');
    });

    it('Closed empty tag should not result in an error', function(){
        var code = '<br /><img src="a.jpg"/>';
        var messages = HTMLHint.verify(code, cleanRules({'tag-self-close': true}));
        expect(messages.length).to.be(0);
    });

});