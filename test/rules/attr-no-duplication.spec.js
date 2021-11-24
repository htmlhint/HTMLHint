const expect = require('expect.js')

/** @type import('../../src/core/core').HTMLHint */
const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'attr-no-duplication'
const ruleOptions = {}

ruleOptions[ruldId] = 'error'

describe(`Rules: ${ruldId}`, () => {
  it('Attribute name been duplication should result in an error', () => {
    const code = '<a href="a" href="b">bbb</a>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(12)
  })

  it('Attribute name not been duplication should not result in an error', () => {
    const code = '<a href="a">bbb</a>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(0)
  })
})
