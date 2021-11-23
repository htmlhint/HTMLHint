const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-no-unnecessary-whitespace'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute with spaces should result in an error', () => {
    const codes = [
      '<div title = "a" />',
      '<div title= "a" />',
      '<div title ="a" />',
    ]
    for (let i = 0; i < codes.length; i++) {
      const messages = HTMLHint.verify(codes[i], ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruleId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(5)
    }
  })

  it('Attribute without spaces should not result in an error', () => {
    const codes = ['<div title="a" />', '<div title="a = a" />']
    for (let i = 0; i < codes.length; i++) {
      const messages = HTMLHint.verify(codes[i], ruleOptions)
      expect(messages.length).to.be(0)
    }
  })
})
