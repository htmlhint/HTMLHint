---
id: attr-sorted
title: attr-sorted
---

Attribute tags must be in proper order.

## Possible Configuration Values

```json
{
  "attr-sorted": "off",
  "attr-sorted": "warn",
  "attr-sorted": "error",
  "attr-sorted": ["off"],
  "attr-sorted": ["warn"],
  "attr-sorted": ["error"]
}
```

## Default

```json
{ "attr-sorted": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<img alt="test" src="test.png" />
```

Examples of **incorrect** code for this rule:

```html
<img src="test.png" alt="test" />
```

---

## When Not To Use It

If your project will use attributes in an unsorted order.

## Version

This rule was introduced in HTMLHint `v0.11.0`.
