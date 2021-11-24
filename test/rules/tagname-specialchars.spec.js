const expect = require('expect.js')

/** @type import('../../src/core/core').HTMLHint */
const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'tagname-specialchars'
const ruleOptions = {}

ruleOptions[ruldId] = 'error'

describe(`Rules: ${ruldId}`, () => {
  it('Special character in tag name should result in an error', () => {
    const code = '<@ href="link"></@><$pan>aab</$pan>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(16)
    expect(messages[1].rule.id).to.be(ruldId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(29)
  })

  it('Tag name without special character should not result in an error', () => {
    const code = '<a href=""></a><span>test</span>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(0)
  })
})
