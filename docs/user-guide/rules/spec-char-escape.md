---
id: spec-char-escape
title: spec-char-escape
---

Special characters must be escaped.

## Possible Configuration Values

```json
{
  "spec-char-escape": "off",
  "spec-char-escape": "warn",
  "spec-char-escape": "error",
  "spec-char-escape": ["off"],
  "spec-char-escape": ["warn"],
  "spec-char-escape": ["error"]
}
```

## Default

```json
{ "spec-char-escape": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<span>aaa&gt;bbb&lt;ccc</span>
```

Examples of **incorrect** code for this rule:

```html
<span>aaa>bbb<ccc</span>
```

---

## When Not To Use It

Always use this rule.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
