const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'id-unique'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Id redefine should result in an error', () => {
    const code = '<div id="test"></div><div id="test"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(26)
    expect(messages[0].type).toBe('error')
  })

  it('Id no redefine should not result in an error', () => {
    const code = '<div id="test1"></div><div id="test2"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
