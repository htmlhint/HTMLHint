let expect = require('expect.js')
let HTMLHint = require('../../dist/htmlhint.js').HTMLHint
let ruldId = 'script-disabled'
let ruleOptions = {}
ruleOptions[ruldId] = true
describe('Rules: ' + ruldId, function () {
  it('Add external script file should result in an error', function () {
    let code = '<body><script src="test.js"></script></body>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('error')
  })
  it('Add inline script should result in an error', function () {
    let code = '<body><script>var test = "test";</script></body>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('error')
  })
})
