const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'src-not-empty'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Src be empty should result in an error', () => {
    const code =
      '<img src="" /><img src /><script src=""></script><script src></script><link href="" type="text/css" /><link href type="text/css" /><embed src=""><embed src><bgsound src="" /><bgsound src /><iframe src=""><iframe src><object data=""><object data>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(14)
  })

  it('Src be non-empty should not result in an error', () => {
    const code =
      '<img src="test.png" /><script src="test.js"></script><link href="test.css" type="text/css" /><embed src="test.swf"><bgsound src="test.mid" /><iframe src="test.html"><object data="test.swf">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Src be not set value should not result in an error', () => {
    const code =
      '<img width="200" /><script></script><link type="text/css" /><embed width="200"><bgsound /><iframe width="200"><object width="200">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
