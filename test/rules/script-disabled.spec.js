const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'script-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Add external script file should result in an error', () => {
    const code = '<body><script src="test.js"></script></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('error')
  })
  it('Add inline script should result in an error', () => {
    const code = '<body><script>var test = "test";</script></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('error')
  })
})
