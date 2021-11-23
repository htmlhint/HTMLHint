const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'html-lang-require'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('All the rest(non HTML) tags should not result in an error', () => {
    const code = '<html lang="en-EN"><body><p></p></body></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
  it('HTML tag have no a lang attribute should result in an error', () => {
    const code = '<html></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
  it('HTML tag have an empty lang attribute should result in an error', () => {
    const code = '<html lang=""></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
  it('HTML tag have an invalid lang attribute should result in an error', () => {
    const code = '<html lang="-"></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(1)
  })
  it('HTML tag have an non empty and valid(en-EN) lang attribute should not result in an error', () => {
    const code = '<html lang="en-EN"></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
  it('HTML tag have an non empty and valid(en) lang attribute should not result in an error', () => {
    const code = '<html lang="en"></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
