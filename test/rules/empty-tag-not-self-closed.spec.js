const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'empty-tag-not-self-closed'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('The empty tag no closed should not result in an error', () => {
    const code = '<br><img src="test.jpg">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Closed empty tag should result in an error', () => {
    const code = '<br /><img src="a.jpg"/>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(1)
    expect(messages[0].type).to.be('error')
    expect(messages[1].rule.id).to.be(ruleId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(7)
    expect(messages[1].type).to.be('error')
  })
})
