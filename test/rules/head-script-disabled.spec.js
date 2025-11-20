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

  describe('allow-non-blocking option', () => {
    const allowNonBlockingOptions = {}
    allowNonBlockingOptions[ruleId] = 'allow-non-blocking'

    it('Module script in head should not result in an error', () => {
      const code = '<head><script type="module" src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Deferred script in head should not result in an error', () => {
      const code = '<head><script defer src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Deferred script with type in head should not result in an error', () => {
      const code =
        '<head><script type="text/javascript" defer src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Async script in head should not result in an error', () => {
      const code = '<head><script async src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Async script with type in head should not result in an error', () => {
      const code =
        '<head><script type="text/javascript" async src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Script with both async and defer should not result in an error', () => {
      const code = '<head><script async defer src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Module script with inline content should not result in an error', () => {
      const code =
        '<head><script type="module">import { test } from "./test.js";</script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Regular script in head should still result in an error', () => {
      const code = '<head><script src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].message).toBe(
        'The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.'
      )
    })

    it('Regular script with type in head should still result in an error', () => {
      const code =
        '<head><script type="text/javascript" src="test.js"></script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].message).toBe(
        'The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.'
      )
    })

    it('Inline script without defer, async, or module should result in an error', () => {
      const code = '<head><script>console.log("test");</script></head>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].message).toBe(
        'The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.'
      )
    })

    it('Template scripts should still not result in an error', () => {
      let code =
        '<head><script type="text/template"><img src="test.png" /></script></head>'
      let messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)

      code =
        '<head><script type="text/ng-template"><img src="test.png" /></script></head>'
      messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Scripts in body should still not result in an error', () => {
      const code = '<head></head><body><script src="test.js"></script></body>'
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(0)
    })

    it('Multiple scripts with mixed types should handle correctly', () => {
      const code = `
        <head>
          <script type="module" src="module.js"></script>
          <script defer src="deferred.js"></script>
          <script async src="async.js"></script>
          <script src="blocking.js"></script>
        </head>
      `
      const messages = HTMLHint.verify(code, allowNonBlockingOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].message).toBe(
        'The <script> tag cannot be used in a <head> tag unless it has type="module", defer, or async attribute.'
      )
    })
  })
})
