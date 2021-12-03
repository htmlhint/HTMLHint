const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'attr-value-not-empty'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute value have no value should result in an error', () => {
    const code = '<input disabled>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
  })

  it('Attribute value closed by quote but no value should not result in an error', () => {
    const code = '<input disabled="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Attribute value closed by quote and have value should not result in an error', () => {
    const code = '<input disabled="disabled">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
