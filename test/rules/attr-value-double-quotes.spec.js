const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'attr-value-double-quotes'
const ruleOptions = {}

ruleOptions[ruldId] = true

describe(`Rules: ${ruldId}`, function () {
  it('Attribute value closed by single quotes should result in an error', function () {
    const code = "<a href='abc' title=abc style=''>"
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(3)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(3)
    expect(messages[1].rule.id).to.be(ruldId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(14)
    expect(messages[2].rule.id).to.be(ruldId)
    expect(messages[2].line).to.be(1)
    expect(messages[2].col).to.be(24)
  })

  it('Attribute value no closed should not result in an error', function () {
    const code = '<input type="button" disabled style="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
