!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('csslint'), require('jshint')))
    : 'function' == typeof define && define.amd
      ? define(['csslint', 'jshint'], t)
      : 'object' == typeof exports
        ? (exports.HTMLHint = t(require('csslint'), require('jshint')))
        : (e.HTMLHint = t(e.CSSLint, e.JSHINT));
})('undefined' != typeof self ? self : this, function(e, t) {
  return (function(e) {
    var t = {};
    function a(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
    }
    return (
      (a.m = e),
      (a.c = t),
      (a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (a.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (a.t = function(e, t) {
        if ((1 & t && (e = a(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (a.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var r in e)
            a.d(
              n,
              r,
              function(t) {
                return e[t];
              }.bind(null, r)
            );
        return n;
      }),
      (a.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return a.d(t, 'a', t), t;
      }),
      (a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (a.p = ''),
      a((a.s = 2))
    );
  })([
    function(t, a) {
      t.exports = e;
    },
    function(e, a) {
      e.exports = t;
    },
    function(e, t, a) {
      'use strict';
      a.r(t);
      var n = {};
      a.r(n),
        a.d(n, 'altRequire', function() {
          return s;
        }),
        a.d(n, 'attrLowercase', function() {
          return o;
        }),
        a.d(n, 'attrNoDuplication', function() {
          return l;
        }),
        a.d(n, 'attrUnsafeChars', function() {
          return u;
        }),
        a.d(n, 'attrValueDoubleQuotes', function() {
          return c;
        }),
        a.d(n, 'attrValueNotEmpty', function() {
          return d;
        }),
        a.d(n, 'attrWhitespace', function() {
          return f;
        }),
        a.d(n, 'csslint', function() {
          return g;
        }),
        a.d(n, 'doctypeFirst', function() {
          return m;
        }),
        a.d(n, 'doctypeHTML5', function() {
          return p;
        }),
        a.d(n, 'headScriptDisabled', function() {
          return v;
        }),
        a.d(n, 'hrefAbsOrRel', function() {
          return b;
        }),
        a.d(n, 'idClsasAdDisabled', function() {
          return w;
        }),
        a.d(n, 'idClassValue', function() {
          return y;
        }),
        a.d(n, 'idUnique', function() {
          return L;
        }),
        a.d(n, 'inlineScriptDisabled', function() {
          return x;
        }),
        a.d(n, 'inlineStyleDisabled', function() {
          return T;
        }),
        a.d(n, 'jshint', function() {
          return C;
        }),
        a.d(n, 'scriptDisabled', function() {
          return k;
        }),
        a.d(n, 'spaceTabMixedDisabled', function() {
          return j;
        }),
        a.d(n, 'specCharEscape', function() {
          return A;
        }),
        a.d(n, 'srcNotEmpty', function() {
          return q;
        }),
        a.d(n, 'styleDisabled', function() {
          return S;
        }),
        a.d(n, 'tagPair', function() {
          return M;
        }),
        a.d(n, 'emptyTagNotSelfClosed', function() {
          return E;
        }),
        a.d(n, 'tagnameLowercase', function() {
          return _;
        }),
        a.d(n, 'tagnameSpecialChars', function() {
          return D;
        }),
        a.d(n, 'titleRequire', function() {
          return I;
        });
      var r = class {
        constructor() {
          (this._listeners = {}),
            (this._mapCdataTags = this.makeMap('script,style')),
            (this._arrBlocks = []),
            (this.lastEvent = null);
        }
        makeMap(e) {
          for (var t = {}, a = e.split(','), n = 0; n < a.length; n++)
            t[a[n]] = !0;
          return t;
        }
        parse(e) {
          var t,
            a,
            n,
            r,
            i,
            s,
            o,
            l,
            u = this,
            c = u._mapCdataTags,
            d = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,
            f = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,
            h = /\r?\n/g,
            g = 0,
            m = 0,
            p = 0,
            v = 1,
            b = u._arrBlocks;
          function w(e, t, a, n) {
            var r = a - p + 1;
            for (
              void 0 === n && (n = {}),
                n.raw = t,
                n.pos = a,
                n.line = v,
                n.col = r,
                b.push(n),
                u.fire(e, n);
              h.exec(t);

            )
              v++, (p = a + h.lastIndex);
          }
          for (u.fire('start', { pos: 0, line: 1, col: 1 }); (t = d.exec(e)); )
            if (
              ((a = t.index) > g &&
                ((l = e.substring(g, a)), i ? o.push(l) : w('text', l, g)),
              (g = d.lastIndex),
              !(n = t[1]) ||
                (i &&
                  n === i &&
                  (w('cdata', (l = o.join('')), m, { tagName: i, attrs: s }),
                  (i = null),
                  (s = null),
                  (o = null)),
                i))
            )
              if (i) o.push(t[0]);
              else if ((n = t[4])) {
                r = [];
                for (var y, L = t[5], x = 0; (y = f.exec(L)); ) {
                  var T = y[1],
                    N = y[2] ? y[2] : y[4] ? y[4] : '',
                    C = y[3] ? y[3] : y[5] ? y[5] : y[6] ? y[6] : '';
                  r.push({
                    name: T,
                    value: C,
                    quote: N,
                    index: y.index,
                    raw: y[0]
                  }),
                    (x += y[0].length);
                }
                x === L.length
                  ? (w('tagstart', t[0], a, {
                      tagName: n,
                      attrs: r,
                      close: t[6]
                    }),
                    c[n] && ((i = n), (s = r.concat()), (o = []), (m = g)))
                  : w('text', t[0], a);
              } else
                (t[2] || t[3]) &&
                  w('comment', t[0], a, {
                    content: t[2] || t[3],
                    long: !!t[2]
                  });
            else w('tagend', t[0], a, { tagName: n });
          e.length > g && w('text', (l = e.substring(g, e.length)), g),
            u.fire('end', { pos: g, line: v, col: e.length - p + 1 });
        }
        addListener(e, t) {
          for (
            var a,
              n = this._listeners,
              r = e.split(/[,\s]/),
              i = 0,
              s = r.length;
            i < s;
            i++
          )
            void 0 === n[(a = r[i])] && (n[a] = []), n[a].push(t);
        }
        fire(e, t) {
          void 0 === t && (t = {}), (t.type = e);
          var a = [],
            n = this._listeners[e],
            r = this._listeners.all;
          void 0 !== n && (a = a.concat(n)), void 0 !== r && (a = a.concat(r));
          var i = this.lastEvent;
          null !== i && (delete i.lastEvent, (t.lastEvent = i)),
            (this.lastEvent = t);
          for (var s = 0, o = a.length; s < o; s++) a[s].call(this, t);
        }
        removeListener(e, t) {
          var a = this._listeners[e];
          if (void 0 !== a)
            for (var n = 0, r = a.length; n < r; n++)
              if (a[n] === t) {
                a.splice(n, 1);
                break;
              }
        }
        fixPos(e, t) {
          var a,
            n = e.raw.substr(0, t).split(/\r?\n/),
            r = n.length - 1,
            i = e.line;
          return (
            r > 0 ? ((i += r), (a = n[r].length + 1)) : (a = e.col + t),
            { line: i, col: a }
          );
        }
        getMapAttrs(e) {
          for (var t, a = {}, n = 0, r = e.length; n < r; n++)
            a[(t = e[n]).name] = t.value;
          return a;
        }
      };
      var i = class {
          constructor(e, t) {
            (this.html = e), (this.lines = e.split(/\r?\n/));
            var a = e.match(/\r?\n/);
            (this.brLen = null !== a ? a[0].length : 0),
              (this.ruleset = t),
              (this.messages = []),
              (this.error = this.report.bind(this, 'error')),
              (this.warn = this.report.bind(this, 'warning')),
              (this.info = this.report.bind(this, 'info'));
          }
          report(e, t, a, n, r, i) {
            for (
              var s, o, l = this.lines, u = this.brLen, c = a - 1, d = l.length;
              c < d && n > (o = (s = l[c]).length) && a < d;
              c++
            )
              a++, 1 != (n -= o) && (n -= u);
            this.messages.push({
              type: e,
              message: t,
              raw: i,
              evidence: s,
              line: a,
              col: n,
              rule: {
                id: r.id,
                description: r.description,
                link: 'https://github.com/thedaviddias/HTMLHint/wiki/' + r.id
              }
            });
          }
        },
        s = {
          id: 'alt-require',
          description:
            'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(n) {
              var r,
                i = n.tagName.toLowerCase(),
                s = e.getMapAttrs(n.attrs),
                o = n.col + i.length + 1;
              'img' !== i || 'alt' in s
                ? (('area' === i && 'href' in s) ||
                    ('input' === i && 'image' === s.type)) &&
                  (('alt' in s && '' !== s.alt) ||
                    ((r = 'area' === i ? 'area[href]' : 'input[type=image]'),
                    t.warn(
                      'The alt attribute of ' + r + ' must have a value.',
                      n.line,
                      o,
                      a,
                      n.raw
                    )))
                : t.warn(
                    'An alt attribute must be present on <img> elements.',
                    n.line,
                    o,
                    a,
                    n.raw
                  );
            });
          }
        },
        o = {
          id: 'attr-lowercase',
          description: 'All attribute names must be in lowercase.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart', function(e) {
              for (
                var a,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              ) {
                var u = (a = i[o]).name;
                -1 === r.indexOf(u) &&
                  u !== u.toLowerCase() &&
                  t.error(
                    'The attribute name of [ ' + u + ' ] must be in lowercase.',
                    e.line,
                    s + a.index,
                    n,
                    a.raw
                  );
              }
            });
          }
        },
        l = {
          id: 'attr-no-duplication',
          description: 'Elements cannot have duplicate attributes.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = {},
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                !0 === o[(r = (n = i[l]).name)] &&
                  t.error(
                    'Duplicate of attribute name [ ' + n.name + ' ] was found.',
                    e.line,
                    s + n.index,
                    a,
                    n.raw
                  ),
                  (o[r] = !0);
            });
          }
        },
        u = {
          id: 'attr-unsafe-chars',
          description: 'Attribute values cannot contain unsafe chars.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                if (null !== (r = (n = i[l]).value.match(o))) {
                  var c = escape(r[0])
                    .replace(/%u/, '\\u')
                    .replace(/%/, '\\x');
                  t.warn(
                    'The value of attribute [ ' +
                      n.name +
                      ' ] cannot contain an unsafe char [ ' +
                      c +
                      ' ].',
                    e.line,
                    s + n.index,
                    a,
                    n.raw
                  );
                }
            });
          }
        },
        c = {
          id: 'attr-value-double-quotes',
          description: 'Attribute values must be in double quotes.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                (('' !== (n = r[s]).value && '"' !== n.quote) ||
                  ('' === n.value && "'" === n.quote)) &&
                  t.error(
                    'The value of attribute [ ' +
                      n.name +
                      ' ] must be in double quotes.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        d = {
          id: 'attr-value-not-empty',
          description: 'All attributes must have values.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                '' === (n = r[s]).quote &&
                  '' === n.value &&
                  t.warn(
                    'The attribute [ ' + n.name + ' ] must have a value.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        f = {
          id: 'attr-whitespace',
          description:
            'All attributes should be separated by only one space and not have leading/trailing whitespace.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart', function(e) {
              var a,
                i = e.attrs,
                s = e.col + e.tagName.length + 1;
              i.forEach(function(i) {
                a = i;
                var o = i.name;
                -1 === r.indexOf(o) &&
                  (i.value.trim(i.value) !== i.value &&
                    t.error(
                      'The attributes of [ ' +
                        o +
                        ' ] must not have trailing whitespace.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    ),
                  i.value.replace(/ +(?= )/g, '') !== i.value &&
                    t.error(
                      'The attributes of [ ' +
                        o +
                        ' ] must be separated by only one space.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    ));
              });
            });
          }
        },
        h = a(0),
        g = {
          id: 'csslint',
          description: 'Scan css with csslint.',
          init: function(e, t, a) {
            var n = this;
            e.addListener('cdata', function(e) {
              if ('style' === e.tagName.toLowerCase()) {
                var r = h.CSSLint.verify;
                if (void 0 !== a) {
                  var i = e.line - 1,
                    s = e.col - 1;
                  try {
                    r(e.raw, a).messages.forEach(function(e) {
                      var a = e.line;
                      t['warning' === e.type ? 'warn' : 'error'](
                        '[' + e.rule.id + '] ' + e.message,
                        i + a,
                        (1 === a ? s : 0) + e.col,
                        n,
                        e.evidence
                      );
                    });
                  } catch (e) {}
                }
              }
            });
          }
        },
        m = {
          id: 'doctype-first',
          description: 'Doctype must be declared first.',
          init: function(e, t) {
            var a = this,
              n = function(r) {
                'start' === r.type ||
                  ('text' === r.type && /^\s*$/.test(r.raw)) ||
                  ((('comment' !== r.type && !1 === r.long) ||
                    !1 === /^DOCTYPE\s+/i.test(r.content)) &&
                    t.error(
                      'Doctype must be declared first.',
                      r.line,
                      r.col,
                      a,
                      r.raw
                    ),
                  e.removeListener('all', n));
              };
            e.addListener('all', n);
          }
        },
        p = {
          id: 'doctype-html5',
          description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
          init: function(e, t) {
            var a = this;
            function n(e) {
              !1 === e.long &&
                'doctype html' !== e.content.toLowerCase() &&
                t.warn(
                  'Invalid doctype. Use: "<!DOCTYPE html>"',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            }
            e.addListener('all', n),
              e.addListener('tagstart', function t() {
                e.removeListener('comment', n), e.removeListener('tagstart', t);
              });
          }
        },
        v = {
          id: 'head-script-disabled',
          description: 'The <script> tag cannot be used in a <head> tag.',
          init: function(e, t) {
            var a = this,
              n = /^(text\/javascript|application\/javascript)$/i,
              r = !1;
            function i(i) {
              var s = e.getMapAttrs(i.attrs).type,
                o = i.tagName.toLowerCase();
              'head' === o && (r = !0),
                !0 !== r ||
                  'script' !== o ||
                  (s && !0 !== n.test(s)) ||
                  t.warn(
                    'The <script> tag cannot be used in a <head> tag.',
                    i.line,
                    i.col,
                    a,
                    i.raw
                  );
            }
            e.addListener('tagstart', i),
              e.addListener('tagend', function t(a) {
                'head' === a.tagName.toLowerCase() &&
                  (e.removeListener('tagstart', i),
                  e.removeListener('tagend', t));
              });
          }
        },
        b = {
          id: 'href-abs-or-rel',
          description: 'An href attribute must be either absolute or relative.',
          init: function(e, t, a) {
            var n = this,
              r = 'abs' === a ? 'absolute' : 'relative';
            e.addListener('tagstart', function(e) {
              for (
                var a,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                if ('href' === (a = i[o]).name) {
                  (('absolute' === r && !1 === /^\w+?:/.test(a.value)) ||
                    ('relative' === r &&
                      !0 === /^https?:\/\//.test(a.value))) &&
                    t.warn(
                      'The value of the href attribute [ ' +
                        a.value +
                        ' ] must be ' +
                        r +
                        '.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    );
                  break;
                }
            });
          }
        },
        w = {
          id: 'id-class-ad-disabled',
          description:
            'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                (r = (n = i[o]).name),
                  /^(id|class)$/i.test(r) &&
                    /(^|[-_])ad([-_]|$)/i.test(n.value) &&
                    t.warn(
                      'The value of attribute ' +
                        r +
                        ' cannot use the ad keyword.',
                      e.line,
                      s + n.index,
                      a,
                      n.raw
                    );
            });
          }
        },
        y = {
          id: 'id-class-value',
          description:
            'The id and class attribute values must meet the specified rules.',
          init: function(e, t, a) {
            var n,
              r = this;
            if (
              (n =
                'string' == typeof a
                  ? {
                      underline: {
                        regId: /^[a-z\d]+(_[a-z\d]+)*$/,
                        message:
                          'The id and class attribute values must be in lowercase and split by an underscore.'
                      },
                      dash: {
                        regId: /^[a-z\d]+(-[a-z\d]+)*$/,
                        message:
                          'The id and class attribute values must be in lowercase and split by a dash.'
                      },
                      hump: {
                        regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                        message:
                          'The id and class attribute values must meet the camelCase style.'
                      }
                    }[a]
                  : a) &&
              n.regId
            ) {
              var i = n.regId,
                s = n.message;
              e.addListener('tagstart', function(e) {
                for (
                  var a,
                    n = e.attrs,
                    o = e.col + e.tagName.length + 1,
                    l = 0,
                    u = n.length;
                  l < u;
                  l++
                )
                  if (
                    ('id' === (a = n[l]).name.toLowerCase() &&
                      !1 === i.test(a.value) &&
                      t.warn(s, e.line, o + a.index, r, a.raw),
                    'class' === a.name.toLowerCase())
                  )
                    for (
                      var c, d = a.value.split(/\s+/g), f = 0, h = d.length;
                      f < h;
                      f++
                    )
                      (c = d[f]) &&
                        !1 === i.test(c) &&
                        t.warn(s, e.line, o + a.index, r, c);
              });
            }
          }
        },
        L = {
          id: 'id-unique',
          description: 'The value of id attributes must be unique.',
          init: function(e, t) {
            var a = this,
              n = {};
            e.addListener('tagstart', function(e) {
              for (
                var r,
                  i,
                  s = e.attrs,
                  o = e.col + e.tagName.length + 1,
                  l = 0,
                  u = s.length;
                l < u;
                l++
              )
                if ('id' === (r = s[l]).name.toLowerCase()) {
                  (i = r.value) &&
                    (void 0 === n[i] ? (n[i] = 1) : n[i]++,
                    n[i] > 1 &&
                      t.error(
                        'The id value [ ' + i + ' ] must be unique.',
                        e.line,
                        o + r.index,
                        a,
                        r.raw
                      ));
                  break;
                }
            });
          }
        },
        x = {
          id: 'inline-script-disabled',
          description: 'Inline script cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i,
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                (r = (n = i[l]).name.toLowerCase()),
                  !0 === o.test(r)
                    ? t.warn(
                        'Inline script [ ' + n.raw + ' ] cannot be used.',
                        e.line,
                        s + n.index,
                        a,
                        n.raw
                      )
                    : ('src' !== r && 'href' !== r) ||
                      (/^\s*javascript:/i.test(n.value) &&
                        t.warn(
                          'Inline script [ ' + n.raw + ' ] cannot be used.',
                          e.line,
                          s + n.index,
                          a,
                          n.raw
                        ));
            });
          }
        },
        T = {
          id: 'inline-style-disabled',
          description: 'Inline style cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                'style' === (n = r[s]).name.toLowerCase() &&
                  t.warn(
                    'Inline style [ ' + n.raw + ' ] cannot be used.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        N = a(1),
        C = {
          id: 'jshint',
          description: 'Scan script with jshint.',
          init: function(e, t, a) {
            var n = this;
            e.addListener('cdata', function(r) {
              if ('script' === r.tagName.toLowerCase()) {
                var i = e.getMapAttrs(r.attrs),
                  s = i.type;
                if (
                  void 0 !== i.src ||
                  (s && !1 === /^(text\/javascript)$/i.test(s))
                )
                  return;
                var o = N.JSHINT;
                if (void 0 !== a) {
                  var l = r.line - 1,
                    u = r.col - 1,
                    c = r.raw.replace(/\t/g, ' ');
                  try {
                    !1 === o(c, a, a.globals) &&
                      o.errors.forEach(function(e) {
                        var a = e.line;
                        t.warn(
                          e.reason,
                          l + a,
                          (1 === a ? u : 0) + e.character,
                          n,
                          e.evidence
                        );
                      });
                  } catch (e) {}
                }
              }
            });
          }
        },
        k = {
          id: 'script-disabled',
          description: 'The <script> tag cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              'script' === e.tagName.toLowerCase() &&
                t.error(
                  'The <script> tag cannot be used.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
        j = {
          id: 'space-tab-mixed-disabled',
          description: 'Do not mix tabs and spaces for indentation.',
          init: function(e, t, a) {
            var n = this,
              r = 'nomix',
              i = null;
            if ('string' == typeof a) {
              var s = a.match(/^([a-z]+)(\d+)?/);
              (r = s[1]), (i = s[2] && parseInt(s[2], 10));
            }
            e.addListener('text', function(a) {
              for (
                var s, o = a.raw, l = /(^|\r?\n)([ \t]+)/g;
                (s = l.exec(o));

              ) {
                var u = e.fixPos(a, s.index + s[1].length);
                if (1 === u.col) {
                  var c = s[2];
                  'space' === r
                    ? i
                      ? (!1 !== /^ +$/.test(c) && c.length % i == 0) ||
                        t.warn(
                          'Please use space for indentation and keep ' +
                            i +
                            ' length.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                      : !1 === /^ +$/.test(c) &&
                        t.warn(
                          'Please use space for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                    : 'tab' === r && !1 === /^\t+$/.test(c)
                      ? t.warn(
                          'Please use tab for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                      : !0 === / +\t|\t+ /.test(c) &&
                        t.warn(
                          'Do not mix tabs and spaces for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        );
                }
              }
            });
          }
        },
        A = {
          id: 'spec-char-escape',
          description: 'Special characters must be escaped.',
          init: function(e, t) {
            var a = this;
            e.addListener('text', function(n) {
              for (var r, i = n.raw, s = /[<>]/g; (r = s.exec(i)); ) {
                var o = e.fixPos(n, r.index);
                t.error(
                  'Special characters must be escaped : [ ' + r[0] + ' ].',
                  o.line,
                  o.col,
                  a,
                  n.raw
                );
              }
            });
          }
        },
        q = {
          id: 'src-not-empty',
          description:
            'The src attribute of an img(script,link) must have a value.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.tagName,
                  i = e.attrs,
                  s = e.col + r.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                (n = i[o]),
                  ((!0 === /^(img|script|embed|bgsound|iframe)$/.test(r) &&
                    'src' === n.name) ||
                    ('link' === r && 'href' === n.name) ||
                    ('object' === r && 'data' === n.name)) &&
                    '' === n.value &&
                    t.error(
                      'The attribute [ ' +
                        n.name +
                        ' ] of the tag [ ' +
                        r +
                        ' ] must have a value.',
                      e.line,
                      s + n.index,
                      a,
                      n.raw
                    );
            });
          }
        },
        S = {
          id: 'style-disabled',
          description: '<style> tags cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              'style' === e.tagName.toLowerCase() &&
                t.warn(
                  'The <style> tag cannot be used.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
        M = {
          id: 'tag-pair',
          description: 'Tag must be paired.',
          init: function(e, t) {
            var a = this,
              n = [],
              r = e.makeMap(
                'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
              );
            e.addListener('tagstart', function(e) {
              var t = e.tagName.toLowerCase();
              void 0 !== r[t] ||
                e.close ||
                n.push({ tagName: t, line: e.line, raw: e.raw });
            }),
              e.addListener('tagend', function(e) {
                for (
                  var r = e.tagName.toLowerCase(), i = n.length - 1;
                  i >= 0 && n[i].tagName !== r;
                  i--
                );
                if (i >= 0) {
                  for (var s = [], o = n.length - 1; o > i; o--)
                    s.push('</' + n[o].tagName + '>');
                  if (s.length > 0) {
                    var l = n[n.length - 1];
                    t.error(
                      'Tag must be paired, missing: [ ' +
                        s.join('') +
                        ' ], start tag match failed [ ' +
                        l.raw +
                        ' ] on line ' +
                        l.line +
                        '.',
                      e.line,
                      e.col,
                      a,
                      e.raw
                    );
                  }
                  n.length = i;
                } else t.error('Tag must be paired, no start tag: [ ' + e.raw + ' ]', e.line, e.col, a, e.raw);
              }),
              e.addListener('end', function(e) {
                for (var r = [], i = n.length - 1; i >= 0; i--)
                  r.push('</' + n[i].tagName + '>');
                if (r.length > 0) {
                  var s = n[n.length - 1];
                  t.error(
                    'Tag must be paired, missing: [ ' +
                      r.join('') +
                      ' ], open tag match failed [ ' +
                      s.raw +
                      ' ] on line ' +
                      s.line +
                      '.',
                    e.line,
                    e.col,
                    a,
                    ''
                  );
                }
              });
          }
        },
        E = {
          id: 'empty-tag-not-self-closed',
          description: 'Empty tags does not need to be self closed.',
          init: function(e, t) {
            var a = this,
              n = e.makeMap(
                'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
              );
            e.addListener('tagstart', function(e) {
              var r = e.tagName.toLowerCase();
              void 0 !== n[r] &&
                e.close &&
                t.warn(
                  'The empty tag : [ ' +
                    r +
                    ' ] does not need to be self closed.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
        _ = {
          id: 'tagname-lowercase',
          description: 'All html element names must be in lowercase.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart,tagend', function(e) {
              var a = e.tagName;
              -1 === r.indexOf(a) &&
                a !== a.toLowerCase() &&
                t.error(
                  'The html element name of [ ' +
                    a +
                    ' ] must be in lowercase.',
                  e.line,
                  e.col,
                  n,
                  e.raw
                );
            });
          }
        },
        D = {
          id: 'tagname-specialchars',
          description: 'All html element names must be in lowercase.',
          init: function(e, t) {
            var a = this,
              n = /[^a-zA-Z0-9\-:_]/;
            e.addListener('tagstart,tagend', function(e) {
              var r = e.tagName;
              n.test(r) &&
                t.error(
                  'The html element name of [ ' +
                    r +
                    ' ] contains special character.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
        I = {
          id: 'title-require',
          description: '<title> must be present in <head> tag.',
          init: function(e, t) {
            var a = this,
              n = !1,
              r = !1;
            function i(e) {
              var t = e.tagName.toLowerCase();
              'head' === t ? (n = !0) : 'title' === t && n && (r = !0);
            }
            e.addListener('tagstart', i),
              e.addListener('tagend', function n(s) {
                var o = s.tagName.toLowerCase();
                if (r && 'title' === o) {
                  var l = s.lastEvent;
                  ('text' !== l.type ||
                    ('text' === l.type && !0 === /^\s*$/.test(l.raw))) &&
                    t.error(
                      '<title></title> must not be empty.',
                      s.line,
                      s.col,
                      a,
                      s.raw
                    );
                } else 'head' === o && (!1 === r && t.error('<title> must be present in <head> tag.', s.line, s.col, a, s.raw), e.removeListener('tagstart', i), e.removeListener('tagend', n));
              });
          }
        };
      a.d(t, 'HTMLHint', function() {
        return O;
      }),
        a.d(t, 'HTMLRules', function() {
          return n;
        }),
        a.d(t, 'Reporter', function() {
          return i;
        }),
        a.d(t, 'HTMLParser', function() {
          return r;
        });
      class O {
        constructor() {
          (this.rules = {}),
            (this.defaultRuleset = {
              'tagname-lowercase': !0,
              'attr-lowercase': !0,
              'attr-value-double-quotes': !0,
              'doctype-first': !0,
              'tag-pair': !0,
              'spec-char-escape': !0,
              'id-unique': !0,
              'src-not-empty': !0,
              'attr-no-duplication': !0,
              'title-require': !0,
              'empty-tag-not-self-closed': !0
            });
        }
        addRule(e) {
          this.rules[e.id] = e;
        }
        verify(e, t) {
          (void 0 !== t && 0 !== Object.keys(t).length) ||
            (t = this.defaultRuleset),
            (e = e.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(
              e,
              a
            ) {
              return (
                void 0 === t && (t = {}),
                a.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function(
                  e,
                  a,
                  n
                ) {
                  'false' === n ? (n = !1) : 'true' === n && (n = !0),
                    (t[a] = void 0 === n || n);
                }),
                ''
              );
            }));
          var a,
            n = new r(),
            s = new i(e, t),
            o = this.rules;
          for (var l in t)
            void 0 !== (a = o[l]) && !1 !== t[l] && a.init(n, s, t[l]);
          return n.parse(e), s.messages;
        }
        format(e, t) {
          var a = [],
            n = { white: '', grey: '', red: '', reset: '' };
          (t = t || {}).colors &&
            ((n.white = '[37m'), (n.grey = '[90m'), (n.red = '[31m'), (n.reset = '[39m'));
          var r = t.indent || 0;
          return (
            e.forEach(e => {
              var t = e.evidence,
                i = e.line,
                s = e.col,
                o = t.length,
                l = s > 41 ? s - 40 : 1,
                u = t.length > s + 60 ? s + 60 : o;
              s < 41 && (u += 40 - s + 1),
                (t = t.replace(/\t/g, ' ').substring(l - 1, u)),
                l > 1 && ((t = '...' + t), (l -= 3)),
                u < o && (t += '...'),
                a.push(n.white + P(r) + 'L' + i + ' |' + n.grey + t + n.reset);
              var c = s - l,
                d = t.substring(0, c).match(/[^\u0000-\u00ff]/g);
              null !== d && (c += d.length),
                a.push(
                  n.white +
                    P(r) +
                    P(String(i).length + 3 + c) +
                    '^ ' +
                    n.red +
                    e.message +
                    ' (' +
                    e.rule.id +
                    ')' +
                    n.reset
                );
            }),
            a
          );
        }
      }
      function P(e, t) {
        return new Array(e + 1).join(t || ' ');
      }
      const $ = new O();
      Object.values(n).forEach(e => {
        $.addRule(e);
      });
      t.default = $;
    }
  ]);
});
