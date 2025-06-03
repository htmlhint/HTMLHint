const HTMLHint = require('../../dist/htmlhint.js').HTMLHint
const ruleId = 'meta-viewport-require'

describe('Rule: meta-viewport-require', () => {
  it('should not report an error when a valid meta viewport is present', () => {
    const code = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when meta viewport is missing', () => {
    const code = `<!DOCTYPE html><html><head></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="viewport"> must be present in <head> tag.'
    )
  })

  it('should report an error when meta viewport content is blank', () => {
    const code = `<!DOCTYPE html><html><head><meta name="viewport" content=" "></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="viewport"> content attribute must not be empty.'
    )
  })

  it('should report an error when meta viewport is missing and only other meta tags are present', () => {
    const code = `<!DOCTYPE html><html><head><meta name="description" content="desc"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<meta name="viewport"> must be present in <head> tag.'
    )
  })
})
