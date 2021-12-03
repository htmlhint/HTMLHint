const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'tags-check'
const ruleOptions = {}

ruleOptions[ruleId] = {
  sometag: {
    selfclosing: true,
    attrsRequired: [['attrname', 'attrvalue']],
  },
}

describe(`Rules: ${ruleId}`, () => {
  it('Tag <a> should have required attrs [title, href]', () => {
    const code = '<a>blabla</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[1].rule.id).toBe(ruleId)
  })
  it('Tag <a> should not be selfclosing', () => {
    const code = '<a href="bbb" title="aaa"/>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
  })
  it('Tag <img> should be selfclosing', () => {
    const code = '<img src="bbb" title="aaa" alt="asd"></img>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
  })
  it('Should check optional attributes', () => {
    const code = '<script src="aaa" async="sad" />'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
  })
  it('Should check redundant attributes', () => {
    const code = '<main role="main" />'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[1].rule.id).toBe(ruleId)
  })
  it('Should be extendable through config', () => {
    const code = '<sometag></sometag>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
  })
  it('Should check required attributes with specified values', () => {
    let code = '<sometag attrname="attrvalue" />'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
    code = '<sometag attrname="wrong_value" />'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
  })
})
