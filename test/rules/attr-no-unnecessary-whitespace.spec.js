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
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].line).toBe(1)
      expect(messages[0].col).toBe(5)
    }
  })

  it('Attribute without spaces should not result in an error', () => {
    const codes = ['<div title="a" />', '<div title="a = a" />']
    for (let i = 0; i < codes.length; i++) {
      const messages = HTMLHint.verify(codes[i], ruleOptions)
      expect(messages.length).toBe(0)
    }
  })
})
