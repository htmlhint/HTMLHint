const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'style-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Style tag should result in an error', () => {
    const code = '<body><style>body{}</style></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
  })

  it('Stylesheet link should not result in an error', () => {
    const code = '<body><link rel="stylesheet" href="test.css" /></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
