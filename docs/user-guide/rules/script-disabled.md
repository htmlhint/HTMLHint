---
id: script-disabled
title: script-disabled
---

The `<script>` tag cannot be used.

## Possible Configuration Values

```json
{
  "script-disabled": "off",
  "script-disabled": "warn",
  "script-disabled": "error",
  "script-disabled": ["off"],
  "script-disabled": ["warn"],
  "script-disabled": ["error"]
}
```

## Default

```json
{ "script-disabled": "off" }
```

---

## Examples

Examples of **incorrect** code for this rule:

```html
<body>
  <script src="index.js"></script>
</body>
```

---

## When Not To Use It

If your project will use `script` tags.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
