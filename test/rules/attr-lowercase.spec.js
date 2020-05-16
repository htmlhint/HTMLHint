const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint;

const ruldId = 'attr-lowercase';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('Not all lowercase attr should result in an error', function() {
    let code = '<p TEST="abc">';
    let messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(3);

    code = '<p id=""\r\n TEST1="abc" TEST2="abc">';
    messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(2);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(2);
    expect(messages[0].col).to.be(1);
    expect(messages[1].rule.id).to.be(ruldId);
    expect(messages[1].line).to.be(2);
    expect(messages[1].col).to.be(13);
  });

  it('Lowercase attr should not result in an error', function() {
    const code = '<p test="abc">';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Set is false should not result in an error', function() {
    const code = '<p TEST="abc">';
    ruleOptions[ruldId] = false;
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Set to array list should not result in an error', function() {
    const code = '<p testBox="abc" tttAAA="ccc">';
    ruleOptions[ruldId] = ['testBox', 'tttAAA'];
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Set to array list with RegExp should not result in an error', function() {
    const code = '<p testBox="abc" bind:tapTop="ccc">';
    ruleOptions[ruldId] = ['testBox', /bind:.*/];
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Set to array list with regex string should not result in an error', function() {
    const code = '<p testBox="abc" [ngFor]="ccc">';
    ruleOptions[ruldId] = ['testBox', '/\\[.*\\]/'];
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
