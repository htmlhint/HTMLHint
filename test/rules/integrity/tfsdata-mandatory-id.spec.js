var expect  = require("expect.js");

var HTMLHint  = require("../../../index").HTMLHint;

var ruldId = 'tfsdata-mandatory-id',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('element with tfsdata and with missing id should result in an error', function(){
        var code = '<div><input tfsdata /><div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(6);   
    });

    it('element with tfsrowdata and with missing id should result in an error', function(){
        var code = '<div><input tfsrowdata /><div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId); 
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(6);   
    });   


    it('element with tfsrowdata and with  id should not result in an error', function(){
        var code = '<div><input tfsrowdata id="city" /><div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

     it('element with tfsdata and with id should not result in an error', function(){
        var code = '<div><input tfsdata id="city" /><div>';
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

});