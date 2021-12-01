const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-lowercase'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Not all lowercase attr should result in an error', () => {
    let code = '<p TEST="abc">'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(3)

    code = '<p id=""\r\n TEST1="abc" TEST2="abc">'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(1)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(2)
    expect(messages[1].col).toBe(13)
  })

  it('Lowercase attr should not result in an error', () => {
    const code = '<p test="abc">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Set is false should not result in an error', () => {
    const code = '<p TEST="abc">'
    ruleOptions[ruleId] = false
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Set to array list should not result in an error', () => {
    const code = '<p testBox="abc" tttAAA="ccc">'
    ruleOptions[ruleId] = ['testBox', 'tttAAA']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Set to array list with RegExp should not result in an error', () => {
    const code = '<p testBox="abc" bind:tapTop="ccc">'
    ruleOptions[ruleId] = ['testBox', /bind:.*/]
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Set to array list with regex string should not result in an error', () => {
    const code = '<p testBox="abc" [ngFor]="ccc">'
    ruleOptions[ruleId] = ['testBox', '/\\[.*\\]/']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Known SVG properties should be ignored with no config', () => {
    const code = '<svg width="200" height="200" viewBox="0 0 200 200" />'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Known SVG properties should be ignored with a config override', () => {
    const code = '<svg width="200" height="200" viewBox="0 0 200 200" />'
    ruleOptions[ruleId] = ['testBox']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Double ignored SVG properties should not cause issues', () => {
    const code = '<svg width="200" height="200" viewBox="0 0 200 200" />'
    ruleOptions[ruleId] = ['viewBox']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
