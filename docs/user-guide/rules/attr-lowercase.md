---
id: attr-lowercase
title: attr-lowercase
---

Attribute name must be lowercase.

## Possible Configuration Values

```json
{
  "attr-lowercase": "off",
  "attr-lowercase": "warn",
  "attr-lowercase": "error",
  "attr-lowercase": ["off"],
  "attr-lowercase": ["warn", { "exceptions": ["viewBox", "test"] }],
  "attr-lowercase": ["error", { "exceptions": ["viewBox", "test"] }]
}
```

## Default

```json
{ "attr-lowercase": "error" }
```

## Options

This rule has an object option:

- `"exceptions": ["viewBox", "test"]` ignore attributes `viewBox` and `test`.

---

## Examples

Examples of **correct** code for this rule:

```html
<img src="test.png" alt="test" />
```

Examples of **incorrect** code for this rule:

```html
<img src="test.png" alt="test" />
```

---

## When Not To Use It

If your project will use `camelCase` attributes.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
