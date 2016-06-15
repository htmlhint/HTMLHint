# Rule: `jsio-tag-format`

This rule is for our internal developer team, but seems like it would benefit others as well.  TLDR; this makes sure that your indentation is consistent and easy to read.

Assuming the `debug` package is installed, you can also view the debugging logs for this rule:

``` bash
export DEBUG='jsioTagFormat*'
```


## Configuration

### `indentSize {int}`

How many spaces should your indentations be.  There is no support for tabs at this time.


### `maxLineLength {int|false}`

How long should lines be capped at.  This can be set to false to skip line length checks.  Line length only applies to the first line of your tag.



## Examples

### Indentation and Formatting

Bad:
``` html
<!-- Mixed tag / attr lines -->
<div class="my-class"
  attr1="foo" attr2="bar"></div>
<div
  class="my-class" attr1="foo"></div>

<!-- No hanging ">" -->
<div
  class="my-class"
  attr1="foo">
  <p></p>
</div>

<!-- Unexpected attr indentation -->
<div
  class="my-class"
    attr1="foo"
></div>

<!-- Multiline tag not on own line -->
<div><p
  class="my-other-class"
>
  hello
</p></div>

<!-- Inner Indentation -->
<div>
<p></p>
</div>
```

Good:
``` html
<!-- Attributes on individual lines -->
<!-- ">" Hanging -->
<!-- Uniform attr indentation -->
<div
  class="my-class"
  attr1="foo"
></div>

<div
  class="my-class"
  attr1="foo"
>
  <p></p>
</div>

<!-- Inner block indented -->
<div>
  <p></p>
</div>
```


### Line Length

_Note: assume `maxLineLength = 40`_

Bad:
``` html
                                  <!-- | 40 char -->
<div class="my-class my-other-class" attr1="foo foo foo" attr2="bar bar bar"></div>
```

Good:
``` html
<!-- First line not > 40 char -->
<div
  class="my-class my-other-class"
  attr1="foo foo foo"
  attr2="bar bar bar"
></div>
```
