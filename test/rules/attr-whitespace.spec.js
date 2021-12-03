const expect = require('expect.js')

const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'attr-whitespace'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Double spaces in attributes should result in an error', () => {
    const code = '<p test="test  test1">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
  })

  it('Leading/trailing white space should result in an error', () => {
    const code = '<p test=" testtest1 ">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
  })

  it('Double spaces and leading/trailing white space should result in an error', () => {
    const code = '<p test=" test  test1 ">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
  })
})
