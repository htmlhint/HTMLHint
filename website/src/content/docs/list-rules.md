---
id: list-rules
title: List of rules
description: A complete list of all the rules for HTMLHint
---

## Possible errors

### Doctype and Head

- [`doctype-first`](/docs/user-guide/rules/doctype-first): Doctype must be declared first.
- [`doctype-html5`](/docs/user-guide/rules/doctype-html5): Invalid doctype.
- [`html-lang-require`](/docs/user-guide/rules/html-lang-require): The HTML lang attribute is required.
- [`head-script-disabled`](/docs/user-guide/rules/head-script-disabled): The `<script>` tag cannot be used in a tag.
- [`style-disabled`](/docs/user-guide/rules/style-disabled): `<style>` tags cannot be used.
- [`script-disabled`](/docs/user-guide/rules/script-disabled): `<script>` tags cannot be used.
- [`title-require`](/docs/user-guide/rules/title-require): `<title>` must be present in `<head>` tag.

### Attributes

- [`attr-lowercase`](/docs/user-guide/rules/attr-lowercase): All attribute names must be in lowercase.
- [`attr-no-duplication`](/docs/user-guide/rules/attr-no-duplication): Elements cannot have duplicate attributes.
- [`attr-no-unnecessary-whitespace`](/docs/user-guide/rules/attr-no-unnecessary-whitespace): No spaces between attribute names and values.
- [`attr-unsafe-chars`](/docs/user-guide/rules/attr-unsafe-chars): Attribute values cannot contain unsafe chars.
- [`attr-value-double-quotes`](/docs/user-guide/rules/attr-value-double-quotes): Attribute values must be in double quotes.
- [`attr-value-single-quotes`](/docs/user-guide/rules/attr-value-single-quotes): Attribute values must be in single quotes.
- [`attr-value-not-empty`](/docs/user-guide/rules/attr-value-not-empty): All attributes must have values.
- [`attr-sorted`](/docs/user-guide/rules/attr-sorted): Attributes should be sorted in order.
- [`attr-whitespace`](/docs/user-guide/rules/attr-whitespace): No leading or trailing spaces in attribute values.
- [`alt-require`](/docs/user-guide/rules/alt-require): The alt attribute of an img element must be present and alt attribute of area[href] and input[type=image] must have a value.
- [`input-requires-label`](/docs/user-guide/rules/input-requires-label): All [ input ] tags must have a corresponding [ label ] tag.

### Tags

- [`tags-check`](/docs/user-guide/rules/tags-check): Allowing specify rules for any tag and validate that
- [`tag-pair`](/docs/user-guide/rules/tag-pair): Tag must be paired.
- [`tag-self-close`](/docs/user-guide/rules/tag-self-close): Empty tags must be self closed.
- [`tagname-lowercase`](/docs/user-guide/rules/tagname-lowercase): All HTML element names must be in lowercase.
- [`tagname-specialchars`](/docs/user-guide/rules/tagname-specialchars): Tag names can only contain letters, numbers, "-", ":" or "\_".
- [`empty-tag-not-self-closed`](/docs/user-guide/rules/empty-tag-not-self-closed): The empty tag should not be closed by self.
- [`src-not-empty`](/docs/user-guide/rules/src-not-empty): The src attribute of an img(script,link) must have a value.
- [`href-abs-or-rel`](/docs/user-guide/rules/href-abs-or-rel): An href attribute must be either absolute or relative.

### Id

- [`id-class-ad-disabled`](/docs/user-guide/rules/id-class-ad-disabled): The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.
- [`id-class-value`](/docs/user-guide/rules/id-class-value): The id and class attribute values must meet the specified rules.
- [`id-unique`](/docs/user-guide/rules/id-unique): The value of id attributes must be unique.

### Inline

- [`inline-script-disabled`](/docs/user-guide/rules/inline-script-disabled): Inline script cannot be used.
- [`inline-style-disabled`](/docs/user-guide/rules/inline-style-disabled): Inline style cannot be used.

### Formatting

- [`space-tab-mixed-disabled`](/docs/user-guide/rules/space-tab-mixed-disabled): Do not mix tabs and spaces for indentation.
- [`spec-char-escape`](/docs/user-guide/rules/spec-char-escape): Special characters must be escaped.
