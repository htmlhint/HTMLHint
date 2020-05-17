var expect = require('expect.js')

var HTMLHint = require('../../dist/htmlhint.js').HTMLHint

var ruldId = 'id-class-value',
  ruleOptionsUnderline = {},
  ruleOptionsDash = {},
  ruleOptionsHump = {},
  ruleOptionsReg = {}

ruleOptionsUnderline[ruldId] = 'underline'
ruleOptionsDash[ruldId] = 'dash'
ruleOptionsHump[ruldId] = 'hump'
ruleOptionsReg[ruldId] = {
  regId: /^_[a-z\d]+(-[a-z\d]+)*$/,
  message: 'Id and class value must meet regexp',
}

describe('Rules: ' + ruldId, function () {
  it('Id and class value be not lower case and split by underline should result in an error', function () {
    var code = '<div id="aaaBBB" class="ccc-ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsUnderline)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[0].type).to.be('warning')
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
    expect(messages[1].type).to.be('warning')
  })

  it('Id and class value be lower case and split by underline should not result in an error', function () {
    var code = '<div id="aaa_bbb" class="ccc_ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsUnderline)
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not lower case and split by dash should result in an error', function () {
    var code = '<div id="aaaBBB" class="ccc_ddd">'
    var messages = HTMLHint.verify(code, { 'id-class-value': 'dash' })
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
  })

  it('Id and class value be lower case and split by dash should not result in an error', function () {
    var code = '<div id="aaa-bbb" class="ccc-ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsDash)
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not meet hump style should result in an error', function () {
    var code = '<div id="aaa_bb" class="ccc-ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsHump)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(17)
  })

  it('Id and class value be meet hump style should not result in an error', function () {
    var code = '<div id="aaaBbb" class="cccDdd">'
    var messages = HTMLHint.verify(code, ruleOptionsHump)
    expect(messages.length).to.be(0)
  })

  it('Id and class value be not meet regexp should result in an error', function () {
    var code = '<div id="aa-bb" class="ccc-ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsReg)
    expect(messages.length).to.be(2)
    expect(messages[0].rule.id).to.be('id-class-value')
    expect(messages[0].line).to.be(1)
    expect(messages[0].col).to.be(5)
    expect(messages[1].rule.id).to.be('id-class-value')
    expect(messages[1].line).to.be(1)
    expect(messages[1].col).to.be(16)
  })

  it('Id and class value be meet regexp should not result in an error', function () {
    var code = '<div id="_aaa-bb" class="_ccc-ddd">'
    var messages = HTMLHint.verify(code, ruleOptionsReg)
    expect(messages.length).to.be(0)
  })
})
