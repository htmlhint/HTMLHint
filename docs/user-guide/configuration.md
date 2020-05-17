---
id: configuration
title: Configuration
---

Search `.htmlhintrc` file in current directory and all parent directories:

```sh
$ htmlhint
$ htmlhint test.html
```

Custom config file:

```sh
$ htmlhint --config htmlhint.conf test.html
```

Custom rules:

```sh
$ htmlhint --rules tag-pair,id-class-value=underline index.html
```

Inline rules in `test.html`:

<!-- prettier-ignore-start -->
```html
<!--htmlhint tag-pair,id-class-value:underline -->
<html>
<head>
...
```
<!-- prettier-ignore-end -->
