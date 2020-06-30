---
id: attr-whitespace
title: attr-whitespace
---

All attributes should be separated by only one space and not have leading/trailing whitespace.

## Possible Configuration Values

```json
{
  "attr-whitespace": "off",
  "attr-whitespace": "warn",
  "attr-whitespace": "error",
  "attr-whitespace": ["off"],
  "attr-whitespace": ["warn", { "exceptions": ["test"] }],
  "attr-whitespace": ["error", { "exceptions": ["test"] }]
}
```

## Default

```json
{ "attr-whitespace": ["off", { "exceptions": [] }] }
```

## Options

This rule has an object option:

- `"exceptions": ["test"]` ignore attribute `test`.

---

## Examples

Examples of **correct** code for this rule:

```html
<p test="test test1"></p>
<p test="testtest1"></p>
<p test="test test1"></p>
```

Examples of **incorrect** code for this rule:

```html
<p test="test  test1"></p>
<p test=" testtest1 "></p>
<p test=" test  test1 "></p>
```

---

## When Not To Use It

If your project will use attributes with multiple whitespaces.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
