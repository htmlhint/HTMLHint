---
id: tag-self-close
title: tag-self-close
description: Requires proper use of self-closing tags for void elements to maintain valid HTML structure.
---

Self-closing tags, also known as void elements, are HTML elements that do not require a separate closing tag. These tags are self-contained and are typically used for elements that do not have any content between an opening and closing tag. Self-closing tags help keep the HTML structure clean and concise. This rule is especially relevant for XHTML or projects requiring strict HTML syntax.

Level: `warning`

## Config value

1. true: enable rule
2. false: disable rule

The following pattern is **not** considered a violations:

<!-- prettier-ignore -->
```html
<meta charset="UTF-8" />
```

The following pattern is considered a violation:

<!-- prettier-ignore -->
```html
<meta charset="UTF-8">
```
