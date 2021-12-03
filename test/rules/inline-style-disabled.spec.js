const expect = require('expect.js')

const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'inline-style-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Inline style should result in an error', () => {
    let code = '<body><div style="color:red;"></div></body>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(11)
    expect(messages[0].type).to.be('warning')

    code = '<body><div STYLE="color:red;"></div></body>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
})
