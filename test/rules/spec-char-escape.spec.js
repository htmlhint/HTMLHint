const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

// cspell:ignore copyx notit notin
const ruleId = 'spec-char-escape'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Special characters: <> should result in an error', () => {
    const code = '<p>aaa>bbb< ccc</p>ddd\r\neee<'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(3)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(11)
    expect(messages[2].rule.id).toBe(ruleId)
    expect(messages[2].line).toBe(2)
    expect(messages[2].col).toBe(4)
  })

  it('Special characters: normal & should not result in an error', () => {
    const code = '<p>Steinway & Sons Q&A</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Normal text should not result in an error', () => {
    const code = '<p>abc</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Properly formed HTML entities should not result in an error', () => {
    const code = '<p>Steinway &amp; &gt; Sons Q&amp;A </p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it.each(['&copy', '&copyx', '&notit;', '&#169', '&#xA9'])(
    'Reports the missing semicolon in %s',
    (reference) => {
      const messages = HTMLHint.verify(`<p>\n  ${reference}</p>`, ruleOptions)

      expect(messages).toHaveLength(1)
      expect(messages[0]).toMatchObject({
        rule: { id: ruleId },
        line: 2,
        col: 3,
        message: 'Character references must end with a semicolon.',
      })
    }
  )

  it.each(['&a', '&copy;', '&notin;', '&#169;', '&#xA9;'])(
    'Leaves %s alone when it has no missing semicolon',
    (text) => {
      expect(HTMLHint.verify(`<p>${text}</p>`, ruleOptions)).toHaveLength(0)
    }
  )

  it('Ignores ampersands in script text and attributes', () => {
    const code =
      '<script>const name = "&copy"</script><p title="&copy">Text</p>'
    expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(0)
  })

  it('Checks HTML inside AngularJS script templates', () => {
    const code = '<script type="text/ng-template"><p>&copy</p></script>'
    expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(1)
  })

  it.each(['SCRIPT', 'Style', 'iframe', 'xmp'])(
    'Reports the next text reference after leaving %s',
    (tagName) => {
      const code = `<${tagName}>&copy</${tagName}>\n<p>&copy</p>`
      const messages = HTMLHint.verify(code, ruleOptions)

      expect(messages).toHaveLength(1)
      expect(messages[0]).toMatchObject({ line: 2, col: 4 })
    }
  )
})
