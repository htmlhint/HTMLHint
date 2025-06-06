#!/usr/bin/env node

import { queue as asyncQueue, series as asyncSeries } from 'async'
import * as chalk from 'chalk'
import { Command } from 'commander'
import { existsSync, readFileSync, statSync, writeFileSync } from 'fs'
import * as glob from 'glob'
import { IGlob } from 'glob'
import { parseGlob } from './parse-glob'
import { dirname, resolve, sep } from 'path'
import fetch from 'node-fetch'
import * as stripJsonComments from 'strip-json-comments'
import type { HTMLHint as IHTMLHint } from '../core/core'
import type { Hint, Ruleset } from '../core/types'
import { Formatter } from './formatter'

const HTMLHint: typeof IHTMLHint = require('../htmlhint.js').HTMLHint
const formatter: Formatter = require('./formatter')

const pkg = require('../../package.json')

function map(val: string) {
  const objMap: { [name: string]: string | true } = {}
  val.split(',').forEach((item) => {
    const arrItem = item.split(/\s*=\s*/)
    objMap[arrItem[0]] = arrItem[1] ? arrItem[1] : true
  })
  return objMap
}

const program = new Command()

program.on('--help', () => {
  console.log('  Examples:')
  console.log('')
  console.log('    htmlhint')
  console.log('    htmlhint www')
  console.log('    htmlhint www/test.html')
  console.log('    htmlhint www/**/*.xhtml')
  console.log('    htmlhint www/**/*.{htm,html}')
  console.log('    htmlhint https://www.example.com/')
  console.log('    cat test.html | htmlhint stdin')
  console.log('    htmlhint --list')
  console.log('    htmlhint --init')
  console.log(
    '    htmlhint --rules tag-pair,id-class-value=underline test.html'
  )
  console.log('    htmlhint --config .htmlhintrc test.html')
  console.log('    htmlhint --ignore **/build/**,**/test/**')
  console.log('    htmlhint --rulesdir ./rules/')
  console.log('')
})

const arrSupportedFormatters = formatter.getSupported()

program
  .version(pkg.version)
  .usage('<file|folder|pattern|stdin|url ...> [options]')
  .option('-l, --list', 'show all of the rules available')
  .option('--init', 'create a new .htmlhintrc config file with default rules')
  .option('-c, --config <file>', 'custom configuration file')
  .option(
    '-r, --rules <ruleid, ruleid=value ...>',
    'set all of the rules available',
    map
  )
  .option(
    '-R, --rulesdir <file|folder>',
    'load custom rules from file or folder'
  )
  .option(
    `-f, --format <${arrSupportedFormatters.join('|')}>`,
    'output messages as custom format'
  )
  .option(
    '-i, --ignore <pattern, pattern ...>',
    'add pattern to exclude matches'
  )
  .option('--nocolor', 'disable color')
  .option('--warn', 'Warn only, exit with 0')
  .parse(process.argv)

const cliOptions = program.opts()

if (cliOptions.list) {
  listRules()
  process.exit(0)
}

if (cliOptions.init) {
  const success = initConfig()
  process.exit(success ? 0 : 1)
}

const arrTargets = program.args
if (arrTargets.length === 0) {
  arrTargets.push('./')
}

// init formatter
formatter.init(HTMLHint, {
  nocolor: cliOptions.nocolor,
})

const format = cliOptions.format || 'default'
if (format) {
  formatter.setFormat(format)
}

hintTargets(arrTargets, {
  rulesdir: cliOptions.rulesdir,
  ruleset: cliOptions.rules,
  formatter: formatter,
  ignore: cliOptions.ignore,
})

// list all rules
function listRules() {
  const rules = HTMLHint.rules
  const ruleIds = Object.keys(rules).sort() // Sort rule IDs alphabetically

  console.log('     All rules:')
  console.log(' ==================================================')

  for (const id of ruleIds) {
    const rule = rules[id]
    console.log('     %s : %s', chalk.bold(rule.id), rule.description)
  }
}

// initialize config file
function initConfig(): boolean {
  const configPath = '.htmlhintrc'

  if (existsSync(configPath)) {
    console.log(
      chalk.yellow('Configuration file already exists: %s'),
      configPath
    )
    return true // File exists is a successful state - no error
  }

  const defaultConfig = JSON.stringify(HTMLHint.defaultRuleset, null, 2)

  try {
    writeFileSync(configPath, defaultConfig, 'utf-8')
    console.log(chalk.green('Created configuration file: %s'), configPath)
    console.log('')
    console.log('Configuration file contents:')
    console.log(chalk.gray(defaultConfig))
    return true
  } catch (error) {
    console.log(
      chalk.red('Failed to create configuration file: %s'),
      error instanceof Error ? error.message : String(error)
    )
    return false
  }
}

function hintTargets(
  arrTargets: string[],
  options: {
    formatter: Formatter
    ruleset?: Ruleset
    rulesdir?: string
    ignore?: string
  }
) {
  let arrAllMessages: Array<{
    file: string
    messages: Hint[]
    time: number
  }> = []
  let allFileCount = 0
  let allHintFileCount = 0
  let allHintCount = 0
  const startTime = new Date().getTime()

  const formatter = options.formatter

  // load custom rules
  const rulesdir = options.rulesdir
  if (rulesdir) {
    loadCustomRules(rulesdir)
  }

  // start hint
  formatter.emit('start')

  const arrTasks: Array<(next: () => void) => void> = []
  arrTargets.forEach((target) => {
    arrTasks.push((next) => {
      hintAllFiles(target, options, (result) => {
        allFileCount += result.targetFileCount
        allHintFileCount += result.targetHintFileCount
        allHintCount += result.targetHintCount
        arrAllMessages = arrAllMessages.concat(result.arrTargetMessages)
        next()
      })
    })
  })

  asyncSeries(arrTasks, () => {
    // end hint
    const spendTime = new Date().getTime() - startTime
    formatter.emit('end', {
      arrAllMessages: arrAllMessages,
      allFileCount: allFileCount,
      allHintFileCount: allHintFileCount,
      allHintCount: allHintCount,
      time: spendTime,
    })
    process.exit(!cliOptions.warn && allHintCount > 0 ? 1 : 0)
  })
}

// load custom rules
function loadCustomRules(rulesdir: string) {
  rulesdir = rulesdir.replace(/\\/g, '/')
  if (existsSync(rulesdir)) {
    if (statSync(rulesdir).isDirectory()) {
      rulesdir += /\/$/.test(rulesdir) ? '' : '/'
      rulesdir += '**/*.js'
      const arrFiles = glob.sync(rulesdir, {
        dot: false,
        nodir: true,
        strict: false,
        silent: true,
      })
      arrFiles.forEach((file) => {
        loadRule(file)
      })
    } else {
      loadRule(rulesdir)
    }
  }
}

// load rule
function loadRule(filepath: string) {
  filepath = resolve(filepath)
  try {
    const module = require(filepath)
    module(HTMLHint)
  } catch (e) {
    // ignore
  }
}

// hint all files
function hintAllFiles(
  target: string,
  options: {
    ignore?: string
    formatter: Formatter
    ruleset?: Ruleset
  },
  onFinished: (result: {
    targetFileCount: number
    targetHintFileCount: number
    targetHintCount: number
    arrTargetMessages: Array<{
      file: string
      messages: Hint[]
      time: number
    }>
  }) => void
) {
  const globInfo = getGlobInfo(target)
  globInfo.ignore = options.ignore

  const formatter = options.formatter

  // hint result
  let targetFileCount = 0
  let targetHintFileCount = 0
  let targetHintCount = 0
  const arrTargetMessages: Array<{
    file: string
    messages: Hint[]
    time: number
  }> = []

  // init ruleset
  let ruleset = options.ruleset
  if (ruleset === undefined) {
    ruleset = getConfig(cliOptions.config, globInfo.base, formatter)
  }

  // hint queue
  const hintQueue = asyncQueue<string>((filepath, next) => {
    const startTime = new Date().getTime()

    if (filepath === 'stdin') {
      hintStdin(ruleset, hintNext)
    } else if (/^https?:\/\//.test(filepath)) {
      hintUrl(filepath, ruleset, hintNext)
    } else {
      const messages = hintFile(filepath, ruleset)
      hintNext(messages)
    }

    function hintNext(messages: Hint[]) {
      const spendTime = new Date().getTime() - startTime
      const hintCount = messages.length
      if (hintCount > 0) {
        formatter.emit('file', {
          file: filepath,
          messages: messages,
          time: spendTime,
        })
        arrTargetMessages.push({
          file: filepath,
          messages: messages,
          time: spendTime,
        })
        targetHintFileCount++
        targetHintCount += hintCount
      }
      targetFileCount++
      setImmediate(next)
    }
  }, 10)

  // start hint
  let isWalkDone = false
  let isHintDone = true
  hintQueue.drain(() => {
    isHintDone = true
    checkAllHinted()
  })

  function checkAllHinted() {
    if (isWalkDone && isHintDone) {
      onFinished({
        targetFileCount: targetFileCount,
        targetHintFileCount: targetHintFileCount,
        targetHintCount: targetHintCount,
        arrTargetMessages: arrTargetMessages,
      })
    }
  }

  if (target === 'stdin') {
    isWalkDone = true
    void hintQueue.push(target)
  } else if (/^https?:\/\//.test(target)) {
    isWalkDone = true
    void hintQueue.push(target)
  } else {
    walkPath(
      globInfo,
      (filepath) => {
        isHintDone = false
        void hintQueue.push(filepath)
      },
      () => {
        isWalkDone = true
        checkAllHinted()
      }
    )
  }
}

// split target to base & glob
function getGlobInfo(target: string): {
  base: string
  pattern: string
  ignore?: string
} {
  // fix windows sep
  target = target.replace(/\\/g, '/')

  const globInfo = parseGlob(target)
  let base = resolve(globInfo.base)

  base += /\/$/.test(base) ? '' : '/'

  let pattern = globInfo.glob
  const globPath = globInfo.path
  const defaultGlob = '*.{htm,html}'

  if (globInfo.is.glob === true) {
    // no basename
    if (globPath.basename === '') {
      pattern += defaultGlob
    }
  } else {
    // no basename
    if (globPath.basename === '') {
      pattern += `**/${defaultGlob}`
    }
    // detect directory
    else if (existsSync(target) && statSync(target).isDirectory()) {
      base += `${globPath.basename}/`
      pattern = `**/${defaultGlob}`
    }
  }

  return {
    base: base,
    pattern: pattern,
  }
}

// search and load config
function getConfig(
  configPath: string | undefined,
  base: string,
  formatter: Formatter
) {
  if (configPath === undefined && existsSync(base)) {
    // find default config file in parent directory
    if (statSync(base).isDirectory() === false) {
      base = dirname(base)
    }

    while (base) {
      const tmpConfigFile = resolve(base, '.htmlhintrc')

      if (existsSync(tmpConfigFile)) {
        configPath = tmpConfigFile
        break
      }

      if (!base) {
        break
      }

      base = base.substring(0, base.lastIndexOf(sep))
    }
  }

  // TODO: can configPath be undefined here?
  if (configPath !== undefined && existsSync(configPath)) {
    const config = readFileSync(configPath, 'utf-8')
    let ruleset: Ruleset = {}

    try {
      ruleset = JSON.parse(stripJsonComments(config))
      formatter.emit('config', {
        ruleset: ruleset,
        configPath: configPath,
      })
    } catch (e) {
      console.log('   Config could not be parsed: %s', chalk.yellow(configPath))
      console.log('')
    }

    return ruleset
  }
}

// walk path
function walkPath(
  globInfo: { base: string; pattern: string; ignore?: string },
  callback: (filepath: string) => void,
  onFinish: () => void
) {
  let base: string = globInfo.base
  const pattern = globInfo.pattern
  const ignore: string | undefined = globInfo.ignore
  const arrIgnores = ['**/node_modules/**']

  if (ignore) {
    ignore.split(',').forEach((pattern) => {
      arrIgnores.push(pattern)
    })
  }

  const walk: IGlob = glob(
    pattern,
    {
      cwd: base,
      dot: false,
      ignore: arrIgnores,
      nodir: true,
      strict: false,
      silent: true,
    },
    () => {
      onFinish()
    }
  )

  walk.on('match', (file: string) => {
    base = base.replace(/^.\//, '')

    if (sep !== '/') {
      base = base.replace(/\//g, sep)
    }

    callback(base + file)
  })
}

// hint file
function hintFile(filepath: string, ruleset?: Ruleset) {
  let content = ''

  try {
    content = readFileSync(filepath, 'utf-8')
  } catch (e) {
    // ignore
  }

  return HTMLHint.verify(content, ruleset)
}

// hint stdin
function hintStdin(
  ruleset: Ruleset | undefined,
  callback: (messages: Hint[]) => void
) {
  process.stdin.setEncoding('utf8')

  const buffers: string[] = []

  process.stdin.on('data', (text) => {
    buffers.push(text)
  })

  process.stdin.on('end', () => {
    const content = buffers.join('')
    const messages = HTMLHint.verify(content, ruleset)
    callback(messages)
  })
}

// hint url
function hintUrl(
  url: string,
  ruleset: Ruleset | undefined,
  callback: (messages: Hint[]) => void
) {
  const errorFn = () => callback([])
  fetch(url).then((response) => {
    if (response.ok) {
      response.text().then((body) => {
        const messages = HTMLHint.verify(body, ruleset)
        callback(messages)
      }, errorFn)
    } else {
      errorFn()
    }
  }, errorFn)
}
