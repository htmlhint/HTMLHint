const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'attr-no-protocol-relative-url'
const ruleOptions = { [ruleId]: true }

describe(`Rules: ${ruleId}`, () => {
  it('warns for the script and stylesheet examples from issue #348', () => {
    const code =
      '<script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n' +
      '<link rel="stylesheet" href="//use.fontawesome.com/releases/v5.8.2/css/all.css">'
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages).toHaveLength(2)
    expect(messages[0]).toMatchObject({
      type: 'warning',
      line: 1,
      col: 8,
      rule: { id: ruleId },
      raw: ' src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"',
      message:
        'The src attribute must use an explicit protocol instead of a protocol-relative URL.',
    })
    expect(messages[1]).toMatchObject({
      type: 'warning',
      line: 2,
      col: 23,
      rule: { id: ruleId },
    })
  })

  it.each(['src', 'SRC', 'sRc', 'href', 'HREF', 'hReF'])(
    'checks the %s attribute regardless of case',
    (name) => {
      const messages = HTMLHint.verify(
        `<a ${name}="//example.com"></a>`,
        ruleOptions
      )
      expect(messages).toHaveLength(1)
      expect(messages[0].rule.id).toBe(ruleId)
    }
  )

  it.each([' ', '\t', '\n', '\r\n', '\f', ' \t\n '])(
    'warns with leading whitespace %j',
    (whitespace) => {
      const code = `<img src="${whitespace}//example.com/photo.jpg">`
      expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(1)
    }
  )

  it.each([
    '<img src=//example.com/photo.jpg>',
    "<a href='//example.com'>Link</a>",
  ])('checks single-quoted and unquoted values: %s', (code) => {
    expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(1)
  })

  describe.each(['src', 'href'])('allowed %s values', (name) => {
    it.each([
      'https://example.com/app.js',
      'http://example.com/app.js',
      '/assets/app.js',
      './app.js',
      '../app.js',
      'app.js',
      '#content',
      '?page=2',
      'mailto:hello@example.com',
      'tel:123456789',
      'data:image/png;base64,AA',
      '/redirect?url=//example.com',
      ' https://example.com/app.js',
      '',
      '   ',
    ])('allows %j', (value) => {
      const code = `<a ${name}="${value}"></a>`
      expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(0)
    })
  })

  it('allows missing attributes and attributes without values', () => {
    expect(HTMLHint.verify('<img><a src href></a>', ruleOptions)).toHaveLength(
      0
    )
  })

  it('ignores other attributes and CSS URLs', () => {
    const code =
      '<img srcset="//example.com/a.jpg 1x, //example.com/b.jpg 2x" data-src="//example.com/a.jpg">' +
      '<form action="//example.com/submit"></form>' +
      '<div style="background: url(//example.com/a.jpg)"></div>' +
      '<style>body { background: url(//example.com/a.jpg); }</style>'
    expect(HTMLHint.verify(code, ruleOptions)).toHaveLength(0)
  })

  it('reports every offending attribute', () => {
    const code =
      '<img src="//example.com/a.jpg"><a href="//example.com">Link</a>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages).toHaveLength(2)
    expect(messages[0].raw).toBe(' src="//example.com/a.jpg"')
    expect(messages[1].raw).toBe(' href="//example.com"')
  })

  it('reports the location of an attribute on a multiline tag', () => {
    const code = '<img\n  alt="A mountain"\n  src="//example.com/photo.jpg">'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages).toHaveLength(1)
    expect(messages[0]).toMatchObject({
      line: 3,
      col: 1,
      rule: { id: ruleId },
    })
  })

  it('can be disabled explicitly', () => {
    const code = '<script src="//example.com/app.js"></script>'
    expect(HTMLHint.verify(code, { [ruleId]: false })).toHaveLength(0)
  })

  it('is disabled by default', () => {
    const code = '<script src="//example.com/app.js"></script>'
    const messages = HTMLHint.verify(code)
    expect(messages.some((message) => message.rule.id === ruleId)).toBe(false)
  })
})
