import { FormatterCallback } from '../formatter'
import {
  SarifBuilder,
  SarifResultBuilder,
  SarifRuleBuilder,
  SarifRunBuilder,
} from 'node-sarif-builder'
import * as path from 'path'
import { pathToFileURL } from 'url'
import { Result } from 'sarif'

const pkg = require('../../../package.json')

const sarifFormatter: FormatterCallback = function (formatter) {
  formatter.on('end', (event) => {
    const arrAllMessages = event.arrAllMessages

    // SARIF builder
    const sarifBuilder = new SarifBuilder()

    // SARIF Run builder
    const sarifRunBuilder = new SarifRunBuilder().initSimple({
      toolDriverName: 'HTMLHint',
      toolDriverVersion: pkg.version,
      url: 'https://htmlhint.com/',
    })

    // SARIF rules
    const addedRuleSet = new Set<string>()
    arrAllMessages.forEach((result) => {
      result.messages.forEach((message) => {
        const rule = message.rule
        if (addedRuleSet.has(rule.id)) {
          return
        }
        addedRuleSet.add(rule.id)
        const sarifRuleBuiler = new SarifRuleBuilder().initSimple({
          ruleId: rule.id,
          shortDescriptionText: rule.description,
          helpUri: rule.link,
        })
        sarifRunBuilder.addRule(sarifRuleBuiler)
      })
    })

    // Add SARIF results (individual errors)
    arrAllMessages.forEach((result) => {
      result.messages.forEach((message) => {
        const sarifResultBuilder = new SarifResultBuilder()
        const ruleId = message.rule.id
        const sarifResultInit = {
          level:
            message.type === 'info'
              ? 'note'
              : (message.type.toString() as Result.level),
          messageText: message.message,
          ruleId: ruleId,
          fileUri: process.env.SARIF_URI_ABSOLUTE
            ? pathToFileURL(result.file).toString()
            : path.relative(process.cwd(), result.file).replace(/\\/g, '/'),
          startLine: message.line,
          startColumn: message.col,
          endLine: message.line,
          endColumn: message.col,
        } as const
        sarifResultBuilder.initSimple(sarifResultInit)
        sarifRunBuilder.addResult(sarifResultBuilder)
      })
    })

    sarifBuilder.addRun(sarifRunBuilder)
    console.log(sarifBuilder.buildSarifJsonString({ indent: true }))
  })
}

module.exports = sarifFormatter
