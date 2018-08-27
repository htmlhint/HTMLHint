var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'title-require',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('<title> be present in <head> tag should not result in an error', function(){
        var code = '<html><head><title>test</title></head><body></body></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('<title> not be present in <head> tag should result in an error', function(){
        var code = '<html><head></head><body></body></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);

        code = '<html><head></head><body><title>test</title></body></html>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);

        code = '<html><title>test</title><head></head><body></body></html>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('No head should not result in an error', function(){
        var code = '<html><body></body></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('<title></title> is empty should result in an error', function(){
        var code = '<html><head><title></title></head><body></body></html>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);

        code = '<html><head><title>  \t   </title></head><body></body></html>';
        messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });
});
