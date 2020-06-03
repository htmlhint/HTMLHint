---
id: attr-value-not-empty
title: attr-value-not-empty
---

Attribute must set value.

## Possible Configuration Values

```json
{
  "attr-value-not-empty": "off",
  "attr-value-not-empty": "warn",
  "attr-value-not-empty": "error",
  "attr-value-not-empty": ["off"],
  "attr-value-not-empty": ["warn"],
  "attr-value-not-empty": ["error"]
}
```

## Default

```json
{ "attr-lowercase": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<input type="button" disabled="disabled" />
```

Examples of **incorrect** code for this rule:

```html
<input type="button" disabled />
```

---

## When Not To Use It

If your project will use attributes that doesn't need a value.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
