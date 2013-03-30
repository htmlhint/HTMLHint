/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: default', function(){

    it('should result 3 errors', function(){
        var code = '<p TEST="abc">';
        var messages = HTMLHint.verify(code);
        expect(messages.length).to.be(3);
    });

});