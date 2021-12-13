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
  const valid = isGlob(target)

  const result = {
    base: '',
    glob: '',
    is: {
      glob: valid,
    },
    path: {
      basename: '',
    },
  }

  if (valid) {
    const recursiveTokenIndex = target.indexOf('**/')
    const lastSlashIndex = target.lastIndexOf('/')
    const baseGlobSepIndex =
      recursiveTokenIndex >= 0
        ? recursiveTokenIndex
        : Math.max(lastSlashIndex, 0)

    result.base =
      target.substring(0, baseGlobSepIndex).replace(/\/$/, '') || '.'

    result.glob = target.substring(baseGlobSepIndex).replace(/^\//, '')

    result.path.basename = target
      .substring(Math.max(lastSlashIndex, 0))
      .replace(/^\//, '')
  }

  return result
}
