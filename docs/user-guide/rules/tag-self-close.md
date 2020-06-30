---
id: tag-self-close
title: tag-self-close
---

Empty tags must be self closed.

## Possible Configuration Values

```json
{
  "tag-self-close": "off",
  "tag-self-close": "warn",
  "tag-self-close": "error",
  "tag-self-close": ["off"],
  "tag-self-close": ["warn"],
  "tag-self-close": ["error"]
}
```

## Default

```json
{ "tag-self-close": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<br />
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<br>
```

---

## When Not To Use It

If your project will use tags without self closing tags.

## Version

This rule was introduced in HTMLHint `v0.9.1`.
