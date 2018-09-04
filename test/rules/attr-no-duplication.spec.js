const expect = require('expect.js');

const HTMLHint = require('../../index').HTMLHint;

const ruldId = 'attr-no-duplication';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('Attribute name been duplication should result in an error', function() {
    const code = '<a href="a" href="b">bbb</a>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(12);
  });

  it('Attribute name not been duplication should not result in an error', function() {
    const code = '<a href="a">bbb</a>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
