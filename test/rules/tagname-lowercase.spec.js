const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'tagname-lowercase'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('The tag name not all lower case should result in an error', () => {
    const code = '<A href=""></A><SPAN>aab</spaN>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(4)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(12)
    expect(messages[2].rule.id).toBe(ruleId)
    expect(messages[2].line).toBe(1)
    expect(messages[2].col).toBe(16)
    expect(messages[3].rule.id).toBe(ruleId)
    expect(messages[3].line).toBe(1)
    expect(messages[3].col).toBe(25)
  })

  it('All lower case tag name should not result in an error', () => {
    const code = '<a href=""></a><span>test</span>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Known SVG elements should be ignored with no config', () => {
    const code =
      '<svg><animateMotion /><linearGradient /><foreignObject /><textPath /></svg>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })

  it('Known SVG elements should be ignored with a config override', () => {
    const code = '<svg><feGaussianBlur /><radialGradient /></svg>'
    ruleOptions[ruleId] = ['customTag']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
    ruleOptions[ruleId] = true
  })

  it('Set to array list should not result in an error', () => {
    const code = '<CustomComponent /><AnotherCamelCase />'
    ruleOptions[ruleId] = ['CustomComponent', 'AnotherCamelCase']
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
    ruleOptions[ruleId] = true
  })
})
