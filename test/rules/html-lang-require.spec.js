const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruldId = 'html-lang-require'
const ruleOptions = {}

ruleOptions[ruldId] = true

describe(`Rules: ${ruldId}`, () => {
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
  it('HTML tag have an non emtpy and valid lang attribute should not result in an error', () => {
    const code = '<html lang="en-EN"></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).to.be(0)
  })
})
