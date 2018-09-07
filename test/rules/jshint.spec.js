const expect = require('expect.js');

const HTMLHint = require('../../index').HTMLHint;

const ruldId = 'jshint';
const ruleOptions = {};

ruleOptions[ruldId] = {
  undef: true,
  unused: true
};

describe(`Rules: ${ruldId}`, function() {
  it('should result in an error', function() {
    const code = 'a<script>\r\nvar b;\r\n		debugger;\r\na=1</script>b';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(4);
    expect(messages[0].rule.id).to.be(ruldId);
    expect(messages[0].line).to.be(3);
    expect(messages[0].col).to.be(3);
    expect(messages[0].type).to.be('warning');
    expect(messages[1].rule.id).to.be(ruldId);
    expect(messages[1].line).to.be(4);
    expect(messages[1].col).to.be(4);
    expect(messages[1].type).to.be('warning');
    expect(messages[2].rule.id).to.be(ruldId);
    expect(messages[2].line).to.be(4);
    expect(messages[2].col).to.be(1);
    expect(messages[2].type).to.be('warning');
    expect(messages[3].rule.id).to.be(ruldId);
    expect(messages[3].line).to.be(2);
    expect(messages[3].col).to.be(5);
    expect(messages[3].type).to.be('warning');
  });

  it('type of script be not text/javascript should not result in an error', function() {
    const code =
      'a<script type="text/html">\r\nvar b;\r\n     debugger;\r\na=1</script>b';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('type of script be text/javascript should result in an error', function() {
    const code =
      'a<script type="text/javascript">\r\nvar b;\r\n     debugger;\r\na=1</script>b';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).not.to.be(0);
  });

  it('type of script be text/javascript but have src should not result in an error', function() {
    const code =
      'a<script type="text/javascript" src="test.js">\r\nvar b;\r\n     debugger;\r\na=1</script>b';
    const messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
