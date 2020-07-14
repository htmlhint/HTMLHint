---
id: tagname-specialchars
title: tagname-specialchars
---

All html element names must not contain specialchars.

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
<a href=""></a><span>test</span>
```

Examples of **incorrect** code for this rule:

```html
<@ href="link"></@><$pan>aab</$pan>
```

---

## When Not To Use It

Always use this rule.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
