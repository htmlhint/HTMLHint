const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-value-no-duplication'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Duplicate values in class attribute should result in an error', () => {
    const code = '<div class="d-none small d-none">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[0].message).toBe(
      'Duplicate value [ d-none ] was found in attribute [ class ].'
    )
  })

  it('Duplicate values in data attribute should result in an error', () => {
    const code = '<span data-attributes="dark light dark">Test</span>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(6)
    expect(messages[0].message).toBe(
      'Duplicate value [ dark ] was found in attribute [ data-attributes ].'
    )
  })

  it('No duplicate values should not result in an error', () => {
    const code = '<div class="container fluid small">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Single value should not result in an error', () => {
    const code = '<div class="container">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Empty attribute value should not result in an error', () => {
    const code = '<div class="">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Multiple attributes with no duplicates should not result in an error', () => {
    const code =
      '<div class="btn btn-primary" id="submit-button" data-toggle="modal">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Multiple spaces between values should still detect duplicates', () => {
    const code = '<div class="btn    primary   btn">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe(
      'Duplicate value [ btn ] was found in attribute [ class ].'
    )
  })
})
