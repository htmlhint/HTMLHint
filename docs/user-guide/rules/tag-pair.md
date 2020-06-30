---
id: tag-pair
title: tag-pair
---

Tag must be paired.

## Possible Configuration Values

```json
{
  "tag-pair": "off",
  "tag-pair": "warn",
  "tag-pair": "error",
  "tag-pair": ["off"],
  "tag-pair": ["warn"],
  "tag-pair": ["error"]
}
```

## Default

```json
{ "tag-pair": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<ul>
  <li></li>
</ul>
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<ul><li></ul>
<ul></li></ul>
```

---

## When Not To Use It

Always use this rule.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
