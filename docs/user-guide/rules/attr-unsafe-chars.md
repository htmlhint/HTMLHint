---
id: attr-unsafe-chars
title: attr-unsafe-chars
---

Attribute value cannot use unsafe chars.

Checks against regexp pattern: `/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/`

## Possible Configuration Values

```json
{
  "attr-unsafe-chars": "off",
  "attr-unsafe-chars": "warn",
  "attr-unsafe-chars": "error",
  "attr-unsafe-chars": ["off"],
  "attr-unsafe-chars": ["warn"],
  "attr-unsafe-chars": ["error"]
}
```

## Default

```json
{ "attr-unsafe-chars": "off" }
```

---

## Examples

Examples of **correct** code for this rule:

```html
<li>
  <a href="https://vimeo.com/album/1951235/video/56931059">Sud Web 2012</a>
</li>
```

Examples of **incorrect** code for this rule:

```html
<li>
  <a href="https://vimeo.com/album/1951235/video/56931059‎\u0009‎">
    Sud Web 2012
  </a>
</li>
```

:::tip
The unsafe chars is in the tail of the href attribute.
:::

---

## When Not To Use It

If your project will use unsafe chars.

## Version

This rule was introduced in HTMLHint `v0.9.6`.
