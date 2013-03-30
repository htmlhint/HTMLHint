/**
 * Copyright (c) 2013, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

describe('Rules: jshint', function(){

    it('should result in an error', function(){
        var code = 'a<script>\r\nvar b;\r\n		debugger;\r\na=1</script>b';
        var messages = HTMLHint.verify(code, {'jshint': {
            "undef": true,
            "unused": true
        }});
        expect(messages.length).to.be(4);
        expect(messages[0].rule.id).to.be('jshint');
        expect(messages[0].line).to.be(3);
        expect(messages[0].col).to.be(11);
        expect(messages[0].type).to.be('warning');
        expect(messages[1].rule.id).to.be('jshint');
        expect(messages[1].line).to.be(4);
        expect(messages[1].col).to.be(4);
        expect(messages[1].type).to.be('warning');
        expect(messages[2].rule.id).to.be('jshint');
        expect(messages[2].line).to.be(4);
        expect(messages[2].col).to.be(1);
        expect(messages[2].type).to.be('warning');
        expect(messages[3].rule.id).to.be('jshint');
        expect(messages[3].line).to.be(2);
        expect(messages[3].col).to.be(6);
        expect(messages[3].type).to.be('warning');
    });

});