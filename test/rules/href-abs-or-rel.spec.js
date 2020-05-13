const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').default;

const ruldId = 'href-abs-or-rel';
const ruleOptions = {};

describe(`Rules: ${ruldId}`, function() {
  it('Href value is not absolute with abs mode should result in an error', function() {
    const code =
      '<a href="a.html">aaa</a><a href="../b.html">bbb</a><a href="tel:12345678">ccc</a><a href="javascript:void()">ddd</a>';
    ruleOptions[ruldId] = 'abs';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(2);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(3);
    expect(messages[1].rule.id).to.be(ruldId);
    expect(messages[1].line).to.be(1);
    expect(messages[1].col).to.be(27);
  });

  it('Href value is absolute with abs mode should not result in an error', function() {
    const code =
      '<a href="http://www.alibaba.com/">aaa</a><a href="https://www.alibaba.com/">bbb</a><a href="tel:12345678">ccc</a><a href="javascript:void()">ddd</a>';
    ruleOptions[ruldId] = 'abs';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Href value is not relative with rel mode should result in an error', function() {
    const code =
      '<a href="http://www.alibaba.com/">aaa</a><a href="https://www.alibaba.com/">bbb</a><a href="tel:12345678">ccc</a><a href="javascript:void()">ddd</a>';
    ruleOptions[ruldId] = 'rel';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(2);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(3);
    expect(messages[1].rule.id).to.be(ruldId);
    expect(messages[1].line).to.be(1);
    expect(messages[1].col).to.be(44);
  });

  it('Href value is relative with rel mode should not result in an error', function() {
    const code =
      '<a href="a.html">aaa</a><a href="../b.html">bbb</a><a href="tel:12345678">ccc</a><a href="javascript:void()">ddd</a>';
    ruleOptions[ruldId] = 'rel';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
