/**
 * Copyright (c) 2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'attr-no-inline',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('Should throw error unless each attribute exists on its own line', function(){
        var code = `
            <p TEST="abc" TEST2="abc" TEST3="123" TEST4="456">
        `;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
    });

    it('Should not throw an error', function(){
        var code = `
                <p
                    TEST="abc"
                    TEST2="abc"
                    TEST3="123"
                    TEST4="456">
            `;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Should pass when only one attribute inline', function(){
        var code = `
                <p TEST="abc">
            `;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Should pass when there are no attributes', function(){
        var code = `
                <p>
            `;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('Should pass when attribute contains line breaks', function(){
        var code = `
                <form
                    name="hsCodeAddComponent"
                    class="form
                        form2
                        form3
                    ">
            `;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });
});
