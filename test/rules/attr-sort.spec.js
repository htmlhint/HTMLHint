const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').default;

const ruleId = 'attr-sorted';
const ruleOptions = {};

ruleOptions[ruleId] = true;

describe(`Rules: ${ruleId}`, function() {
  it('Attribute unsorted tags must result in an error', function() {
    const code = '<div id="test" class="class" title="tite"></div>';

    const messages = HTMLHint.verify(code, ruleOptions);

    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruleId);
    expect(messages[0].message).to.contain('["id","class","title"]');
  });

  it('Attribute unsorted tags that are unrecognizable should not throw error', function() {
    const code = '<div img="image" meta="meta" font="font"></div>';

    const messages = HTMLHint.verify(code, ruleOptions);

    expect(messages.length).to.be(0);
  });

  it('Attribute unsorted of tags of various types should throw error', function() {
    const code = '<div type="type" img="image" id="id" font="font"></div>';

    const messages = HTMLHint.verify(code, ruleOptions);

    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruleId);
    expect(messages[0].message).to.contain('["type","img","id","font"]');
  });
});
