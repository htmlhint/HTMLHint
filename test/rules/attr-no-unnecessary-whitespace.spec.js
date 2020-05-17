let expect = require('expect.js')

let HTMLHint = require('../../dist/htmlhint.js').HTMLHint

let ruldId = 'attr-no-unnecessary-whitespace'
let ruleOptions = {}

ruleOptions[ruldId] = true

describe('Rules: ' + ruldId, function () {
  it('Attribute with spaces should result in an error', function () {
    let codes = [
      '<div title = "a" />',
      '<div title= "a" />',
      '<div title ="a" />',
    ]
    for (let i = 0; i < codes.length; i++) {
      let messages = HTMLHint.verify(codes[i], ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruldId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(5)
    }
  })

  it('Attribute without spaces should not result in an error', function () {
    let codes = ['<div title="a" />', '<div title="a = a" />']
    for (let i = 0; i < codes.length; i++) {
      let messages = HTMLHint.verify(codes[i], ruleOptions)
      expect(messages.length).to.be(0)
    }
  })
})
