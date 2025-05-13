const { parseGlob } = require('../../dist/cli/parse-glob.js')
const parseGlobPkg = require('parse-glob')

const testGlobs = [
  '!foo.js',
  '*.js',
  '**/abc.js',
  'abc/*.js',
  'abc/(aaa|bbb).js',
  'abc/[a-z].js',
  'abc/{a,b}.js',
  'abc/def/**/(ghi|jkl)*.{js,html}',
  'abc/def/ghi.js',
  'abc.js',
  '/abc/def.js',
]

describe('parseGlob', () => {
  it('should work the same way as parseGlob package', () => {
    for (const glob of testGlobs) {
      const result = parseGlob(glob)
      const pkgResult = parseGlobPkg(glob)
      expect(result.base).toEqual(pkgResult.base)
      expect(result.glob).toEqual(pkgResult.glob)
      expect(result.is.glob).toEqual(pkgResult.is.glob)
      expect(result.path.basename).toEqual(pkgResult.path.basename)
    }
  })
})
