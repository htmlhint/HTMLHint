const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-no-duplication'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute name been duplication should result in an error', () => {
    const code = '<a href="a" href="b">bbb</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(12)
  })

  it('Attribute name duplicated in a different case should result in an error', () => {
    // HTML attribute names are ASCII case insensitive, so href and HREF on the
    // same element are the same attribute.
    const code = '<a href="a" HREF="b">bbb</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
  })

  it('Attribute name not been duplication should not result in an error', () => {
    const code = '<a href="a">bbb</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
