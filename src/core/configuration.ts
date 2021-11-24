import { Configuration } from './types'

export function isConfiguration(value: unknown): value is Configuration {
  // Config must be an object
  if (typeof value !== 'object') {
    return false
  }

  // Config must not be null
  if (value === null) {
    return false
  }

  // This helps to get better support for TypeScript
  const config = value as Record<string, unknown>

  // If extends is defined, it must be an array
  if (config.extends !== undefined) {
    if (!Array.isArray(config.extends)) {
      return false
    }

    // Any value within extens must be a string
    for (const extension of config.extends) {
      if (typeof extension !== 'string') {
        return false
      }
    }
  }

  // If extends is defined, it must be an object
  if (config.rules !== undefined) {
    if (typeof config.rules !== 'object' && config.rules !== null) {
      return false
    }
  }

  return true
}
