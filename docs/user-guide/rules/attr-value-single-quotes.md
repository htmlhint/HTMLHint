---
id: attr-value-single-quotes
title: attr-value-single-quotes
---

Attribute values must be in single quotes.

## Possible Configuration Values

```json
{
  "attr-value-single-quotes": "off",
  "attr-value-single-quotes": "warn",
  "attr-value-single-quotes": "error",
  "attr-value-single-quotes": ["off"],
  "attr-value-single-quotes": ["warn"],
  "attr-value-single-quotes": ["error"]
}
```

## Default

```json
{ "attr-value-single-quotes": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<a href="" title="abc"></a>
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<a href="" title="abc"></a>
```

---

## When Not To Use It

If your project will use double quotes for attribute values.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
