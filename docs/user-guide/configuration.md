---
id: configuration
title: Configuration
---

By default, HTMLHint looks for a `.htmlhintrc` file in the current directory and all parent directories, and applies its rules when parsing a file:

```sh
$ htmlhint index.html
```

To provide a custom configuration file to the command, use the `--config` option:

```sh
$ htmlhint --config htmlhint.conf index.html
```

Custom rules can also be specified individually, via the `--rules` option:

```sh
$ htmlhint --rules tag-pair,id-class-value=underline index.html
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
