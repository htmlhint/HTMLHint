/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'head-script-disabled',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('External script in head should result in an error', function(){
        var code = '<head><script src="test.js"></script></head>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        expect(messages[0].type).to.be('warning');
    });

    it('Internal Script in head should result in an error', function(){
        var code = '<head><script>alert(1);</script></head>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(7);
        code = '<head><script type="text/javascript">console.log(1)</script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        code = '<head><script type="application/javascript">console.log(2)</script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Script in body not result in an error', function(){
        var code = '<head></head><body><script src="test.js"></script></body>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Template script in head not result in an error', function(){
        var code = '<head><script type="text/template"><img src="test.png" /></script></head>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
        code = '<head><script type="text/ng-template"><img src="test.png" /></script></head>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Omitted head HTML with script not result in an error', function(){
        var code = '<p>...</p><script src="test.js"></script>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});
