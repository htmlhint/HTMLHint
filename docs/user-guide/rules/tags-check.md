---
id: tags-check
title: tags-check
---

Checks html tags.

## Possible Configuration Values

```json
{
  "tags-check": "off",
  "tags-check": "warn",
  "tags-check": "error",
  "tags-check": ["off"],
  "tags-check": [
    "warn",
    {
      "img": {
        "selfclosing": true,
        "attrsRequired": ["src", "alt", "title"]
      }
    }
  ],
  "tags-check": [
    "error",
    {
      "a": {
        "selfclosing": false,
        "attrsRequired": ["href", "title"],
        "redundantAttrs": ["alt"]
      }
    }
  ]
}
```

## Default

```json
{
  "tags-check": [
    "off",
    {
      "a": {
        "selfclosing": false,
        "attrsRequired": ["href", "title"],
        "redundantAttrs": ["alt"]
      },
      "div": {
        "selfclosing": false
      },
      "main": {
        "selfclosing": false,
        "redundantAttrs": ["role"]
      },
      "nav": {
        "selfclosing": false,
        "redundantAttrs": ["role"]
      },
      "script": {
        "attrsOptional": [
          ["async", "async"],
          ["defer", "defer"]
        ]
      },
      "img": {
        "selfclosing": true,
        "attrsRequired": ["src", "alt", "title"]
      }
    }
  ]
}
```

## Options

This rule has an object option.

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<main>Main content</main>
<a href="#" title="">blabla</a>
<a href="bbb" title="aaa">Link</a>
<img src="bbb" title="aaa" alt="asd" />
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<main role="main"></main>
<a>blabla</a>
<a href="bbb" title="aaa" />
<img src="bbb" title="aaa" alt="asd"></img>
```

---

## When Not To Use It

If your project doesn't need custom checks for tags.

## Version

This rule was introduced in HTMLHint `v0.11.0`.
