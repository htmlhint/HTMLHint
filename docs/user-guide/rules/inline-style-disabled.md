---
id: inline-style-disabled
title: inline-style-disabled
---

Inline style cannot be used.

## Possible Configuration Values

```json
{
  "inline-style-disabled": "off",
  "inline-style-disabled": "warn",
  "inline-style-disabled": "error",
  "inline-style-disabled": ["off"],
  "inline-style-disabled": ["warn"],
  "inline-style-disabled": ["error"]
}
```

## Default

```json
{ "inline-style-disabled": "error" }
```

---

## Examples

Examples of **incorrect** code for this rule:

```html
<div style="color:red"></div>
```

---

## When Not To Use It

If your project will use inline styles.

## Version

This rule was introduced in HTMLHint `v0.9.10`.
