import { writeFileSync, readFileSync, existsSync } from 'fs'
import { FormatterCallback } from '../formatter'
import {
  SarifBuilder,
  SarifResultBuilder,
  SarifRuleBuilder,
  SarifRunBuilder,
} from 'node-sarif-builder'
import * as path from 'path'
import { Result } from 'sarif'
import { ReportType } from '../../core/types'

const pkg = require('../../../package.json')

/**
 * Get rule documentation markdown content
 * @param ruleId The ID of the rule
 * @returns Markdown content for the rule or undefined if not found
 */
function getRuleMarkdown(ruleId: string): string | undefined {
  const mdxFilePath = path.join(
    process.cwd(),
    'website',
    'src',
    'content',
    'docs',
    'rules',
    `${ruleId}.mdx`
  )

  try {
    if (existsSync(mdxFilePath)) {
      const content = readFileSync(mdxFilePath, 'utf8')

      // Extract content after frontmatter
      const frontmatterEnd = content.indexOf('---', 4) + 3
      if (frontmatterEnd > 3) {
        // Skip the frontmatter and extract the actual markdown content
        const markdown = content.substring(frontmatterEnd).trim()

        // Process the content line by line for better control
        const lines = markdown.split(/\r?\n/)

        // Remove the import line
        const filteredLines = lines.filter(
          (line) =>
            !line.includes(
              "import { Badge } from '@astrojs/starlight/components';"
            )
        )

        // Join the lines back together
        let processedMarkdown = filteredLines.join('\n')

        // Replace all Badge component instances with plain text
        // This matches the standard pattern used in the rule documentation
        processedMarkdown = processedMarkdown.replace(
          /<Badge\s+text="([^"]+)"[^>]*\/>/g,
          '$1'
        )

        // Wrap HTML elements in backticks for proper markdown formatting
        // This matches HTML tags, DOCTYPE declarations, and other HTML elements
        processedMarkdown = processedMarkdown.replace(
          /(<\/?[a-zA-Z][^>\s]*[^>]*>|<!DOCTYPE[^>]*>)/g,
          '`$1`'
        )

        // Replace any other Astro-specific components or syntax if needed

        return processedMarkdown
      }
    }
  } catch (error) {
    // Silently fail if file doesn't exist or can't be read
  }

  return undefined
}

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
        const sarifRuleBuilder = new SarifRuleBuilder().initSimple({
          ruleId: rule.id,
          shortDescriptionText: rule.description,
          helpUri: rule.link,
        })

        sarifRunBuilder.addRule(sarifRuleBuilder)
      })
    })

    // Add SARIF results (individual errors)
    arrAllMessages.forEach((result) => {
      result.messages.forEach((message) => {
        const sarifResultBuilder = new SarifResultBuilder()
        const ruleId = message.rule.id
        const sarifResultInit = {
          level:
            message.type === ReportType.info
              ? 'note'
              : (message.type.toString() as Result.level),
          messageText: message.message,
          ruleId: ruleId,
          fileUri: path
            .relative(process.cwd(), result.file)
            .replace(/\\/g, '/'),
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
    const sarifContent = sarifBuilder.buildSarifJsonString({ indent: true })

    // Add help.markdown to rules if available
    try {
      const sarifJson = JSON.parse(sarifContent)
      const rules = sarifJson.runs[0].tool.driver.rules

      // Process each rule individually
      for (const rule of rules) {
        const ruleId = rule.id
        const ruleMarkdown = getRuleMarkdown(ruleId)

        if (ruleMarkdown) {
          // Add the help object with markdown content to the rule
          rule.help = {
            text: rule.shortDescription.text,
            markdown: ruleMarkdown,
          }
        }
      }

      // Convert back to string with indentation
      const updatedSarifContent = JSON.stringify(sarifJson, null, 2)
      writeFileSync('htmlhint.sarif', updatedSarifContent)
    } catch (error) {
      // If there's an error parsing or modifying the JSON, fall back to the original content
      writeFileSync('htmlhint.sarif', sarifContent)
    }
  })
}

module.exports = sarifFormatter
