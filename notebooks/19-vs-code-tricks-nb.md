---
celltoolbar: Slideshow
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: JavaScript (Node.js)
  language: javascript
  name: javascript
language_info:
  name: javascript
nbhosting:
  title: other html tags
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# vs-code tricks

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## `Format Document`

with this command (use the palette to reach it) you can ask vs-code to re-format the whole document

```{admonition} tip
:class: tip
    
it may be wise to stage your file first  
even if you can also undo of course, like always under vscode
```

+++

## `Indent Line` and `Outdent Line`

bound to `⌘ [` et `⌘ ]` respectively

select a block, these keys will help you move the code left or right

+++ {"slideshow": {"slide_type": "slide"}}

## emmet

you can easily create repetitive stuff using this very handy tool - it is built into vs-code

e.g. you type

`(div.the-class>ul>(li*2))*3`

you get

```html
<div class="the-class">
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="the-class">
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="the-class">
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>
```

+++

## `emmet wrap`

with `Emmet: wrap with abbreviation` (use the palette)  
you can easily wrap a piece of html inside a newly-created tag

+++

## matching tags

check out the extensions named "`Auto Rename Tags`"  
with that in place, when you change e.g. a `<div>` into a `<span>`, the matching `</div>` gets renamed automatically as well

+++

## multiple cursors

you can set multiple cursors, and then everything you type is done multiple times at once

several ways to use this feature

* manually add/remove cursors using `⌥ click` (⌥ is Option)
* use `⌥⌘↓` or `⌥⌘↑` to add more cursors up or down
* select a block and use `Add cursors to Line Ends` 
  to get one cursor on each of the selected lines

for more info, check out this page <https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor>

and/or on youtube, search for `vscode multiple cursor`

+++

## keyboard shortcuts

it is easy to assign these functions to a keyboard shortcut

* search the function in the palette
* move the mouse over the function name  
  a gear icon `⚙` appears on the right hand side

* click that

and/or search in the vs-code documentation, or ask google or chatgpt
