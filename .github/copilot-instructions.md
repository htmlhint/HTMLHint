# Copilot Instructions

- This projects is for HTMLHint, a static code analysis tool for HTML.
- All code and comments should be in US English.
- The website is built with Astro Starlight.
- All code should be formatted with Prettier.
- Use ESLint to check for JavaScript errors.
- Rollup is used for building the project.
- Node v20 is used for development.
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

## GitHub Actions

- The GitHub Actions workflows should be placed in the .github/workflows directory.
- The workflows should be named `<workflow-name>.yml`.
- All GitHub Actions should be pinned versions to avoid breaking changes (SHA-1).
- If using actions/checkout, it should have `persist-credentials: false` set.

## GitHub Commit Messages

- If multiple changes are made then list changes using bullet points.
