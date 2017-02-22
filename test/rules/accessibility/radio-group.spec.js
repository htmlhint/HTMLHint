var expect  = require("expect.js");

var HTMLHint  = require("../../../index").HTMLHint;

var ruldId = 'radio-group',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('radio group container without role of radiogroup should result in an error', function(){
        var code = `<div class="radio" aria-labelledby="radioLabel">
                        <div><input id="private" name="type" type="radio"/></div>
                        <div><input id="pulic" name="type" type="radio"/></div>                        
                    </div>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
       // expect(messages[0].line).to.be(6);
        //expect(messages[0].col).to.be(33);   
    });

     it('radio group container with role of radiogroup should not result in an error', function(){
         var code = `<div class="radio" role="radiogroup" aria-labelledby="radioLabel">
                        <div><input tfsdata id="private" name="type" type="radio"/></div>
                        <div><input tfsdata id="pulic" name="type" type="radio"/></div>                        
                    </div>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
    it('radiogroup container without aria-labelledby attribute should result in an error', function(){
        var code = `<div class="radio" role="radiogroup">
                        <div><input tfsdata id="private" name="type" type="radio"/></div>
                        <div><input tfsdata id="pulic" name="type" type="radio"/></div>                        
                    </div>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);

       // expect(messages[0].line).to.be(6);
        //expect(messages[0].col).to.be(33);   
    });

     it('radio group container without role of radiogroup should not result in an error', function(){
         var code = `<div class="radio" role="radiogroup" aria-labelledby="radioLabel">
                        <div><input id="private" name="type" type="radio"/></div>
                        <div><input id="pulic" name="type" type="radio"/></div>                        
                    </div>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});