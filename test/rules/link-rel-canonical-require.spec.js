const HTMLHint = require('../../dist/htmlhint.js').HTMLHint
const ruleId = 'link-rel-canonical-require'

describe('Rule: link-rel-canonical-require', () => {
  it('should not report an error when a valid canonical link is present', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href="https://example.com/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link has uppercase rel attribute', () => {
    const code = `<!DOCTYPE html><html><head><link rel="CANONICAL" href="https://example.com/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link has mixed case rel attribute', () => {
    const code = `<!DOCTYPE html><html><head><link rel="Canonical" href="https://example.com/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when canonical link is missing', () => {
    const code = `<!DOCTYPE html><html><head></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<link rel="canonical"> must be present in <head> tag.'
    )
  })

  it('should report an error when canonical link href is blank', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href=""></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<link rel="canonical"> href attribute must not be empty.'
    )
  })

  it('should report an error when canonical link href is only whitespace', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href=" "></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<link rel="canonical"> href attribute must not be empty.'
    )
  })

  it('should report an error when canonical link href is missing', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<link rel="canonical"> href attribute must not be empty.'
    )
  })

  it('should not report an error for other link tags', () => {
    const code = `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"><link rel="canonical" href="https://example.com/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should report an error when only other link tags are present', () => {
    const code = `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"><link rel="icon" href="favicon.ico"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      '<link rel="canonical"> must be present in <head> tag.'
    )
  })

  it('should not report an error when canonical link is present with other meta tags', () => {
    const code = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="description" content="A description"><link rel="canonical" href="https://example.com/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link has relative URL', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href="/dresses/green-dresses"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link has query parameters', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href="https://example.com/dresses/green-dresses?color=green&size=m"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link has fragment', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href="https://example.com/dresses/green-dresses#section1"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })

  it('should not report an error when canonical link is self-referencing', () => {
    const code = `<!DOCTYPE html><html><head><link rel="canonical" href="https://example.com/current-page"></head><body></body></html>`
    const messages = HTMLHint.verify(code, { [ruleId]: true })
    expect(messages.length).toBe(0)
  })
})
