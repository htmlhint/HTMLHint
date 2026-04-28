const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'input-requires-label'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  describe('Successful cases', () => {
    it('Input tag with a matching label before should result in no error', () => {
      const code =
        '<label for="some-id"/><input id="some-id" type="password" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Input tag with a matching label after should result in no error', () => {
      const code =
        '<input id="some-id" type="password" /> <label for="some-id"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Hidden input tag with no matching label should result in no error', () => {
      const code = '<input id="some-id" type="hidden" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Hidden input tag with matching label before should result in no error', () => {
      const code = '<label for="some-id"/><input id="some-id" type="hidden" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Hidden input tag with matching label after should result in no error', () => {
      const code = '<input id="some-id" type="hidden" /><label for="some-id"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Input nested inside label with text before should result in no error', () => {
      const code = '<label>Password <input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Input nested inside label with text after should result in no error', () => {
      const code = '<label><input type="email" /> Email</label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Input nested inside label with text in child element should result in no error', () => {
      const code = '<label><span>Email</span> <input type="email" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Multiple inputs nested inside label with text should result in no error', () => {
      const code =
        '<label>Credentials <input type="text" /><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Hidden input nested inside label should result in no error', () => {
      const code = '<label><input type="hidden" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })
  })

  describe('Error cases', () => {
    it('Input tag with no matching label should result in an error', () => {
      const code = '<input type="password">'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].line).toBe(1)
      expect(messages[0].col).toBe(7)
      expect(messages[0].type).toBe('warning')
    })

    it("Input tag with label that doesn't match id should result in error", () => {
      const code =
        '<input id="some-id" type="password" /> <label for="some-other-id"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].line).toBe(1)
      expect(messages[0].col).toBe(7)
      expect(messages[0].type).toBe('warning')
    })

    it('Input tag with blank label:for should result in error', () => {
      const code = '<input id="some-id" type="password" /> <label for=""/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].line).toBe(1)
      expect(messages[0].col).toBe(7)
      expect(messages[0].type).toBe('warning')
    })

    it('Input tag with no id should result in error', () => {
      const code = '<input type="password" /> <label for="something"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].line).toBe(1)
      expect(messages[0].col).toBe(7)
      expect(messages[0].type).toBe('warning')
    })

    it('Input nested in label with for pointing elsewhere should result in error', () => {
      const code = '<label for="other-id"><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Input after a closed label should still result in error', () => {
      const code = '<label></label><input type="password" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Input after self-closing label should still result in error', () => {
      const code = '<label /><input type="password" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Unbalanced closing label tags should not break depth tracking', () => {
      const code = '</label></label><input type="password" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Input nested inside label with no text should result in error', () => {
      const code = '<label><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Input nested inside label with whitespace only should result in error', () => {
      const code = '<label>   <input type="text" />   </label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
      expect(messages[0].rule.id).toBe(ruleId)
      expect(messages[0].type).toBe('warning')
    })

    it('Multiple inputs nested inside label with no text should result in errors', () => {
      const code =
        '<label><input type="text" /><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(2)
    })

    it('Valid label followed by empty label should only warn for the empty one', () => {
      const code =
        '<label>Username <input type="text" /></label><label><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
    })

    it('Nested labels: outer with text should not false-warn outer input', () => {
      const code =
        '<label>Outer <label><input type="checkbox" /></label><input type="text" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(1)
    })
  })
})
