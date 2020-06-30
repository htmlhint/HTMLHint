---
id: src-not-empty
title: src-not-empty
---

The `src` attribute of an `img`, `script` or `link` must have a value.

## Possible Configuration Values

```json
{
  "src-not-empty": "off",
  "src-not-empty": "warn",
  "src-not-empty": "error",
  "src-not-empty": ["off"],
  "src-not-empty": ["warn"],
  "src-not-empty": ["error"]
}
```

## Default

```json
{ "src-not-empty": "error" }
```

---

## Examples

Examples of **correct** code for this rule:

<!-- prettier-ignore -->
```html
<img src="test.png" />
<script src="test.js"></script>
<link href="test.css" type="text/css" />
<embed src="test.swf">
<bgsound src="test.mid" />
<iframe src="test.html">
<object data="test.swf">
```

Examples of **incorrect** code for this rule:

<!-- prettier-ignore -->
```html
<img src />
<script src=""></script>
<script src></script>
<link href="" type="text/css" />
<link href type="text/css" />
<embed src="">
<embed src>
<bgsound src="" />
<bgsound src />
<iframe src="">
<iframe src>
<object data="">
<object data>
```

---

## When Not To Use It

If your project will use tags without `src`.

## Version

This rule was introduced in HTMLHint `v0.9.4`.
