HTMLHint change log
====================

## ver 0.9.13 (2016-5-1)

add:

1. change cli parameter: `--plugin` to `--rulesdir`
2. add formatter directory support
3. add formatters: compact, markdown
4. add cli parameter:`--nocolor`, disable color in cli
5. space-tab-mixed-disabled plugin: add space length require

fix:

1. fix: report error evidence if tag attrs include `\r\n`
2. fix: space-tab-mixed-disabled issue #119

## ver 0.9.10 (2015-10-12)

add:

1. attr-unsafe-chars(rule): show unsafe code in message
2. support glob pattern for cli
3. support format as custom: json, junit, checkstyle
4. support plugin: `htmlhint --plugin ./plugins/`
5. add rule: inline-style-disabled
6. add rule: inline-script-disabled

fix:

1. title-require(rule): report error when `<html><title>test</title><head></head><body></body></html>`
2. title-require(rule): report error when `<html><head><title></title></head><body></body></html>`

## ver 0.9.9 (2015-10-9)

add:

1. add config loaded message to cli log
2. support async for cli

fix:

1. close issue: #79, fix exit with 0 when hint errors
2. fix end event col
2. attr-unsafe-chars(rule): exclude `\r\n`

## ver 0.9.8 (2015-10-7)

add:

1. Search `.htmlhintrc` in parent directory
2. Allow comments in json
3. Support hint any file without `.html` or `.htm` extension, just like: `htmlhint test.xhtml`
4. Support json raw format in cli
5. tag-pair(rule): Show the line of the start tag
6. space-tab-mixed-disabled(rule): Support space and tab mode, for check only space or tab
7. Make cli logs more clear to people
8. add rule: title-require, `<title>` must be present in `<head>` tag.

fix:

1. Fix issue: #77 `<link rel=icon><link rel=icon>`
2. Made the descriptions and error messages of rules more clear to people
3. head-script-disabled(fule): No head not result error

## ver 0.9.7 (2015-3-8)

fix:

1. fix 'No such file' issue on mac
2. head-script-disabled: not match template script

## ver 0.9.6 (2014-6-18)

add:

1. add rule: attr-no-duplication
2. add rule: space-tab-mixed-disabled
3. add rule: id-class-ad-disabled
4. add rule: href-abs-or-rel
5. add rule: attr-unsafe-chars
6. add default rule: attr-no-duplication
7. add inline ruleset support
8. add test spec: Set false to rule
9. add point: load default ruleset when use empty ruleset

## ver 0.9.4 (2013-9-27)

1. add rule: src-not-empty

fix:

1. fix attr-value-double-quotes rule: `<img src=''>` should result error

## ver 0.9.3 (2013-5-24)

add:

1. add ruleid to csslint message

fix:

1. fix csslint rule: del undefined of raw
2. fix parser for: `<div class="foo""><a><span">`

## ver 0.9.2 (2013-4-6)

add：

1. add rule: csslint
2. add rule: jshint
3. add rule: id-unique
4. add cli

fix：

1. compatible with:

        <div class="foo"
        <div class"foo">
        <div class=foo">
        <div class="foo>

## ver 0.9.1 (2013-3-23)

add:

1. add rule: attr-lowercase
2. add rule: attr-value-double-quotes
3. add rule: attr-value-not-empty
4. add rule: doctype-first
5. add rule: doctype-html5
6. add rule: head-script-disabled
7. add rule: id-class-value
8. add rule: img-alt-require
9. add rule: spec-char-escape
10. add rule: style-disabled
11. add rule: tagname-lowercase
12. add rule: tag-pair
13. add rule: tag-self-close
