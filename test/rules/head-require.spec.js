const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'head-script-disabled'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('External script in head should result in an error', () => {
    const code = '<head><script src="test.js"></script></head>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    expect(messages[0].type).toBe('warning')
  })

  it('Internal Script in head should result in an error', () => {
    let code = '<head><script>alert(1);</script></head>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(7)
    code = '<head><script type="text/javascript">console.log(1)</script></head>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    code =
      '<head><script type="application/javascript">console.log(2)</script></head>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
  })

  it('Script in body not result in an error', () => {
    const code = '<head></head><body><script src="test.js"></script></body>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Template script in head not result in an error', () => {
    let code =
      '<head><script type="text/template"><img src="test.png" /></script></head>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
    code =
      '<head><script type="text/ng-template"><img src="test.png" /></script></head>'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('No head not result in an error', () => {
    const code = '<html><script src="test.js"></script></html>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
