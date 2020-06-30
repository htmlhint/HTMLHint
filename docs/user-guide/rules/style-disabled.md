---
id: style-disabled
title: style-disabled
---

`<style>` tags cannot be used.

## Possible Configuration Values

```json
{
  "style-disabled": "off",
  "style-disabled": "warn",
  "style-disabled": "error",
  "style-disabled": ["off"],
  "style-disabled": ["warn"],
  "style-disabled": ["error"]
}
```

## Default

```json
{ "style-disabled": "off" }
```

---

## Examples

Examples of **incorrect** code for this rule:

```html
<head>
  <style type="text/css"></style>
</head>
<body>
  <style type="text/css"></style>
</body>
```

---

## When Not To Use It

If your project will use `style` tags.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
