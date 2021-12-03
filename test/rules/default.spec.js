const HTMLHint = require('../../src/core/core').HTMLHint

describe('Rules: default', () => {
  it('should result 3 errors', () => {
    const code = '<p TEST="abc">'
    const messages = HTMLHint.verify(code)
    expect(messages.length).toBe(3)
  })
})
