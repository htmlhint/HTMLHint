#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const path = require('path')
const stripJsonComments = require('strip-json-comments')
const async = require('async')
const glob = require('glob')
const parseGlob = require('parse-glob')
const request = require('request')

const HTMLHint = require('../dist/htmlhint.js').HTMLHint
const formatter = require('./formatter')
const pkg = require('../package.json')

require('colors')

function map(val) {
  const objMap = {}
  val.split(',').forEach((item) => {
    const arrItem = item.split(/\s*=\s*/)
    objMap[arrItem[0]] = arrItem[1] ? arrItem[1] : true
  })
  return objMap
}

program.on('--help', () => {
  console.log('  Examples:')
  console.log('')
  console.log('    htmlhint')
  console.log('    htmlhint www')
  console.log('    htmlhint www/test.html')
  console.log('    htmlhint www/**/*.xhtml')
  console.log('    htmlhint www/**/*.{htm,html}')
  console.log('    htmlhint http://www.alibaba.com/')
  console.log('    cat test.html | htmlhint stdin')
  console.log('    htmlhint --list')
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

if (program.list) {
  listRules()
  process.exit(0)
}

const arrTargets = program.args
if (arrTargets.length === 0) {
  arrTargets.push('./')
}

// init formatter
formatter.init(HTMLHint, {
  nocolor: program.nocolor,
})

const format = program.format || 'default'
if (format) {
  formatter.setFormat(format)
}

hintTargets(arrTargets, {
  rulesdir: program.rulesdir,
  ruleset: program.rules,
  formatter: formatter,
  ignore: program.ignore,
})

// list all rules
function listRules() {
  const rules = HTMLHint.rules
  let rule

  console.log('     All rules:')
  console.log(' ==================================================')

  for (const id in rules) {
    rule = rules[id]
    console.log('     %s : %s', rule.id.bold, rule.description)
  }
}

function hintTargets(arrTargets, options) {
  let arrAllMessages = []
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

  const arrTasks = []
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

  async.series(arrTasks, () => {
    // end hint
    const spendTime = new Date().getTime() - startTime
    formatter.emit('end', {
      arrAllMessages: arrAllMessages,
      allFileCount: allFileCount,
      allHintFileCount: allHintFileCount,
      allHintCount: allHintCount,
      time: spendTime,
    })
    process.exit(!program.warn && allHintCount > 0 ? 1 : 0)
  })
}

// load custom rles
function loadCustomRules(rulesdir) {
  rulesdir = rulesdir.replace(/\\/g, '/')
  if (fs.existsSync(rulesdir)) {
    if (fs.statSync(rulesdir).isDirectory()) {
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
function loadRule(filepath) {
  filepath = path.resolve(filepath)
  try {
    const module = require(filepath)
    module(HTMLHint)
  } catch (e) {
    // ignore
  }
}

// hint all files
function hintAllFiles(target, options, onFinised) {
  const globInfo = getGlobInfo(target)
  globInfo.ignore = options.ignore

  const formatter = options.formatter

  // hint result
  let targetFileCount = 0
  let targetHintFileCount = 0
  let targetHintCount = 0
  const arrTargetMessages = []

  // init ruleset
  let ruleset = options.ruleset
  if (ruleset === undefined) {
    ruleset = getConfig(program.config, globInfo.base, formatter)
  }

  // hint queue
  const hintQueue = async.queue((filepath, next) => {
    const startTime = new Date().getTime()

    if (filepath === 'stdin') {
      hintStdin(ruleset, hintNext)
    } else if (/^https?:\/\//.test(filepath)) {
      hintUrl(filepath, ruleset, hintNext)
    } else {
      const messages = hintFile(filepath, ruleset)
      hintNext(messages)
    }

    function hintNext(messages) {
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
      onFinised({
        targetFileCount: targetFileCount,
        targetHintFileCount: targetHintFileCount,
        targetHintCount: targetHintCount,
        arrTargetMessages: arrTargetMessages,
      })
    }
  }

  if (target === 'stdin') {
    isWalkDone = true
    hintQueue.push(target)
  } else if (/^https?:\/\//.test(target)) {
    isWalkDone = true
    hintQueue.push(target)
  } else {
    walkPath(
      globInfo,
      (filepath) => {
        isHintDone = false
        hintQueue.push(filepath)
      },
      () => {
        isWalkDone = true
        checkAllHinted()
      }
    )
  }
}

// split target to base & glob
function getGlobInfo(target) {
  // fix windows sep
  target = target.replace(/\\/g, '/')

  const globInfo = parseGlob(target)
  let base = path.resolve(globInfo.base)

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
    else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
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
function getConfig(configPath, base, formatter) {
  if (configPath === undefined && fs.existsSync(base)) {
    // find default config file in parent directory
    if (fs.statSync(base).isDirectory() === false) {
      base = path.dirname(base)
    }

    while (base) {
      const tmpConfigFile = path.resolve(base, '.htmlhintrc')

      if (fs.existsSync(tmpConfigFile)) {
        configPath = tmpConfigFile
        break
      }

      if (!base) {
        break
      }

      base = base.substring(0, base.lastIndexOf(path.sep))
    }
  }

  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf-8')
    let ruleset

    try {
      ruleset = JSON.parse(stripJsonComments(config))
      formatter.emit('config', {
        ruleset: ruleset,
        configPath: configPath,
      })
    } catch (e) {
      // ignore
    }

    return ruleset
  }
}

// walk path
function walkPath(globInfo, callback, onFinish) {
  let base = globInfo.base
  const pattern = globInfo.pattern
  const ignore = globInfo.ignore
  const arrIgnores = ['**/node_modules/**']

  if (ignore) {
    ignore.split(',').forEach((pattern) => {
      arrIgnores.push(pattern)
    })
  }

  const walk = glob(
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

  walk.on('match', (file) => {
    base = base.replace(/^.\//, '')
    callback(base + file)
  })
}

// hint file
function hintFile(filepath, ruleset) {
  let content = ''

  try {
    content = fs.readFileSync(filepath, 'utf-8')
  } catch (e) {
    // ignore
  }

  return HTMLHint.verify(content, ruleset)
}

// hint stdin
function hintStdin(ruleset, callback) {
  process.stdin.setEncoding('utf8')

  const buffers = []

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
function hintUrl(url, ruleset, callback) {
  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const messages = HTMLHint.verify(body, ruleset)
      callback(messages)
    } else {
      callback([])
    }
  })
}
