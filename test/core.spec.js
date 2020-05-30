const expect = require('expect.js')

const HTMLHint = require('../dist/htmlhint.js').HTMLHint

describe('Core', () => {
  it('Set false to rule no effected should result in an error', () => {
    const code = '<img src="test.gif" />'
    const messages = HTMLHint.verify(code, { 'alt-require': false })
    expect(messages.length).to.be(0)
  })

  it('Not load default ruleset when use undefined ruleset should result in an error', () => {
    const code =
      '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>'
    const messages = HTMLHint.verify(code)
    expect(messages.length).to.be(9)
  })

  it('Not load default ruleset when use empty ruleset should result in an error', () => {
    const code =
      '<P ATTR=\'1\' id="a">><div id="a"><img src="" a="1" a="2"/></div>'
    const messages = HTMLHint.verify(code, {})
    expect(messages.length).to.be(9)
  })

  it('Inline ruleset not worked should result in an error', () => {
    // With value = 'true'
    let code = '<!-- htmlhint alt-require:true -->\r\n<img src="test.gif" />'
    let messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be('alt-require')
    expect(messages[0].line).to.be(2)
    expect(messages[0].col).to.be(5)

    // Without value
    code = '<!-- htmlhint alt-require -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).to.be(1)
    expect(messages[0].rule.id).to.be('alt-require')
    expect(messages[0].line).to.be(2)
    expect(messages[0].col).to.be(5)

    // With value = 'false'
    code = '<!-- htmlhint alt-require:false -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': true,
    })
    expect(messages.length).to.be(0)

    // Without rule
    code = '<!-- htmlhint -->\r\n<img src="test.gif" />'
    messages = HTMLHint.verify(code, {
      'alt-require': false,
    })

    expect(messages.length).to.be(0)
  })

  it('Show formated result should not result in an error', () => {
    const code =
      'tttttttttttttttttttttttttttttttttttt<div>中文<img src="test.gif" />tttttttttttttttttttttttttttttttttttttttttttttt'
    const messages = HTMLHint.verify(code, {
      'tag-pair': true,
      'alt-require': true,
    })
    let arrLogs = HTMLHint.format(messages)
    expect(arrLogs.length).to.be(4)

    arrLogs = HTMLHint.format(messages, {
      colors: true,
      indent: 4,
    })
    const log = arrLogs[0]
    expect(/\[37m/.test(log)).to.be(true)
    expect(/ {4}L1 /.test(log)).to.be(true)
    expect(/|\.\.\./.test(log)).to.be(true)
    expect(/t\.\.\./.test(log)).to.be(true)
  })
})
