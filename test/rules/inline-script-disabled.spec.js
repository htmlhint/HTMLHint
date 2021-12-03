const expect = require('expect.js')

const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'inline-script-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Inline on event should result in an error', () => {
    const code =
      '<body><img src="test.gif" onclick="alert(1);"><img src="test.gif" onMouseDown="alert(1);"></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(26)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].col).to.be(66)
  })

  it('onttt should not result in an error', () => {
    const code = '<body><img src="test.gif" onttt="alert(1);"></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Javascript protocol [ javascript: ] should result in an error', () => {
    let code =
      '<body><img src="javascript:alert(1)"><img src=" JAVASCRIPT:alert(1)"></body>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(11)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].col).to.be(42)

    code =
      '<body><a href="javascript:alert(1)">test1</a><a href=" JAVASCRIPT:alert(2)">test2</a></body>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(9)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].col).to.be(48)
  })
})
