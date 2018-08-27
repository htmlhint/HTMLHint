var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: default', function(){

    it('should result 3 errors', function(){
        var code = '<p TEST="abc">';
        var messages = HTMLHint.verify(code);
        expect(messages.length).to.be(3);
    });

});
