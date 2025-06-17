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
  // Try multiple possible locations for the rule documentation
  const possiblePaths = [
    // Standard path from process.cwd()
    path.join(
      process.cwd(),
      'website',
      'src',
      'content',
      'docs',
      'rules',
      `${ruleId}.mdx`
    ),
    // Absolute path based on module location
    path.join(
      path.dirname(require.resolve('../../../package.json')),
      'website',
      'src',
      'content',
      'docs',
      'rules',
      `${ruleId}.mdx`
    ),
    // Handle case where we're in the website directory
    path.join(
      process.cwd(),
      'src',
      'content',
      'docs',
      'rules',
      `${ruleId}.mdx`
    ),
  ]

  // Try each path until we find one that exists
  for (const mdxFilePath of possiblePaths) {
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

          // Handle code blocks - ensure they're preserved as is
          processedMarkdown = processedMarkdown.replace(
            /```html\n([\s\S]*?)```/g,
            (match, code) => `\`\`\`html\n${code}\`\`\``
          )

          return processedMarkdown
        }
      }
    } catch (error) {
      // Silent error handling for missing documentation files
    }
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

    // Add help.markdown to rules if available - optimized approach
    try {
      const sarifJson = JSON.parse(sarifContent)
      const rules = sarifJson.runs[0].tool.driver.rules

      // Process each rule to add help content
      rules.forEach(
        (rule: {
          id: string
          shortDescription: { text: string }
          help?: object
        }) => {
          // Get rule markdown for this specific rule
          const ruleMarkdown = getRuleMarkdown(rule.id)
          if (ruleMarkdown) {
            rule.help = {
              text: rule.shortDescription.text,
              markdown: ruleMarkdown,
            }
          }
        }
      )

      const updatedSarifContent = JSON.stringify(sarifJson, null, 2)
      writeFileSync('htmlhint.sarif', updatedSarifContent)

      // Output the SARIF content to stdout for CLI usage
      console.log(updatedSarifContent)
    } catch (error) {
      // If there's an error, fall back to the original content
      writeFileSync('htmlhint.sarif', sarifContent)

      // Output the original SARIF content to stdout for CLI usage
      console.log(sarifContent)
    }
  })
}

module.exports = sarifFormatter
