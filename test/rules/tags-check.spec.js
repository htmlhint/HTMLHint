const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'tags-check'
const ruleOptions = {}

ruleOptions[ruldId] = {
  sometag: {
    selfclosing: true,
    attrsRequired: [['attrname', 'attrvalue']],
  },
}

describe('Rules: ' + ruldId, function () {
  it('Tag <a> should have requered attrs [title, href]', function () {
    let code = '<a>blabla</a>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Tag <a> should not be selfclosing', function () {
    let code = '<a href="bbb" title="aaa"/>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Tag <img> should be selfclosing', function () {
    let code = '<img src="bbb" title="aaa" alt="asd"></img>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check optional attributes', function () {
    let code = '<script src="aaa" async="sad" />'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check redunant attributes', function () {
    let code = '<main role="main" />'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Should be extendable trought config', function () {
    let code = '<sometag></sometag>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check required attributes with specifyed values', function () {
    let code = '<sometag attrname="attrvalue" />'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
    code = '<sometag attrname="wrong_value" />'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
})
