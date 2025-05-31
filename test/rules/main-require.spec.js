const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'main-require'

describe('Rule: main-require', () => {
  it('should not report an error when <main> is present in <body>', () => {
    const code = '<html><body><main>Content</main></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when <main> is missing in <body>', () => {
    const code = '<html><body><p>No main tag</p></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe('<main> must be present in <body> tag.')
  })

  it('should not report an error when <main> is empty but present', () => {
    const code = '<html><body><main></main></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should accept multiple <main> tags even though it is not best practice', () => {
    const code =
      '<html><body><main>First</main><main>Second</main></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when <body> has no <main> tag even with other content', () => {
    const code =
      '<html><body><header>Header</header><footer>Footer</footer></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].message).toBe('<main> must be present in <body> tag.')
  })

  it('should detect <main> tag with attributes', () => {
    const code =
      '<html><body><main id="content" class="main-content">Content</main></body></html>'
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })
})
