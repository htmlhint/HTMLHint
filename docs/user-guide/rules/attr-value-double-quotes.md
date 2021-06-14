---
id: attr-value-double-quotes
title: attr-value-double-quotes
---

Attribute values must be in double quotes.

## Possible Configuration Values

```json
{
  "attr-value-double-quotes": "off",
  "attr-value-double-quotes": "warn",
  "attr-value-double-quotes": "error",
  "attr-value-double-quotes": ["off"],
  "attr-value-double-quotes": ["warn"],
  "attr-value-double-quotes": ["error"]
}
```

## Default

```json
{ "attr-value-double-quotes": "error" }
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
<a href='' title='abc'></a>
```

---

## When Not To Use It

If your project will use single quotes for attribute values.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
