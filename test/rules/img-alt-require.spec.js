/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: img-alt-require', function(){

    it('Img tag have not alt attr should result in an error', function(){
        var code = '<img width="200" height="300">';
        var messages = HTMLHint.verify(code, {'img-alt-require': true});
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be('img-alt-require');
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
    });

    it('Img tag have alt attr should not result in an error', function(){
        var code = '<img width="200" height="300" alt="test">';
        var messages = HTMLHint.verify(code, {'img-alt-require': true});
        expect(messages.length).to.be(0);
    });

    it('Img tag have empty alt attr should not result in an error', function(){
        var code = '<img width="200" height="300" alt="">';
        var messages = HTMLHint.verify(code, {'img-alt-require': true});
        expect(messages.length).to.be(0);
    });

});