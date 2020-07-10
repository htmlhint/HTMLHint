const expect = require('expect.js')

/** @type import('../../src/core/core').HTMLHint */
const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

describe('Rules: default', () => {
  it('should result 2 errors', () => {
    const code = '<p TEST="abc">'
    const messages = HTMLHint.verify(code)
    expect(messages.length).to.be(2)
  })
})
