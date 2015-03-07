/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../lib/htmlhint.src.js").HTMLHint;

var ruldId = 'attr-unsafe-chars',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Attribute value have unsafe chars should result in an error', function(){
        var code = '<a href="https://vimeo.com/album/1951235/video/56931059‎">Sud Web 2012</a>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(3);
        expect(messages[0].type).to.be('warning');
    });

    it('Attribute value have no unsafe chars should not result in an error', function(){
        var code = '<input disabled="disabled" />';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});