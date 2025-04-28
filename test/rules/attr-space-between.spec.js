const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-space-between'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Attribute tags without spaces must result in an error', () => {
    const code = '<div id="foo"class="bar"></div>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe(
      'Attribute "class" must be separated with a space'
    )
  })

  // it('Attribute unsorted tags that are unrecognizable should not throw error', () => {
  //   const code = '<div img="image" meta="meta" font="font"></div>'

  //   const messages = HTMLHint.verify(code, ruleOptions)

  //   expect(messages.length).toBe(0)
  // })

  // it('Attribute unsorted of tags of various types should throw error', () => {
  //   const code = '<div type="type" img="image" id="id" font="font"></div>'

  //   const messages = HTMLHint.verify(code, ruleOptions)

  //   expect(messages.length).toBe(1)
  //   expect(messages[0].rule.id).toBe(ruleId)
  //   expect(messages[0].message).toContain('["type","img","id","font"]')
  // })
})
