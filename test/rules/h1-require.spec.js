const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'h1-require'

describe('Rule: h1-require', () => {
  it('should not report an error when <h1> is present in <body>', () => {
    const code = '<html><body><h1>Title</h1></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when <h1> is missing in <body>', () => {
    const code = '<html><body><p>No heading</p></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe('<h1> must be present in <body> tag.')
  })

  it('should report an error when <h1> is empty in <body>', () => {
    const code = '<html><body><h1></h1></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe('<h1> tag must not be empty.')
  })

  it('should report an error when <h1> only contains whitespace', () => {
    const code = '<html><body><h1>   \t   </h1></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe('<h1> tag must not be empty.')
  })
})
