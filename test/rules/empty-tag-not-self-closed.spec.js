const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'empty-tag-not-self-closed'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('The empty tag no closed should not result in an error', () => {
    const code = '<br><img src="test.jpg">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Closed empty tag should result in an error', () => {
    const code = '<br /><img src="a.jpg"/>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
    expect(messages[0].type).toBe('error')
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(7)
    expect(messages[1].type).toBe('error')
  })
})
