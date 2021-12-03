const expect = require('expect.js')

const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'script-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Add external script file should result in an error', () => {
    const code = '<body><script src="test.js"></script></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('error')
  })
  it('Add inline script should result in an error', () => {
    const code = '<body><script>var test = "test";</script></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('error')
  })
})
