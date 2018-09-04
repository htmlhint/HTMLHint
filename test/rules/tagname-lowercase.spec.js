const expect = require('expect.js');

const HTMLHint = require('../../index').HTMLHint;

const ruldId = 'tagname-lowercase';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('The tag name not all lower case should result in an error', function() {
    const code = '<A href=""></A><SPAN>aab</spaN>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(4);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(1);
    expect(messages[1].rule.id).to.be(ruldId);
    expect(messages[1].line).to.be(1);
    expect(messages[1].col).to.be(12);
    expect(messages[2].rule.id).to.be(ruldId);
    expect(messages[2].line).to.be(1);
    expect(messages[2].col).to.be(16);
    expect(messages[3].rule.id).to.be(ruldId);
    expect(messages[3].line).to.be(1);
    expect(messages[3].col).to.be(25);
  });

  it('All lower case tag name should not result in an error', function() {
    const code = '<a href=""></a><span>test</span>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
