const { execSync } = require('child_process')

const os = require('os')

const type = os.type()

switch (type) {
  case 'Linux':
  case 'Darwin':
    execSync('./build-linux.sh', { stdio: 'inherit' })
    break
  case 'Windows_NT':
    execSync('build-windows.bat', { stdio: 'inherit' })
    break
  default:
    throw new Error(`Unsupported OS found: ${type}`)
}
