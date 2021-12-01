const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-value-single-quotes'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute value closed by double quotes should result in an error', () => {
    const code = '<a href="abc" title=abc style="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(3)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(3)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(14)
    expect(messages[2].rule.id).toBe(ruleId)
    expect(messages[2].line).toBe(1)
    expect(messages[2].col).toBe(24)
  })

  it('Attribute value no closed should not result in an error', () => {
    const code = "<input type='button' disabled style=''>"
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
