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

describe(`Rules: ${ruldId}`, () => {
  it('Tag <a> should have requered attrs [title, href]', () => {
    const code = '<a>blabla</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Tag <a> should not be selfclosing', () => {
    const code = '<a href="bbb" title="aaa"/>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Tag <img> should be selfclosing', () => {
    const code = '<img src="bbb" title="aaa" alt="asd"></img>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check optional attributes', () => {
    const code = '<script src="aaa" async="sad" />'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check redunant attributes', () => {
    const code = '<main role="main" />'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[1].rule.id).to.be(ruldId)
  })
  it('Should be extendable trought config', () => {
    const code = '<sometag></sometag>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
  })
  it('Should check required attributes with specifyed values', () => {
    let code = '<sometag attrname="attrvalue" />'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
    code = '<sometag attrname="wrong_value" />'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
})
