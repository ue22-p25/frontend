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
  title: flex layout
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# `display: flex`

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## purpose

`flex` is another modern layout engine that tries to solve or at least alleviate  
the obvious deficiencies of the old-school `block` model and related tools

* as opposed to grids, it is concerned with **1-dimension** flow of data
* it **complements nicely** what is doable with grids

+++ {"slideshow": {"slide_type": "slide"}}

````{admonition} as per MDN
:class: admonition-small

as per [this article on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox):

> The following simple layout requirements are either difficult or impossible to achieve with such tools, in any kind of convenient, flexible way:

> * Vertically centering a block of content inside its parent.
> * Making all the children of a container take up an equal amount of the available width/height, regardless of how much width/height is available.
> * Making all columns in a multiple column layout adopt the same height even if they contain a different amount of content.
````

+++ {"slideshow": {"slide_type": "slide"}}

## ex1 - default behaviour

by default, `direction: row`, `wrap: nowrap`

```{code-cell}
:tags: [remove-input]

flex1_html = `<div class="container">
<div class="item"> Dolor quiquia </div>
<div class="item"> aliquam </div>
<div class="item"> sed numquam </div>
<div class="item"> voluptatem </div>
<div class="item"> quisquam modi. </div>
</div>`

flex1_css = `/* the important part is just this */
.container {
    display: flex;
    justify-content: space-evenly;
}

/* cosmetic: outline borders */
body {
    border: none;
}
* { border: 1px solid red;
    padding: 4px; border-radius: 4px;}

.item {
    font-size: 30px;
}
`

tools.sample_from_strings({html: flex1_html, css: flex1_css}, {id: 'flex1', start_with: 'css'})
```

+++ {"slideshow": {"slide_type": "slide"}}

## ex2 - wrap mode

identical except that we specify `flex-wrap: wrap`

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
flex2_html = `<div class="container">
<div class="item"> Dolor quiquia </div>
<div class="item"> aliquam </div>
<div class="item"> sed numquam </div>
<div class="item"> voluptatem </div>
<div class="item"> quisquam modi. </div>
</div>`

flex2_css = `.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

/* outline borders */
body { border: none; }
* { border: 1px solid red;
    padding: 4px; border-radius: 4px;}

.item {
    font-size: 40px;
}
`

tools.sample_from_strings({html: flex2_html, css: flex2_css}, {id: 'flex2', start_with: 'css'})
```

+++ {"slideshow": {"slide_type": "slide"}}

## assignment

* [this page on css-trick.com](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is an easy, and very complete, read on flex
* it is again **strongly recommended** that you browse it thoroughly
    to get a perception of what is doable with this layout

+++

## use cases

* [supported in all modern browsers](https://caniuse.com/#feat=flexbox)
* the `flex` display is an extremely powerful tool
  for fine-grained control over your layout
* it could clearly be the default behaviour
  (but is not just for **legacy**)
* when writing a new page from scratch,
  using `flex` is almost always a good idea

+++

## grid's and flex's

* as mentioned earlier, both display policies have their own pros and cons
* you should not think in terms or one **or** the other
* but rather in terms of using **both** depending on the situation
* so **do not hesitate** to define **nested** layouts
* with flex's in grid's in flex's in grid's
  or the other way around, of course

* this is why the `<div>` tag is so all over the place

+++ {"slideshow": {"slide_type": "slide"}}

## practice

mimick the layout below

````{admonition} tip
:class: tip

in addition to using a `flex` display, you will probably need to set `width: 100%` on some elements to achieve this
````

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/23-exo-flex", {sources_show: false})
```

+++ {"slideshow": {"slide_type": "slide"}}

### optional activity

Flexbox Froggy <https://flexboxfroggy.com/> is a game to practice the flexbox properties
