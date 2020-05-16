const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint;

const ruldId = 'space-tab-mixed-disabled';
const ruleMixOptions = {};
const ruleSpaceOptions = {};
const ruleSpace4Options = {};
const ruleSpace5Options = {};
const ruleTabOptions = {};

ruleMixOptions[ruldId] = true;
ruleSpaceOptions[ruldId] = 'space';
ruleSpace4Options[ruldId] = 'space4';
ruleSpace5Options[ruldId] = 'space5';
ruleTabOptions[ruldId] = 'tab';

describe(`Rules: ${ruldId}`, function() {
  it('Spaces and tabs mixed in front of line should result in an error', function() {
    // space before tab
    let code = '    	<a href="a">      bbb</a>';
    let messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(1);
    // tab before space
    code = '		 <a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(1);
    // multi line
    code = '<div>\r\n	 <a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(2);
    expect(messages[0].col).to.be(1);
  });

  it('Only spaces in front of line should not result in an error', function() {
    let code = '     <a href="a">      bbb</a>';
    let messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(0);

    code = '<div>\r\n     <a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(0);
  });

  it('Only tabs in front of line should not result in an error', function() {
    const code = '			<a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleMixOptions);
    expect(messages.length).to.be(0);
  });

  it('Not only space in front of line should result in an error', function() {
    // mixed 1
    let code = '    	<a href="a">      bbb</a>';
    let messages = HTMLHint.verify(code, ruleSpaceOptions);
    expect(messages.length).to.be(1);

    // mixed 2
    code = '	    <a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleSpaceOptions);
    expect(messages.length).to.be(1);

    // only tab
    code = '		<a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleSpaceOptions);
    expect(messages.length).to.be(1);
  });

  it('Not only space and 4 length in front of line should result in an error', function() {
    const code = '     <a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleSpace4Options);
    expect(messages.length).to.be(1);
    expect(messages[0].message).to.be(
      'Please use space for indentation and keep 4 length.'
    );
  });

  it('Only space and 4 length in front of line should not result in an error', function() {
    const code = '        <a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleSpace4Options);
    expect(messages.length).to.be(0);
  });

  it('Not only space and 5 length in front of line should result in an error', function() {
    const code = '      <a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleSpace5Options);
    expect(messages.length).to.be(1);
    expect(messages[0].message).to.be(
      'Please use space for indentation and keep 5 length.'
    );
  });

  it('Only space and 5 length in front of line should not result in an error', function() {
    const code = '          <a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleSpace5Options);
    expect(messages.length).to.be(0);
  });

  it('Only space in front of line should not result in an error', function() {
    const code = '            <a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleSpaceOptions);
    expect(messages.length).to.be(0);
  });

  it('Not only tab in front of line should result in an error', function() {
    // mixed 1
    let code = '	    <a href="a">      bbb</a>';
    let messages = HTMLHint.verify(code, ruleTabOptions);
    expect(messages.length).to.be(1);

    // mixed 2
    code = '    	<a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleTabOptions);
    expect(messages.length).to.be(1);

    // only space
    code = '       <a href="a">      bbb</a>';
    messages = HTMLHint.verify(code, ruleTabOptions);
    expect(messages.length).to.be(1);
  });

  it('Only tab in front of line should not result in an error', function() {
    // only tab
    const code = '		<a href="a">      bbb</a>';
    const messages = HTMLHint.verify(code, ruleTabOptions);
    expect(messages.length).to.be(0);
  });
});
