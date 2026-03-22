# Agents

<!-- https://agents.md -->

## General

- This projects is for HTMLHint, a static code analysis tool for HTML.
- All code and comments should be in US English.
- The website is built with Astro Starlight.
- All code should be formatted with Prettier.
- Use ESLint to check for JavaScript errors.
- Rollup is used for building the project.
- Node.js 20 or newer is required; Volta pins the repo to Node 20 LTS in `package.json`.
- Core code is in TypeScript v5.4.5.
- All new rules for HTMLHint should be placed in the rules directory.
- Tests for new rules should be added in rules and follow the naming pattern `<rule-name>.spec.js`.
- Do not use deprecated TypeScript features.
- All user-facing messages and documentation should use clear, concise US English.
- Keep dependencies up to date and avoid unnecessary packages.
- All website content should be placed in the website directory and follow Astro Starlight conventions.
- Rules in the rules directory should always be documented in the website/src/content/docs/rules directory.
- Rules in src/core/core.ts should be listed alphabetically.
- Use the provided code snippets as examples for rule documentation.
- Newly added rules pages for the website should have the frontmatter: sidebar: hidden: true badge: New
- Always run `npm run build` before running tests or committing changes.
- When adding a new rule to website ensure that it has the frontmatter: `pagefind: false   sidebar:   badge: New  hidden: true`.
- Always run `npm run lint` before declaring that a task is complete (if you've changed any files).
- Always use lf for line endings.
- Code is formatted with prettier.
- As a general rule, rules should be listed alphabetically.

## Markdown Code Guide

- Markdown should be formatted with Prettier.
- There should be a line break before the first list item.
- There should be a line break after headings.

## YAML Code Guide

- YML files should begin with --- on the first line.
- YML should be formatted with Prettier.

## GitHub Commit Messages

- If multiple changes are made then list changes using bullet points.

## Documentation

- All documentation should be written in US English.
- For the 'Why this rule is important' section, always include a link to the relevant documentation and prefer MDN and Google documentation along with official documentation from the W3C.
