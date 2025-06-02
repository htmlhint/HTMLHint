const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'button-type-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Button with type="button" should not result in an error', () => {
    const code = '<button type="button">Click me</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Button with type="submit" should not result in an error', () => {
    const code = '<button type="submit">Submit</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Button with type="reset" should not result in an error', () => {
    const code = '<button type="reset">Reset</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Button without type attribute should result in an error', () => {
    const code = '<button>Click me</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(8)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'The type attribute must be present on <button> elements.'
    )
  })

  it('Button with invalid type value should result in an error', () => {
    const code = '<button type="invalid">Click me</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(8)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'The type attribute of <button> must have a valid value: "button", "submit", or "reset".'
    )
  })

  it('Button with uppercase type value should not result in an error', () => {
    const code = '<button type="BUTTON">Click me</button>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Other elements should not be affected by this rule', () => {
    const code = '<div>Not a button</div><input type="text">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
