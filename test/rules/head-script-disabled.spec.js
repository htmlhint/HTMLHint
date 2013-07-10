/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");
var cleanRules = require('../utils').cleanRules;

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: head-script-disabled', function(){

    it('External script in head should result in an error', function(){
        var code = '<head><script src="test.js"></script></head>';
        var messages = HTMLHint.verify(code, cleanRules({'head-script-disabled': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('head-script-disabled');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Internal Script in head should result in an error', function(){
        var code = '<head><script>alert(1);</script></head>';
        var messages = HTMLHint.verify(code, cleanRules({'head-script-disabled': true}));
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('head-script-disabled');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
    });

    it('Script in body not result in an error', function(){
        var code = '<head></head><body><script src="test.js"></script></body>';
        var messages = HTMLHint.verify(code, cleanRules({'head-script-disabled': true}));
        expect(messages.length).to.be(0);
    });

});