const expect = require('expect.js')

const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'doctype-html5'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Doctype not html5 should result in an error', () => {
    const code =
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd"><html></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(1)
    expect(messages[0].type).to.be('warning')
  })

  it('Doctype html5 should not result in an error', () => {
    const code = '<!DOCTYPE HTML><html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
