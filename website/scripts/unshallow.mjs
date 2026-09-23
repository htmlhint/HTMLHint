// Starlight reads each page's "Last updated" date from git history.
// CI hosts such as Cloudflare clone shallowly, which makes every page show
// the date of the latest commit, so fetch the full history before building.
import { execSync } from 'node:child_process'

const git = (args) =>
  execSync(`git ${args}`, { encoding: 'utf8', stdio: 'pipe' }).trim()

try {
  if (git('rev-parse --is-shallow-repository') === 'true') {
    console.log('Shallow clone detected, fetching full git history...')
    git('fetch --unshallow')
  }
} catch (error) {
  console.warn(
    `Could not fetch full git history; "Last updated" dates may be wrong.\n${error.message}`
  )
}
