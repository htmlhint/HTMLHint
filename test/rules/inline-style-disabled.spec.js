const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').default;

const ruldId = 'inline-style-disabled';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('Inline style should result in an error', function() {
    let code = '<body><div style="color:red;"></div></body>';
    let messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(11);
    expect(messages[0].type).to.be('warning');

    code = '<body><div STYLE="color:red;"></div></body>';
    messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
  });
});
