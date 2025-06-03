---
id: configuration
title: Configuration
description: How to configure HTMLHint using a configuration file, command line options, or inline comments.
---

By default, HTMLHint looks for a `.htmlhintrc` file in the current directory and all parent directories, and applies its rules when parsing a file:

```sh
htmlhint index.html
```

To provide a custom configuration file to the command, use the `--config` option:

```sh
htmlhint --config htmlhint.conf index.html
```

Custom rules can also be specified individually, via the `--rules` option:

```sh
htmlhint --rules tag-pair,id-class-value=underline index.html
```

Finally, rules can be specified inline directly in the HTML document:

<!-- prettier-ignore -->
```html
<!-- htmlhint tag-pair,id-class-value:underline -->
<html>
  <head>...</head>
  <body>...</body>
</html>
```

## Example configuration file

An example configuration file (with all rules disabled):

```json
{
  "rules": {
    "alt-require": false,
    "attr-lowercase": false,
    "attr-no-duplication": false,
    "attr-no-unnecessary-whitespace": false,
    "attr-sorted": false,
    "attr-unsafe-chars": false,
    "attr-value-double-quotes": false,
    "attr-value-not-empty": false,
    "attr-value-single-quotes": false,
    "attr-whitespace": false,
    "button-type-require": false,
    "doctype-first": false,
    "doctype-html5": false,
    "empty-tag-not-self-closed": false,
    "h1-require": false,
    "head-script-disabled": false,
    "href-abs-or-rel": false,
    "html-lang-require": false,
    "id-class-ad-disabled": false,
    "id-class-value": false,
    "id-unique": false,
    "inline-script-disabled": false,
    "inline-style-disabled": false,
    "input-requires-label": false,
    "main-require": false,
    "meta-description-require": false,
    "meta-viewport-require": false,
    "script-disabled": false,
    "space-tab-mixed-disabled": false,
    "spec-char-escape": false,
    "src-not-empty": false,
    "style-disabled": false,
    "tag-pair": false,
    "tag-self-close": false,
    "tagname-lowercase": false,
    "tagname-specialchars": false,
    "tags-check": false,
    "title-require": false
  }
}
```

## VS Code Configuration

To have your configuration file recognized by editors with JSON schema support, you can add the following to VS Code settings (`.vscode/settings.json`). This will enable autocompletion and validation for the `.htmlhintrc` file.

```json
{
  "json.schemas": [
    {
      "fileMatch": ["/.htmlhintrc"],
      "url": "https://json.schemastore.org/htmlhint.json"
    }
  ]
}
```

Note: if you have the [VS Code extension](/vs-code-extension/) installed, it will automatically recognize the `.htmlhintrc` file without needing to add this configuration.
