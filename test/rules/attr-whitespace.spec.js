const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-whitespace'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Double spaces in attributes should result in an error', () => {
    const code = '<p test="test  test1">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
  })

  it('Leading/trailing white space should result in an error', () => {
    const code = '<p test=" testtest1 ">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
  })

  it('Double spaces and leading/trailing white space should result in an error', () => {
    const code = '<p test=" test  test1 ">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
  })
})
