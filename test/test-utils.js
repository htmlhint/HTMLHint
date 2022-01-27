const path = require('path')
const execa = require('execa')
const { node: execaNode } = execa

const HTMLHINT_PATH = path.resolve(__dirname, '..', 'bin', 'htmlhint')
const ENABLE_LOG_COMPILATION = process.env.ENABLE_PIPE || false

/**
 * Run the CLI for a test case. Based on Webpack-cli test harness
 *
 * @param {string} cwd The path to folder that contains test
 * @param {Array<string>} args Array of arguments
 * @param {Object<string, any>} options Options for tests
 * @returns {Promise}
 */
const run = async (cwd, args = [], options = {}) => {
  const { nodeOptions = [] } = options
  const processExecutor = nodeOptions.length ? execaNode : execa

  return processExecutor(HTMLHINT_PATH, args, {
    cwd: path.resolve(cwd),
    reject: false,
    stdio: ENABLE_LOG_COMPILATION ? 'inherit' : 'pipe',
    maxBuffer: Infinity,
    ...options,
  })
}

module.exports = {
  run,
}
