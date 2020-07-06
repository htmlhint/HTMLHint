const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'tag-self-close'
const ruleOptions = {}

ruleOptions[ruldId] = 'warn'

describe(`Rules: ${ruldId}`, () => {
  it('The empty tag no closed should result in an error', () => {
    const code = '<br><img src="test.jpg">'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(1)
    console.log('lll', messages[0].type)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].rule.id).to.be(ruldId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(5)
    expect(messages[1].type).to.be('warning')
  })

  it('Closed empty tag should not result in an error', () => {
    const code = '<br /><img src="a.jpg"/>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(0)
  })
})
