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
  title: bootstrap
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# bootstrap

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## what is bootstrap ?

originally developped by twitter, [bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) is a - mostly CSS - library that offers

* a [grid-based framework for easier responsive layouts](https://getbootstrap.com/docs/4.4/layout/overview/)
* a distinctive look & feel for [usual content](https://getbootstrap.com/docs/4.4/content/typography/)
* [some components](https://getbootstrap.com/docs/4.4/components/alerts/) like navbars, paginations...

note that bootstrap depends on jQuery

+++

## why bootstrap

* here again bootstrap has been **very widely adopted** at some point, and for this reason is a **good to know** as well  
* on next slide we give a very small glimpse of what can be done with **no CSS** (our css just outlines the layout)
  and **no JavaScript** at all

+++

## status

like for jQuery, the hype is on the wane, so learning bootstrap in 2024 or later makes little sense; however you may come across a code that uses it, and in that case the information below may still be helpful.

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
tools.sample_from_stem("../samples/62-bootstrap", {height: "30em"})
```

````{admonition} see also
:class: tip

many more effects are available - read the components page !
````

+++

### bootstrap grid system

* the grid system may be one of the reasons  
  that made bootstrap so popular

the basics of the grid system rely on an overall container `<div>` that has a class `container` or `container-fluid`
the latter taking all the available space (in width), while the former will impose the width to belong in a finite set of values as far as possible (see example above)

[make sure to rtfm](https://getbootstrap.com/docs/4.0/layout/overview/)

+++

### grid system (continued)

* inside a `div.container`, you insert elements `div.row` that materialize a row in your layout
* a row is divided into 12 equal parts
*  then inside a `.row` you put subcontainers that are `class`'ed with names like e.g.
  * `col` : use in width as much as possible
  * `col-6` : use 6 elements of grid

There are means to define separate layouts for different device widths ([details here](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints))

[make sure to rtfm](https://getbootstrap.com/docs/4.0/layout/grid/)

+++

## the gallery

bootstrap provides [a gallery of example codes](https://getbootstrap.com/docs/4.0/examples/)

it is strongly recommended to browse that page to see the kind of results that you can expect with bootstrap; all this should feel rather familiar, given the number of sites that are built on bootstrap

the code for each of these examples is generally reasonably small, although the constructions required with bootstrap tend to be rather verbose

+++

## practice

* make sure you use `git` to store the latest version of your resume as this exercise may damage your work
* inject `bootstrap.css` into your resume
* **try to** write a version of your resume that uses **the bootstrap grid system** to handle grid layout and responsiveness
* which approach (with or without bootstrap) do you have better ? why ?
* are there other aspects of bootstrap that you can leverage to improve the look of your resume ?
