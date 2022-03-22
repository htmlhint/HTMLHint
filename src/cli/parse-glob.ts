import * as isGlob from 'is-glob'

export function parseGlob(target: string): {
  base: string
  glob: string
  is: {
    glob: boolean
  }
  path: {
    basename: string
  }
} {
  const recursiveTokenIndex = Math.max(
    target.indexOf('**/'),
    target.indexOf('**\\')
  )
  const lastSlashIndex = Math.max(
    target.lastIndexOf('/'),
    target.lastIndexOf('\\')
  )
  const baseGlobSepIndex =
    recursiveTokenIndex >= 0 ? recursiveTokenIndex : Math.max(lastSlashIndex, 0)

  return {
    base: target.substring(0, baseGlobSepIndex).replace(/[/\\]$/, '') || '.',
    glob: target.substring(baseGlobSepIndex).replace(/^[/\\]/, ''),
    is: {
      glob: isGlob(target),
    },
    path: {
      basename: target
        .substring(Math.max(lastSlashIndex, 0))
        .replace(/^[/\\]/, ''),
    },
  }
}
