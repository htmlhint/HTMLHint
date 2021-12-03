const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'inline-style-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Inline style should result in an error', () => {
    let code = '<body><div style="color:red;"></div></body>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(11)
    expect(messages[0].type).toBe('warning')

    code = '<body><div STYLE="color:red;"></div></body>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
  })
})
