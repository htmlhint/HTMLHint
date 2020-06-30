---
id: id-unique
title: id-unique
---

The value of id attributes must be unique.

## Possible Configuration Values

```json
{
  "id-unique": "off",
  "id-unique": "warn",
  "id-unique": "error",
  "id-unique": ["off"],
  "id-unique": ["warn"],
  "id-unique": ["error"]
}
```

## Default

```json
{ "id-unique": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<div id="id1"></div>
<div id="id2"></div>
```

Examples of **incorrect** code for this rule:

```html
<div id="id1"></div>
<div id="id1"></div>
```

---

## When Not To Use It

If your project will use the same `id` multiple times.

## Version

This rule was introduced in HTMLHint `v0.9.2`.
