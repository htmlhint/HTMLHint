const HTMLHint = require('../core').HTMLHint

const ruleId = 'tag-self-close'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('The empty tag no closed should result in an error', () => {
    const code = '<br><img src="test.jpg">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
    expect(messages[0].type).toBe('warning')
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(5)
    expect(messages[1].type).toBe('warning')
  })

  it('Closed empty tag should not result in an error', () => {
    const code = '<br /><img src="a.jpg"/>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
