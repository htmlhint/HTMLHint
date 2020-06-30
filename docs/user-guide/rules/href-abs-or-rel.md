---
id: href-abs-or-rel
title: href-abs-or-rel
---

An href attribute must be either absolute or relative.

## Possible Configuration Values

```json
{
  "href-abs-or-rel": "off",
  "href-abs-or-rel": "warn",
  "href-abs-or-rel": "error",
  "href-abs-or-rel": ["off"],
  "href-abs-or-rel": ["warn", { "mode": "absolute" }],
  "href-abs-or-rel": ["warn", { "mode": "relative" }],
  "href-abs-or-rel": ["error", { "mode": "absolute" }],
  "href-abs-or-rel": ["error", { "mode": "relative" }]
}
```

## Default

```json
{ "attr-lowercase": ["off", { "mode": "absolute" }] }
```

## Options

This rule has an object option:

- `"mode": "absolute"` (default) only allow absolut urls.
- `"mode": "relative"` only allow relative urls.

---

## Examples

Examples of **correct** code for mode `absolut`:

```html
<a href="http://www.alibaba.com/">test1</a>
<a href="https://www.alipay.com/">test2</a>
```

Examples of **correct** code for mode `relative`:

<!-- prettier-ignore -->
```html
<a href="test.html">test1</a>
<a href="../test.html">test2</a>
```

---

## When Not To Use It

If your project will use both `relative` and `absolute`.

## Version

This rule was introduced in HTMLHint `v0.9.6`.
