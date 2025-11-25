const HTMLHint = require('../dist/htmlhint.js').HTMLHint

describe('Core', () => {
  it('Set false to rule no effected should result in an error', () => {
    const code = '<img src="test.gif" />'
    const messages = HTMLHint.verify(code, { 'alt-require': false })
    expect(messages.length).toBe(0)
  })

  it('Not load default ruleset when use undefined ruleset should result in an error', () => {
    const code =
      '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>'
    const messages = HTMLHint.verify(code)
    expect(messages.length).toBe(9)
  })

  it('Not load default ruleset when use empty ruleset should result in an error', () => {
    const code =
      '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>'
    const messages = HTMLHint.verify(code, {})
    expect(messages.length).toBe(9)
  })

  it('Inline ruleset not worked should result in an error', () => {
    // With value = 'true'
    let code = '<!-- htmlhint alt-require:true -->\r\n<img src="test.gif" />'
    let messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe('alt-require')
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(5)

    // Without value
    code = '<!-- htmlhint alt-require -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe('alt-require')
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(5)

    // With value = 'false'
    code = '<!-- htmlhint alt-require:false -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': true,
    })
    expect(messages.length).toBe(0)

    // Without rule
    code = '<!-- htmlhint -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).toBe(0)
  })

  it('Show formatted result should not result in an error', () => {
    const code =
      'tttttttttttttttttttttttttttttttttttt<div>中文<img src="test.gif" />tttttttttttttttttttttttttttttttttttttttttttttt'
    const messages = HTMLHint.verify(code, {
      'tag-pair': true,
      'alt-require': true,
    })
    let arrLogs = HTMLHint.format(messages)
    expect(arrLogs.length).toBe(4)

    arrLogs = HTMLHint.format(messages, {
      colors: true,
      indent: 4,
    })
    const log = arrLogs[0]
    expect(/\[37m/.test(log)).toBe(true)
    expect(/ {4}L1 /.test(log)).toBe(true)
    expect(/|\.\.\./.test(log)).toBe(true)
    expect(/t\.\.\./.test(log)).toBe(true)
  })

  describe('Disable/enable comments', () => {
    it('htmlhint-disable should disable all rules for following lines', () => {
      const code = `<!-- htmlhint-disable -->
<div class="foo">Lorem</div>
<div class="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      expect(messages.length).toBe(0)
    })

    it('htmlhint-disable-next-line should disable all rules for next line', () => {
      const code = `<!-- htmlhint-disable-next-line -->
<div CLASS="foo">Lorem</div>
<div class="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      // Line 2 should be disabled (no errors), line 3 should have errors
      expect(messages.length).toBe(0)
    })

    it('htmlhint-disable with specific rule should disable only that rule', () => {
      const code = `<!-- htmlhint-disable attr-lowercase -->
<div CLASS="foo">Lorem</div>
<div CLASS="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
        'tag-pair': true,
      })
      // attr-lowercase should be disabled, but tag-pair should still work
      expect(messages.length).toBe(0)
    })

    it('htmlhint-disable-next-line with specific rule should disable only that rule for next line', () => {
      const code = `<!-- htmlhint-disable-next-line attr-lowercase -->
<div CLASS="foo">Lorem</div>
<div CLASS="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      // Line 2 should not have errors (disabled), line 3 should have errors
      expect(messages.length).toBe(1)
      expect(messages[0].line).toBe(3)
      expect(messages[0].rule.id).toBe('attr-lowercase')
    })

    it('htmlhint-enable should re-enable rules', () => {
      const code = `<!-- htmlhint-disable -->
<div CLASS="foo1">Lorem</div>
<div CLASS="foo2">Lorem</div>
<!-- htmlhint-enable -->
<div CLASS="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      // Lines 2-3 should be disabled, line 5 should have errors
      expect(messages.length).toBe(1)
      expect(messages[0].line).toBe(5)
      expect(messages[0].rule.id).toBe('attr-lowercase')
    })

    it('htmlhint-disable should work with multiple rules', () => {
      const code = `<!-- htmlhint-disable attr-lowercase tagname-lowercase -->
<DIV CLASS="foo">Lorem</DIV>
<DIV CLASS="bar">Ipsum</DIV>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
        'tagname-lowercase': true,
      })
      expect(messages.length).toBe(0)
    })

    it('htmlhint-disable-next-line should work with multiple rules', () => {
      const code = `<!-- htmlhint-disable-next-line attr-lowercase tagname-lowercase -->
<DIV CLASS="foo">Lorem</DIV>
<DIV CLASS="bar">Ipsum</DIV>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
        'tagname-lowercase': true,
      })
      // Line 2 should be disabled, line 3 should have errors
      // Filter to only check the rules we care about
      const relevantMessages = messages.filter(
        (m) =>
          m.rule.id === 'attr-lowercase' || m.rule.id === 'tagname-lowercase'
      )
      // Line 2 should have no errors (disabled)
      const line2Messages = relevantMessages.filter((m) => m.line === 2)
      expect(line2Messages.length).toBe(0)
      // Line 3 should have errors
      const line3Messages = relevantMessages.filter((m) => m.line === 3)
      expect(line3Messages.length).toBeGreaterThan(0)
      expect(line3Messages.some((m) => m.rule.id === 'attr-lowercase')).toBe(
        true
      )
      expect(line3Messages.some((m) => m.rule.id === 'tagname-lowercase')).toBe(
        true
      )
    })

    it('should still report errors when rules are not disabled', () => {
      const code = `<div CLASS="foo">Lorem</div>
<div class="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      // Line 1 should have an error
      expect(messages.length).toBe(1)
      expect(messages[0].line).toBe(1)
      expect(messages[0].rule.id).toBe('attr-lowercase')
    })

    it('should handle disable comments on same line as code', () => {
      const code = `<div CLASS="foo">Lorem</div> <!-- htmlhint-disable-next-line attr-lowercase -->
<div CLASS="bar">Ipsum</div>`
      const messages = HTMLHint.verify(code, {
        'attr-lowercase': true,
      })
      // Line 1 should have error, line 2 should be disabled
      expect(messages.length).toBe(1)
      expect(messages[0].line).toBe(1)
      expect(messages[0].rule.id).toBe('attr-lowercase')
    })
  })
})
