const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'id-class-value'
const ruleOptionsUnderline = {}
const ruleOptionsDash = {}
const ruleOptionsHump = {}
const ruleOptionsReg = {}

ruleOptionsUnderline[ruleId] = 'underline'
ruleOptionsDash[ruleId] = 'dash'
ruleOptionsHump[ruleId] = 'hump'
ruleOptionsReg[ruleId] = {
  regId: /^_[a-z\d]+(-[a-z\d]+)*$/,
  message: 'Id and class value must meet regexp',
}

describe(`Rules: ${ruleId}`, () => {
  it('Id and class value be not lower case and split by underline should result in an error', () => {
    const code = '<div id="aaaBBB" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsUnderline)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe('id-class-value')
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[0].type).toBe('warning')
    expect(messages[1].rule.id).toBe('id-class-value')
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(17)
    expect(messages[1].type).toBe('warning')
  })

  it('Id and class value be lower case and split by underline should not result in an error', () => {
    const code = '<div id="aaa_bbb" class="ccc_ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsUnderline)
    expect(messages.length).toBe(0)
  })

  it('Id and class value be not lower case and split by dash should result in an error', () => {
    const code = '<div id="aaaBBB" class="ccc_ddd">'
    const messages = HTMLHint.verify(code, { 'id-class-value': 'dash' })
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe('id-class-value')
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[1].rule.id).toBe('id-class-value')
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(17)
  })

  it('Id and class value be lower case and split by dash should not result in an error', () => {
    const code = '<div id="aaa-bbb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsDash)
    expect(messages.length).toBe(0)
  })

  it('Id and class value be not meet hump style should result in an error', () => {
    const code = '<div id="aaa_bb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsHump)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe('id-class-value')
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[1].rule.id).toBe('id-class-value')
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(17)
  })

  it('Id and class value be meet hump style should not result in an error', () => {
    const code = '<div id="aaaBbb" class="cccDdd">'
    const messages = HTMLHint.verify(code, ruleOptionsHump)
    expect(messages.length).toBe(0)
  })

  it('Id and class value be not meet regexp should result in an error', () => {
    const code = '<div id="aa-bb" class="ccc-ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsReg)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe('id-class-value')
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[1].rule.id).toBe('id-class-value')
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(16)
  })

  it('Id and class value be meet regexp should not result in an error', () => {
    const code = '<div id="_aaa-bb" class="_ccc-ddd">'
    const messages = HTMLHint.verify(code, ruleOptionsReg)
    expect(messages.length).toBe(0)
  })
})
