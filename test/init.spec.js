const fs = require('fs')
const path = require('path')
const ChildProcess = require('child_process')

describe('Init command', () => {
  const testConfigPath = path.resolve(__dirname, '.htmlhintrc')

  // Clean up before and after each test
  beforeEach(() => {
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  afterEach(() => {
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  it('should create .htmlhintrc with default rules when --init is used', (done) => {
    ChildProcess.exec(
      ['node', path.resolve(__dirname, '../bin/htmlhint'), '--init'].join(' '),
      { cwd: __dirname },
      (error, stdout) => {
        expect(error).toBeNull()
        expect(stdout).toContain('Created configuration file: .htmlhintrc')
        expect(stdout).toContain('Configuration file contents:')
        expect(stdout).toContain('"tagname-lowercase": true')

        // Verify file was actually created
        expect(fs.existsSync(testConfigPath)).toBe(true)

        // Verify file contents
        const configContent = fs.readFileSync(testConfigPath, 'utf-8')
        const config = JSON.parse(configContent)
        expect(config['tagname-lowercase']).toBe(true)
        expect(config['attr-lowercase']).toBe(true)
        expect(config['attr-value-double-quotes']).toBe(true)
        expect(config['doctype-first']).toBe(true)
        expect(config['tag-pair']).toBe(true)
        expect(config['spec-char-escape']).toBe(true)
        expect(config['id-unique']).toBe(true)
        expect(config['src-not-empty']).toBe(true)
        expect(config['attr-no-duplication']).toBe(true)
        expect(config['title-require']).toBe(true)

        done()
      }
    )
  })

  it('should not overwrite existing .htmlhintrc when --init is used', (done) => {
    // Create an existing config file
    const existingConfig = { 'custom-rule': true }
    fs.writeFileSync(testConfigPath, JSON.stringify(existingConfig), 'utf-8')

    ChildProcess.exec(
      ['node', path.resolve(__dirname, '../bin/htmlhint'), '--init'].join(' '),
      { cwd: __dirname },
      (error, stdout) => {
        expect(error).toBeNull()
        expect(stdout).toContain(
          'Configuration file already exists: .htmlhintrc'
        )

        // Verify original file was not modified
        const configContent = fs.readFileSync(testConfigPath, 'utf-8')
        const config = JSON.parse(configContent)
        expect(config['custom-rule']).toBe(true)
        expect(config['tagname-lowercase']).toBeUndefined()

        done()
      }
    )
  })
})
