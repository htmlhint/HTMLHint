const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'spec-char-escape'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Special characters: <> should result in an error', () => {
    const code = '<p>aaa>bbb< ccc</p>ddd\r\neee<'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(3)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(11)
    expect(messages[2].rule.id).toBe(ruleId)
    expect(messages[2].line).toBe(2)
    expect(messages[2].col).toBe(4)
  })

  it('Special characters: & should result in an error', () => {
    const code = '<p>Steinway & Sons</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(12)
  })

  it('Normal text should not result in an error', () => {
    const code = '<p>abc</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Properly formed HTML entities should not result in an error', () => {
    const code = '<p>Steinway &amp; &gt; Sons Q&amp;A </p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
