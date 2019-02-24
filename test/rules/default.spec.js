const expect = require('expect.js');

const HTMLHint = require('../../').default;

describe('Rules: default', function() {
  it('should result 3 errors', function() {
    const code = '<p TEST="abc">';
    const messages = HTMLHint.verify(code);
    expect(messages.length).to.be(3);
  });
});
