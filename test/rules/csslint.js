/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: csslint', function(){

    it('should result in an error', function(){
        var code = 'a<style> \r\n body{color:red1;\r\ndisplay:inline;height:100px;}</style>b';
        var messages = HTMLHint.verify(code, cleanRules({'csslint': {
            "display-property-grouping": true,
            "known-properties": true
        }}));
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be('csslint');
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
        expect(messages[1].rule.id).to.be('csslint');
        expect(messages[1].line).to.be(3);
        expect(messages[1].col).to.be(16);
        expect(messages[1].type).to.be('warning');
    });

});