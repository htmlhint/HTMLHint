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

  it('SVG elements should be skipped entirely', () => {
    const code = '<svg class="icon icon icon" viewBox="0 0 24 24"></svg>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Style attributes should be skipped entirely', () => {
    const code =
      '<div style="width: 2rem; height: 2rem; width: 2rem;">Test</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('CSS media queries with commas should not be flagged as duplicates', () => {
    const code =
      '<link rel="stylesheet" href="css/test.css" media="all and (-ms-high-contrast: active), (-ms-high-contrast: none)">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Media attribute with actual duplicates should be skipped', () => {
    const code =
      '<link rel="stylesheet" href="css/test.css" media="screen screen">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Content attribute should be skipped entirely', () => {
    const code =
      '<meta name="keywords" content="HTML, CSS, JavaScript, HTML, responsive design">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Script src attribute should be skipped entirely', () => {
    const code =
      '<script src="data:text/javascript,window.analytics = window.analytics || function() { (window.analytics.q = window.analytics.q || []).push(arguments) }"></script>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Sizes attribute should be skipped entirely', () => {
    const code =
      '<source type="" sizes="(min-width: 1rem) 1vw, (min-width: 2rem) 2vw" srcset="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Event handler attributes should be skipped entirely', () => {
    const code =
      "<button onclick=\"trackEvent('click'); validateForm(); trackEvent('click');\">Submit</button>"
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
