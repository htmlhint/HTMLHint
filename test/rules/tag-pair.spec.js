/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: tag-pair', function(){

    it('No end tag should result in an error', function(){
        var code = '<ul><li></ul><span>';
        var messages = HTMLHint.verify(code, cleanRules({'tag-pair': true}));
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be('tag-pair');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(9);
        expect(messages[1].rule.id).to.be('tag-pair');
        expect(messages[1].line).to.be(1);
        expect(messages[1].col).to.be(20);
    });

    it('No start tag should result in an error', function(){
        var code = '</div>';
        var messages = HTMLHint.verify(code, cleanRules({'tag-pair': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('tag-pair');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
    });

    it('Tag be paired should not result in an error', function(){
        var code = '<p>aaa</p>';
        var messages = HTMLHint.verify(code, cleanRules({'tag-pair': true}));
        expect(messages.length).to.be(0);
    });

});