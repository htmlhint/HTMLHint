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

  it('Duplicate values in id attribute should NOT result in an error with default config', () => {
    const code = '<div id="section1 main section1">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Duplicate values in role attribute should NOT result in an error with default config', () => {
    const code = '<div role="button navigation button">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Duplicate values in name attribute should NOT result in an error with default config', () => {
    const code = '<input name="username form1 username">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Duplicate values in data attribute should not result in an error with default config', () => {
    const code = '<span data-attributes="dark light dark">Test</span>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
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

  it('Angular directive attributes should not result in an error', () => {
    const code =
      '<div [ngClass]="\'btn btn\'" *ngIf="condition condition">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Alt attributes with duplicate words should not result in an error', () => {
    // This has the word "a" repeated multiple times which would trigger an error if 'alt' was checked
    const code = '<img src="image.jpg" alt="A cat and a dog and a ball">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Custom attribute configuration should work as expected', () => {
    const customOptions = {}
    customOptions[ruleId] = ['data-test', 'aria-label']

    // This should now trigger an error with our custom config
    const code = '<div data-test="unit test unit">Test</div>'
    const messages = HTMLHint.verify(code, customOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe(
      'Duplicate value [ unit ] was found in attribute [ data-test ].'
    )

    // Class should no longer be checked with custom config
    const code2 = '<div class="btn primary btn">Test</div>'
    const messages2 = HTMLHint.verify(code2, customOptions)
    expect(messages2.length).toBe(0)
  })

  it('Extended custom configuration should work as expected', () => {
    const extendedOptions = {}
    extendedOptions[ruleId] = ['class', 'id', 'role', 'name']

    // Class should still be checked
    const code1 = '<div class="btn primary btn">Test</div>'
    const messages1 = HTMLHint.verify(code1, extendedOptions)
    expect(messages1.length).toBe(1)
    expect(messages1[0].message).toBe(
      'Duplicate value [ btn ] was found in attribute [ class ].'
    )

    // Id should now be checked
    const code2 = '<div id="section1 main section1">Test</div>'
    const messages2 = HTMLHint.verify(code2, extendedOptions)
    expect(messages2.length).toBe(1)
    expect(messages2[0].message).toBe(
      'Duplicate value [ section1 ] was found in attribute [ id ].'
    )

    // Role should now be checked
    const code3 = '<div role="button navigation button">Test</div>'
    const messages3 = HTMLHint.verify(code3, extendedOptions)
    expect(messages3.length).toBe(1)
    expect(messages3[0].message).toBe(
      'Duplicate value [ button ] was found in attribute [ role ].'
    )
  })
})
