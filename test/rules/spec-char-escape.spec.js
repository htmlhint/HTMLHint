const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'spec-char-escape'
const ruleOptions = {}

ruleOptions[ruldId] = 'error'

describe(`Rules: ${ruldId}`, () => {
  it('Special characters: <> should result in an error', () => {
    const code = '<p>aaa>bbb< ccc</p>ddd\r\neee<'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(3)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[1].rule.id).to.be(ruldId)
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(11)
    expect(messages[2].rule.id).to.be(ruldId)
    expect(messages[2].line).to.be(2)
    expect(messages[2].col).to.be(4)
  })

  it('Special characters: & should result in an error', () => {
    const code = '<p>Steinway & Sons</p>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruldId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(12)
  })

  it('Normal text should not result in an error', () => {
    const code = '<p>abc</p>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(0)
  })

  it('Properly formed HTML entities should not result in an error', () => {
    const code = '<p>Steinway &amp; &gt; Sons Q&amp;A </p>'
    const messages = HTMLHint.verify(code, { rules: ruleOptions })
    expect(messages.length).to.be(0)
  })
})
