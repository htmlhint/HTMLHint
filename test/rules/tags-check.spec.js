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
    var code = '<a>blabla</a>'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Tag <a> should not be selfclosing', function () {
    var code = '<a href="bbb" title="aaa"/>'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Tag <img> should be selfclosing', function () {
    var code = '<img src="bbb" title="aaa" alt="asd"></img>'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check optional attributes', function () {
    var code = '<script src="aaa" async="sad" />'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check redunant attributes', function () {
    var code = '<main role="main" />'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Should be extendable trought config', function () {
    var code = '<sometag></sometag>'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check required attributes with specifyed values', function () {
    var code = '<sometag attrname="attrvalue" />'
    var messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
    code = '<sometag attrname="wrong_value" />'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
})
