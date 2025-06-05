---
id: list-rules
title: List of rules
description: A complete list of all the rules for HTMLHint
---

## Doctype and Head

- [`doctype-first`](/rules/doctype-first): Doctype must be declared first.
- [`doctype-html5`](/rules/doctype-html5): Invalid doctype.
- [`head-script-disabled`](/rules/head-script-disabled): The `<script>` tag cannot be used in `<head>` tag.
- [`html-lang-require`](/rules/html-lang-require): The HTML lang attribute is required.
- [`meta-description-require`](/rules/meta-description-require): `<meta name="description">` with non-blank content must be present in `<head>` tag.
- [`meta-viewport-require`](/rules/meta-viewport-require): `<meta name="viewport">` with non-blank content must be present in `<head>` tag.
- [`script-disabled`](/rules/script-disabled): `<script>` tags cannot be used.
- [`style-disabled`](/rules/style-disabled): `<style>` tags cannot be used.
- [`title-require`](/rules/title-require): `<title>` must be present in `<head>` tag.

## Attributes

- [`alt-require`](/rules/alt-require): The alt attribute of an img element must be present and alt attribute of area[href] and input[type=image] must have a value.
- [`attr-lowercase`](/rules/attr-lowercase): All attribute names must be in lowercase.
- [`attr-no-duplication`](/rules/attr-no-duplication): Elements cannot have duplicate attributes.
- [`attr-no-unnecessary-whitespace`](/rules/attr-no-unnecessary-whitespace): No spaces between attribute names and values.
- [`attr-sorted`](/rules/attr-sorted): Attributes should be sorted in order.
- [`attr-unsafe-chars`](/rules/attr-unsafe-chars): Attribute values cannot contain unsafe chars.
- [`attr-value-double-quotes`](/rules/attr-value-double-quotes): Attribute values must be in double quotes.
- [`attr-value-not-empty`](/rules/attr-value-not-empty): All attributes must have values.
- [`attr-value-single-quotes`](/rules/attr-value-single-quotes): Attribute values must be in single quotes.
- [`attr-whitespace`](/rules/attr-whitespace): No leading or trailing spaces in attribute values.
- [`button-type-require`](/rules/button-type-require): The type attribute of a button element must be present with a valid value: "button", "submit", or "reset".
- [`input-requires-label`](/rules/input-requires-label): All [ input ] tags must have a corresponding [ label ] tag.

## Tags

- [`empty-tag-not-self-closed`](/rules/empty-tag-not-self-closed): The empty tag should not be closed by self.
- [`h1-require`](/rules/h1-require): A document must have at least one `<h1>` element.
- [`href-abs-or-rel`](/rules/href-abs-or-rel): An href attribute must be either absolute or relative.
- [`main-require`](/rules/main-require): A document must have at least one `<main>` element in the `<body>` tag.
- [`src-not-empty`](/rules/src-not-empty): The src attribute of an img(script,link) must have a value.
- [`tag-pair`](/rules/tag-pair): Tag must be paired.
- [`tag-self-close`](/rules/tag-self-close): Empty tags must be self closed.
- [`tagname-lowercase`](/rules/tagname-lowercase): All HTML element names must be in lowercase.
- [`tagname-specialchars`](/rules/tagname-specialchars): Tag names can only contain letters, numbers, "-", ":" or "\_".
- [`tags-check`](/rules/tags-check): Allowing specify rules for any tag and validate that

## Id

- [`id-class-ad-disabled`](/rules/id-class-ad-disabled): The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.
- [`id-class-value`](/rules/id-class-value): The id and class attribute values must meet the specified rules.
- [`id-unique`](/rules/id-unique): The value of id attributes must be unique.

## Inline

- [`inline-script-disabled`](/rules/inline-script-disabled): Inline script cannot be used.
- [`inline-style-disabled`](/rules/inline-style-disabled): Inline style cannot be used.

## Formatting

- [`space-tab-mixed-disabled`](/rules/space-tab-mixed-disabled): Do not mix tabs and spaces for indentation.
- [`spec-char-escape`](/rules/spec-char-escape): Special characters must be escaped.
