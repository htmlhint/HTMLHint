const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'tag-no-obsolete'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Obsolete HTML5 tags should result in an error', () => {
    const code =
      '<center>Centered text</center><font color="red">Red text</font><marquee>Scrolling text</marquee>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(6) // 3 opening tags + 3 closing tags
    messages.forEach((msg) => expect(msg.rule.id).toBe(ruleId))
  })

  it('Non-obsolete HTML5 tags should not result in an error', () => {
    const code = '<div>Content</div><span>Text</span><p>Paragraph</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Mixed case obsolete tags should still be detected', () => {
    const code = '<CENTER>Centered</CENTER><Font>Styled</Font>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(4) // 2 opening tags + 2 closing tags
    messages.forEach((msg) => expect(msg.rule.id).toBe(ruleId))
  })

  it('Self-closing obsolete tags should be detected', () => {
    const code = '<br><hr><img src="test.jpg"><spacer>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1) // Only spacer is obsolete
    messages.forEach((msg) => expect(msg.rule.id).toBe(ruleId))
  })
})
