const HTMLHint = require('../../src/core/core').HTMLHint

const ruleId = 'space-tab-mixed-disabled'
const ruleMixOptions = {}
const ruleSpaceOptions = {}
const ruleSpace4Options = {}
const ruleSpace5Options = {}
const ruleTabOptions = {}

ruleMixOptions[ruleId] = true
ruleSpaceOptions[ruleId] = 'space'
ruleSpace4Options[ruleId] = 'space4'
ruleSpace5Options[ruleId] = 'space5'
ruleTabOptions[ruleId] = 'tab'

describe(`Rules: ${ruleId}`, () => {
  it('Spaces and tabs mixed in front of line should result in an error', () => {
    // space before tab
    let code = '    	<a href="a">      bbb</a>'
    let messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
    // tab before space
    code = '		 <a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
    // multi line
    code = '<div>\r\n	 <a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(1)
  })

  it('Only spaces in front of line should not result in an error', () => {
    let code = '     <a href="a">      bbb</a>'
    let messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(0)

    code = '<div>\r\n     <a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(0)
  })

  it('Only tabs in front of line should not result in an error', () => {
    const code = '			<a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleMixOptions)
    expect(messages.length).toBe(0)
  })

  it('Not only space in front of line should result in an error', () => {
    // mixed 1
    let code = '    	<a href="a">      bbb</a>'
    let messages = HTMLHint.verify(code, ruleSpaceOptions)
    expect(messages.length).toBe(1)

    // mixed 2
    code = '	    <a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleSpaceOptions)
    expect(messages.length).toBe(1)

    // only tab
    code = '		<a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleSpaceOptions)
    expect(messages.length).toBe(1)
  })

  it('Not only space and 4 length in front of line should result in an error', () => {
    const code = '     <a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleSpace4Options)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      'Please use space for indentation and keep 4 length.'
    )
  })

  it('Only space and 4 length in front of line should not result in an error', () => {
    const code = '        <a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleSpace4Options)
    expect(messages.length).toBe(0)
  })

  it('Not only space and 5 length in front of line should result in an error', () => {
    const code = '      <a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleSpace5Options)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toBe(
      'Please use space for indentation and keep 5 length.'
    )
  })

  it('Only space and 5 length in front of line should not result in an error', () => {
    const code = '          <a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleSpace5Options)
    expect(messages.length).toBe(0)
  })

  it('Only space in front of line should not result in an error', () => {
    const code = '            <a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleSpaceOptions)
    expect(messages.length).toBe(0)
  })

  it('Not only tab in front of line should result in an error', () => {
    // mixed 1
    let code = '	    <a href="a">      bbb</a>'
    let messages = HTMLHint.verify(code, ruleTabOptions)
    expect(messages.length).toBe(1)

    // mixed 2
    code = '    	<a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleTabOptions)
    expect(messages.length).toBe(1)

    // only space
    code = '       <a href="a">      bbb</a>'
    messages = HTMLHint.verify(code, ruleTabOptions)
    expect(messages.length).toBe(1)
  })

  it('Only tab in front of line should not result in an error', () => {
    // only tab
    const code = '		<a href="a">      bbb</a>'
    const messages = HTMLHint.verify(code, ruleTabOptions)
    expect(messages.length).toBe(0)
  })
})
