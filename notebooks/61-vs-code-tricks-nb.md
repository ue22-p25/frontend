---
celltoolbar: Slideshow
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  name: deno
  display_name: Deno
  language: typescript
short_title: VS-code tricks
---

# VS-code tricks

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

(label-palette)=
## the palette

the palette is the swiss knife of vs-code  
you activate it with `⌘-⇧-p` (mac) or `⌃-⇧-p` (windows)

---

(label-format-document)=
## `Format Document`

with this command [use the palette to reach it](#label-palette) 
you can ask vs-code to re-format the whole document

```{admonition} tip
:class: tip

it may be wise to stage your file first  
even if you can also undo of course, like always under vscode
```

---

(label-indent-outdent)=
## `Indent Line` and `Outdent Line`

bound to `⌘ [` et `⌘ ]` respectively

select a block, these keys will help you move the code left or right

---

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

---

(label-emmet-wrap)=

## insert a wrapping tag

`emmet wrap`

one often needs to **add wrapping tags** in your html  
typically wrap a `<div>` around a whole HTML fragment to create sophisticated layouts

to do this easily under vs-code :

* select the text you want to wrap
* in [the palette](#label-palette) type `Emmet wrap with abbreviation`
* enter the tag name

---

in pictures: if you need to add a wrapping `<div>` / `</div>` around some text  
select it (can be multiple lines)

```{image} media/vs-code-0.png
:align: center
:width: 500px
```

---

then [activate the palette](#label-palette) and search for 'emmet: wrap with abbreviation'

```{image} media/vs-code-1.png
:align: center
:width: 500px
```

---

select that function, you will be prompted for the name of the wrapping tag

```{image} media/vs-code-2.png
:align: center
:width: 500px
```


---

## matching tags

check out the extensions named "`Auto Rename Tags`"  
with that in place, when you change e.g. a `<div>` into a `<span>`, the matching `</div>` gets renamed automatically as well

---

## multiple cursors

you can set multiple cursors, and then everything you type is done multiple times at once

several ways to use this feature

* manually add/remove cursors using `⌥ click` (⌥ is Option)
* use `⌥⌘↓` or `⌥⌘↑` to add more cursors up or down
* select a block and use `Add cursors to Line Ends` 
  to get one cursor on each of the selected lines

for more info, check out this page  
<https://code.visualstudio.com/docs/editor/codebasics#_multiple-selections-multicursor>

and/or on youtube, search for `vscode multiple cursor`

---

(label-custom-keybinding)=
## custom keybinding

it is rather straightforward to attach a custom keybinding to a vs-code function
that you use often  
start with .. [the palette](#label-palette), of course  
locate the function, and click the gear icon on its right hand side

```{image} media/vs-code-3.png
:align: center
:width: 500px
```

---

for example here, we just type 'Alt-o' and the shortcut gets recorded  
from then on you can just press that key combo to trigger the function

```{image} media/vs-code-4.png
:align: center
:width: 500px
```
