const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-value-double-quotes'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute value closed by single quotes should result in an error', () => {
    const code = "<a href='abc' title=abc style=''>"
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(3)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(3)
    expect(messages[1].rule.id).to.be(ruleId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(14)
    expect(messages[2].rule.id).to.be(ruleId)
    expect(messages[2].line).to.be(1)
    expect(messages[2].col).to.be(24)
  })

  it('Attribute value no closed should not result in an error', () => {
    const code = '<input type="button" disabled style="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
