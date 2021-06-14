---
id: inline-script-disabled
title: inline-script-disabled
---

Inline script cannot be used.

## Possible Configuration Values

```json
{
  "inline-script-disabled": "off",
  "inline-script-disabled": "warn",
  "inline-script-disabled": "error",
  "inline-script-disabled": ["off"],
  "inline-script-disabled": ["warn"],
  "inline-script-disabled": ["error"]
}
```

## Default

```json
{ "inline-script-disabled": "off" }
```

---

## Examples

Examples of **incorrect** code for this rule:

```html
<img src="test.gif" onclick="alert(1);" />
<img src="javascript:alert(1)" />
<a href="javascript:alert(1)">test1</a>
```

---

## When Not To Use It

If your project will use inline scripts.

## Version

This rule was introduced in HTMLHint `v0.9.10`.
