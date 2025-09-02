const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'form-method-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Form with method="get" should not result in an error', () => {
    const code = '<form method="get"></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Form with method="post" should not result in an error', () => {
    const code = '<form method="post"></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Form with method="dialog" should not result in an error', () => {
    const code = '<form method="dialog"></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Form without method attribute should result in an error', () => {
    const code = '<form></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(6)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'The method attribute must be present on <form> elements.'
    )
  })

  it('Form with invalid method value should result in an error', () => {
    const code = '<form method="invalid"></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(6)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'The method attribute of <form> must have a valid value: "get", "post", or "dialog".'
    )
  })

  it('Form with uppercase method value should not result in an error', () => {
    const code = '<form method="POST"></form>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Other elements should not be affected by this rule', () => {
    const code = '<div>Not a form</div><input type="text">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
