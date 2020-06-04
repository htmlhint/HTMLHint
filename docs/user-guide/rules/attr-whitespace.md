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
  "attr-whitespace": ["warn", { "exceptions": ["???", "???"] }],
  "attr-whitespace": ["error", { "exceptions": ["???", "???"] }]
}
```

## Default

```json
{ "attr-whitespace": "off" }
```

## Options

This rule has an object option:

- `"exceptions": ["???", "???"]` ignore attributes `???` and `???`.

---

## Examples

Examples of **correct** code for this rule:

```html
???
```

Examples of **incorrect** code for this rule:

```html
???
```

---

## When Not To Use It

If your project ???.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
