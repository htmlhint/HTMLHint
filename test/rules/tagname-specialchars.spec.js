const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'tagname-specialchars'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Special character in tag name should result in an error', () => {
    const code = '<@ href="link"></@><$pan>aab</$pan>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(16)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(29)
  })

  it('Tag name without special character should not result in an error', () => {
    const code = '<a href=""></a><span>test</span>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
