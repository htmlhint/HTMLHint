const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'style-disabled'
const ruleOptions = {}

ruleOptions[ruldId] = 'warn'

describe(`Rules: ${ruldId}`, () => {
  it('Style tag should result in an error', () => {
    const code = '<body><style>body{}</style></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('warning')
  })

  it('Stylesheet link should not result in an error', () => {
    const code = '<body><link rel="stylesheet" href="test.css" /></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
