const HTMLHint = require('../../dist/htmlhint.js').HTMLHint
const ruleId = 'meta-charset-require'

describe('Rule: meta-charset-require', () => {
  it('should not report an error when a valid meta charset is present', () => {
    const code = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when meta charset is missing', () => {
    const code = `<!DOCTYPE html><html><head></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta charset=""> must be present in <head> tag.'
    )
  })

  it('should report an error when meta charset value is blank', () => {
    const code = `<!DOCTYPE html><html><head><meta charset=""></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta charset=""> value must not be empty.'
    )
  })

  it('should report an error when meta charset value is only whitespace', () => {
    const code = `<!DOCTYPE html><html><head><meta charset=" "></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta charset=""> value must not be empty.'
    )
  })

  it('should report an error when meta charset is missing and only other meta tags are present', () => {
    const code = `<!DOCTYPE html><html><head><meta name="description" content="desc"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta charset=""> must be present in <head> tag.'
    )
  })
})
