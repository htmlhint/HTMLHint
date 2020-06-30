---
id: head-script-disabled
title: head-script-disabled
---

The `<script>` tag cannot be used in a `<head>` tag.

## Possible Configuration Values

```json
{
  "head-script-disabled": "off",
  "head-script-disabled": "warn",
  "head-script-disabled": "error",
  "head-script-disabled": ["off"],
  "head-script-disabled": ["warn"],
  "head-script-disabled": ["error"]
}
```

## Default

```json
{ "head-script-disabled": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<body>
  <script src="test.js"></script>
</body>
```

Examples of **incorrect** code for this rule:

```html
<head>
  <script src="test.js"></script>
</head>
```

---

## When Not To Use It

If your project will use `script` tags in `head`.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
