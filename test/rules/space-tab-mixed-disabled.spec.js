/**
 * Copyright (c) 2014-2015, Yanis Wang <yanis.wang@gmail.com>
 * MIT Licensed
 */

var expect  = require("expect.js");

var HTMLHint  = require("../../index").HTMLHint;

var ruldId = 'space-tab-mixed-disabled';
var ruleMixOptions = {};
var ruleSpaceOptions = {};
var ruleTabOptions = {};

ruleMixOptions[ruldId] = true;
ruleSpaceOptions[ruldId] = 'space';
ruleTabOptions[ruldId] = 'tab';

describe('Rules: '+ruldId, function(){

    it('Spaces and tabs mixed in front of line should result in an error', function(){
        // space before tab
        var code = '    	<a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        // tab before space
        code = '		 <a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(1);
        expect(messages[0].col).to.be(1);
        // multi line
        code = '<div>\r\n	 <a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(2);
        expect(messages[0].col).to.be(1);
    });

    it('Only spaces in front of line should not result in an error', function(){
        var code = '     <a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(0);

        code = '<div>\r\n     <a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(0);
    });

    it('Only tabs in front of line should not result in an error', function(){
        var code = '			<a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleMixOptions);
        expect(messages.length).to.be(0);
    });

    it('Not only space in front of line should result in an error', function(){
        // mixed 1
        var code = '    	<a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleSpaceOptions);
        expect(messages.length).to.be(1);

        // mixed 2
        code = '	    <a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleSpaceOptions);
        expect(messages.length).to.be(1);

        // only tab
        code = '		<a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleSpaceOptions);
        expect(messages.length).to.be(1);
    });

    it('Only space in front of line should not result in an error', function(){
        var code = '            <a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleSpaceOptions);
        expect(messages.length).to.be(0);
    });

    it('Not only tab in front of line should result in an error', function(){
        // mixed 1
        var code = '\n	    <a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleTabOptions);
        expect(messages.length).to.be(1);

        // mixed 2
        code = '\n    	<a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleTabOptions);
        expect(messages.length).to.be(1);

        // only space
        code = '\n       <a href="a">bbb</a>';
        messages = HTMLHint.verify(code, ruleTabOptions);
        expect(messages.length).to.be(1);
    });

    it('Only tab in front of line should not result in an error', function(){
        // only tab
        var code = '		<a href="a">bbb</a>';
        var messages = HTMLHint.verify(code, ruleTabOptions);
        expect(messages.length).to.be(0);
    });
});
