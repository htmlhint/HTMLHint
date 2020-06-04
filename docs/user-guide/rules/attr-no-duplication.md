---
id: attr-no-duplication
title: attr-no-duplication
---

Elements cannot have duplicate attributes.

## Possible Configuration Values

```json
{
  "attr-no-duplication": "off",
  "attr-no-duplication": "warn",
  "attr-no-duplication": "error",
  "attr-no-duplication": ["off"],
  "attr-no-duplication": ["warn"],
  "attr-no-duplication": ["error"]
}
```

## Default

```json
{ "attr-no-duplication": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<img src="a.png" />
```

Examples of **incorrect** code for this rule:

```html
<img src="a.png" src="b.png" />
```

---

## When Not To Use It

You always want to use this rule.

## Version

This rule was introduced in HTMLHint `v0.9.6`.
