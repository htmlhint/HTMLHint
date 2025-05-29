const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-sorted'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('Unsorted defined attributes should throw error', () => {
    const code = '<div id="test" class="class" title="title"></div>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["id","class","title"]')
  })

  it('Sorted defined attributes should not throw error', () => {
    const code = '<div class="class" id="test" title="title"></div>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('Unsorted data-* attributes should throw error', () => {
    const code = '<main data-b="foo" data-a="bar"></main>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["data-a","data-b"]')
  })

  it('Sorted data-* attributes should not throw error', () => {
    const code = '<main data-a="bar" data-b="foo"></main>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('Unsorted lambda attributes should throw error', () => {
    const code = '<button disabled dir="rtl">Click</button>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["dir","disabled"]')
  })

  it('Sorted lambda attributes should not throw error', () => {
    const code = '<button dir="rtl" disabled>Click</button>'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('Unsorted defined and data-* attributes should throw error', () => {
    const code = '<img data-focal="80" src="IMG.jpg" />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["src","data-focal"]')
  })

  it('Sorted defined and data-* attributes should not throw error', () => {
    const code = '<img src="IMG.jpg" data-focal="80" />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('Unsorted defined and lambda attributes should throw error', () => {
    const code = '<input required value="foo" />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["value","required"]')
  })

  it('Sorted defined and lambda attributes should not throw error', () => {
    const code = '<input value="foo" required />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('Unsorted data-* and lambda attributes should throw error', () => {
    const code = '<section data-prop="abc" lang="en" />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toContain('["lang","data-prop"]')
  })

  it('Sorted data-* and lambda attributes should not throw error', () => {
    const code = '<section lang="en" data-prop="abc" />'

    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })
})
