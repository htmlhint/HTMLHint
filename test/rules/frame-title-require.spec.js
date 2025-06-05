const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'frame-title-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Frame with aria-label should not result in an error', () => {
    const code = '<frame src="test.html" aria-label="Test frame">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Iframe with aria-label should not result in an error', () => {
    const code = '<iframe src="test.html" aria-label="Test iframe"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Frame with aria-labelledby should not result in an error', () => {
    const code = '<frame src="test.html" aria-labelledby="label1">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Iframe with aria-labelledby should not result in an error', () => {
    const code = '<iframe src="test.html" aria-labelledby="label1"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Frame with title should not result in an error', () => {
    const code = '<frame src="test.html" title="Test frame">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Iframe with title should not result in an error', () => {
    const code = '<iframe src="test.html" title="Test iframe"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Frame with role="presentation" should not result in an error', () => {
    const code = '<frame src="test.html" role="presentation">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Iframe with role="none" should not result in an error', () => {
    const code = '<iframe src="test.html" role="none"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Frame without accessible name should result in an error', () => {
    const code = '<frame src="test.html">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'A <frame> element must have an accessible name.'
    )
  })

  it('Iframe without accessible name should result in an error', () => {
    const code = '<iframe src="test.html"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(8)
    expect(messages[0].type).toBe('warning')
    expect(messages[0].message).toBe(
      'A <iframe> element must have an accessible name.'
    )
  })

  it('Frame with empty aria-label should result in an error', () => {
    const code = '<frame src="test.html" aria-label="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
  })

  it('Iframe with empty title should result in an error', () => {
    const code = '<iframe src="test.html" title=""></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(8)
    expect(messages[0].type).toBe('warning')
  })

  it('Frame with whitespace-only aria-label should result in an error', () => {
    const code = '<frame src="test.html" aria-label="   ">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
  })

  it('Iframe with whitespace-only aria-labelledby should result in an error', () => {
    const code = '<iframe src="test.html" aria-labelledby="  "></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(8)
    expect(messages[0].type).toBe('warning')
  })

  it('Multiple iframes - one valid, one invalid should result in one error', () => {
    const code =
      '<iframe src="test1.html" title="Valid frame"></iframe><iframe src="test2.html"></iframe>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(62)
    expect(messages[0].type).toBe('warning')
  })

  it('Other elements should not be affected', () => {
    const code = '<div><p>Content</p></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
