const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'doctype-first'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Doctype not be first should result in an error', () => {
    const code = '<html></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
  })

  it('Doctype be first should not result in an error', () => {
    const code = '<!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Comments before doctype should not result in an error', () => {
    const code = '<!-- comment --><!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Multiple comments and whitespace before doctype should not result in an error', () => {
    const code =
      '<!-- comment 1 -->\n  <!-- comment 2 -->\n  <!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Non-comment content before doctype should result in an error', () => {
    const code = '<div></div><!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
  })
})
