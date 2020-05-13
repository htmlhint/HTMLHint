const expect = require('expect.js');

const HTMLHint = require('../../dist/htmlhint.js').default;

const ruldId = 'attr-unsafe-chars';
const ruleOptions = {};

ruleOptions[ruldId] = true;

describe(`Rules: ${ruldId}`, function() {
  it('Attribute value have unsafe chars should result in an error', function() {
    const code =
      '<a href="https://vimeo.com/album/1951235/video/56931059‎">Sud Web 2012</a>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(1);
    expect(messages[0].col).to.be(3);
    expect(messages[0].type).to.be('warning');
  });

  it('Attribute value have no unsafe chars should not result in an error', function() {
    const code = '<input disabled="disabled" />';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('Attribute value have \\r\\n\\t should not result in an error', function() {
    const code =
      '<link rel="icon" type="image/x-icon" href="data:image/x-icon;base64,R0lGODlhEAAQAKEAAAAAAICAgP///wAAACH/\nC05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQBZAADACwAAAAAEAAQAAACJIyPacLtvp5kEUwYmL00i81VXK\neNgjiioQdeqsuakXl6tIIjBQAh+QQBZAADACwAAAAAEAAQAAACIIyPacLtvp5kcb5qG85iZ2+BkyiRV8BBaEqtrKkqslEAADs=\t"/>';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
