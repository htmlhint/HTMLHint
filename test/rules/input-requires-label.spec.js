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

    it('Input tag nested inside label tag should result in no error', () => {
      const code = '<label><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    it('Input nested in label whose for points elsewhere should result in no error', () => {
      const code = '<label for="other-id"><input type="password" /></label>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).toBe(0)
    })

    // Multiple inputs inside one label are all accepted. The HTML spec
    // associates only the first labelable descendant with the label, but
    // this rule is about "every input has a label nearby" for a11y, not
    // strict spec conformance.
    it('Multiple inputs nested inside one label should result in no error', () => {
      const code =
        '<label><input type="password" /><input type="text" /></label>'
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
  })
})
