---
id: tagname-specialchars
title: tagname-specialchars
---

All html element names must be in lowercase.

## Possible Configuration Values

```json
{
  "tagname-specialchars": "off",
  "tagname-specialchars": "warn",
  "tagname-specialchars": "error",
  "tagname-specialchars": ["off"],
  "tagname-specialchars": ["warn"],
  "tagname-specialchars": ["error"]
}
```

## Default

```json
{ "tagname-specialchars": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<div></div>
```

Examples of **incorrect** code for this rule:

```html
<di§v></di§v>
```

---

## When Not To Use It

Always use this rule.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
