const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-space-between'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attributes without a space between them should result in an error', () => {
    const code = '<div id="foo"class="bar"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe(
      'Attribute [ class ] must be separated with a space.'
    )
  })

  it('Multiple attributes without spaces should each result in an error', () => {
    const code = '<div id="foo"class="bar"title="baz"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    messages.forEach((msg) => expect(msg.rule.id).toBe(ruleId))
  })

  it('Attributes separated by spaces should not result in an error', () => {
    const code = '<div id="foo" class="bar"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Unquoted and valueless attributes should not result in an error', () => {
    const code = '<input type=checkbox checked>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Attributes separated by newlines should not result in an error', () => {
    const code = '<div id="foo"\n     class="bar"></div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
