/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: style-disabled', function(){

    it('Style tag should result in an error', function(){
        var code = '<body><style>body{}</style></body>';
        var messages = HTMLHint.verify(code, {'style-disabled': true});
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('style-disabled');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Stylesheet link should not result in an error', function(){
        var code = '<body><link rel="stylesheet" href="test.css" /></body>';
        var messages = HTMLHint.verify(code, {'style-disabled': true});
        expect(messages.length).to.be(0);
    });

});