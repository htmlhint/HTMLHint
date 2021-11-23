const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'title-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('<title> be present in <head> tag should not result in an error', () => {
    const code = '<html><head><title>test</title></head><body></body></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('<title> not be present in <head> tag should result in an error', () => {
    let code = '<html><head></head><body></body></html>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)

    code = '<html><head></head><body><title>test</title></body></html>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)

    code = '<html><title>test</title><head></head><body></body></html>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })

  it('No head should not result in an error', () => {
    const code = '<html><body></body></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('<title></title> is empty should result in an error', () => {
    let code = '<html><head><title></title></head><body></body></html>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)

    code = '<html><head><title>  \t   </title></head><body></body></html>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
})
