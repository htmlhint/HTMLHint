const HTMLHint = require('../../dist/htmlhint.js').HTMLHint
const ruleId = 'meta-description-require'

describe('Rule: meta-description-require', () => {
  it('should not report an error when a valid meta description is present', () => {
    const code = `<!DOCTYPE html><html><head><meta name="description" content="A description."></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when meta description is missing', () => {
    const code = `<!DOCTYPE html><html><head></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="description"> must be present in <head> tag.'
    )
  })

  it('should report an error when meta description content is blank', () => {
    const code = `<!DOCTYPE html><html><head><meta name="description" content=" "></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="description"> content attribute must not be empty.'
    )
  })

  it('should not report an error for other meta tags', () => {
    const code = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="description"> must be present in <head> tag.'
    )
  })
})
