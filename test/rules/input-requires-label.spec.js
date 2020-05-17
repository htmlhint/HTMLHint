const expect = require('expect.js')

const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'input-requires-label'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, function () {
  describe('Successful cases', function () {
    it('Input tag with a matching label before should result in no error', function () {
      const code =
        '<label for="some-id"/><input id="some-id" type="password" />'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(0)
    })

    it('Input tag with a matching label after should result in no error', function () {
      const code =
        '<input id="some-id" type="password" /> <label for="some-id"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(0)
    })
  })

  describe('Error cases', function () {
    it('Input tag with no matching label should result in an error', function () {
      const code = '<input type="password">'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruleId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(7)
      expect(messages[0].type).to.be('warning')
    })

    it("Input tag with label that doesn't match id should result in error", function () {
      const code =
        '<input id="some-id" type="password" /> <label for="some-other-id"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruleId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(7)
      expect(messages[0].type).to.be('warning')
    })

    it('Input tag with blank label:for should result in error', function () {
      const code = '<input id="some-id" type="password" /> <label for=""/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruleId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(7)
      expect(messages[0].type).to.be('warning')
    })

    it('Input tag with no id should result in error', function () {
      const code = '<input type="password" /> <label for="something"/>'
      const messages = HTMLHint.verify(code, ruleOptions)
      expect(messages.length).to.be(1)
      expect(messages[0].rule.id).to.be(ruleId)
      expect(messages[0].line).to.be(1)
      expect(messages[0].col).to.be(7)
      expect(messages[0].type).to.be('warning')
    })
  })
})
