var expect = require('expect.js');

var HTMLHint = require('../../index').HTMLHint;

var ruldId = 'attr-value-not-empty',
  ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: ' + ruldId, function() {
  it('Attribute value have no value should result in an error', function() {
    var code = '<input disabled>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(7);
    expect(messages[0].type).to.be('warning');
  });

  it('Attribute value closed by quote but no value should not result in an error', function() {
    var code = '<input disabled="">';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Attribute value closed by quote and have value should not result in an error', function() {
    var code = '<input disabled="disabled">';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
