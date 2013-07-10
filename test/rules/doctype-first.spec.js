/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: doctype-first', function(){

    it('Doctype not be first should result in an error', function(){
        var code = '<html></html>';
        var messages = HTMLHint.verify(code, cleanRules({'doctype-first': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('doctype-first');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
    });

    it('Doctype be first should not result in an error', function(){
        var code = '<!DOCTYPE HTML><html>';
        var messages = HTMLHint.verify(code, cleanRules({'doctype-first': true}));
        expect(messages.length).to.be(0);
    });

});