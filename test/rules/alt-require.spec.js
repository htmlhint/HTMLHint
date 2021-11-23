const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'alt-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Img tag have empty alt attribute should not result in an error', () => {
    const code = '<img width="200" height="300" alt="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Img tag have non empty alt attribute should not result in an error', () => {
    const code = '<img width="200" height="300" alt="test">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Img tag have not alt attribute should result in an error', () => {
    const code = '<img width="200" height="300">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[0].type).to.be('warning')
  })

  /* A tag can have shape and coords attributes and not have alt attribute */
  it('A tag have not alt attribute should not result in an error', () => {
    const code = '<a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Area tag have not href and alt attributes should not result in an error', () => {
    const code = '<area>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Area[href] tag have not alt attribute should result in an error', () => {
    const code = '<area href="#test">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(6)
    expect(messages[0].type).to.be('warning')
  })

  it('Area[href] tag have empty alt attribute should result in an error', () => {
    const code = '<area href="#test" alt="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(6)
    expect(messages[0].type).to.be('warning')
  })

  it('Area[href] tag have non empty alt attribute should not result in an error', () => {
    const code = '<area href="#test" alt="test">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Input tag have not type and alt attributes should not result in an error', () => {
    const code = '<input>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Input[type="text"] tag have not alt attribute should not result in an error', () => {
    const code = '<input type="text">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })

  it('Input[type="image"] tag have not alt attribute should result in an error', () => {
    const code = '<input type="image">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('warning')
  })

  it('Input[type="image"] tag have empty alt attribute should result in an error', () => {
    const code = '<input type="image" alt="">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be(ruleId)
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(7)
    expect(messages[0].type).to.be('warning')
  })

  it('Input[type="image"] tag have non empty alt attribute should not result in an error', () => {
    const code = '<input type="image" alt="test">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
