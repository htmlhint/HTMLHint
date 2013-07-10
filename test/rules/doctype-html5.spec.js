/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: doctype-html5', function(){

    it('Doctype not html5 should result in an error', function(){
        var code = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html></html>';
        var messages = HTMLHint.verify(code, cleanRules({'doctype-html5': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('doctype-html5');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        expect(messages[0].type).to.be('warning');
    });

    it('Doctype html5 should not result in an error', function(){
        var code = '<!DOCTYPE HTML><html>';
        var messages = HTMLHint.verify(code, cleanRules({'doctype-html5': true}));
        expect(messages.length).to.be(0);
    });

});