const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint;

const ruldId = 'id-unique';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('Id redefine should result in an error', function() {
    const code = '<div id="test"></div><div id="test"></div>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(26);
    expect(messages[0].type).to.be('error');
  });

  it('Id no redefine should not result in an error', function() {
    const code = '<div id="test1"></div><div id="test2"></div>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
