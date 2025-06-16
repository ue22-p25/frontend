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
  title: CSS variables
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# CSS variables

the official name for this feature is ***CSS custom properties***, but we'll call them variables because that's the closest thing CSS has to offer that looks like variables in a traditional language

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"slideshow": {"slide_type": "slide"}}

## why

* DRY: don't repeat yourself
* so far, we have not seen a way to "parametrize" things
* i.e. to use what other languages call *variables*
* and which btw, CSS calls *custom properties*

+++ {"slideshow": {"slide_type": "slide"}}

## example 1: DRY

imagine you'd like to define a custom class:

* where the padding and margin properties are equal
* where the text color matches the border color
* and you want to be able to customize this on specific elements

let's see how that can be done

```{code-cell}
---
slideshow:
  slide_type: slide
---
tools.sample_from_stem('../samples/25-simple-vars', {'start_with': 'css'})
```

+++ {"slideshow": {"slide_type": "slide"}}

## example 2 (advanced)

imagine you'd like to define a custom header class:

* `<h1>` elements with the `dashed` class appear with a dashed underline
* this underline has default attributes (width, height, color)
* here again you want to be able to customize this on specific elements

so in other words, write a kind-of *parameterized* class, that can be tweaked from the outside  

let's see how that can be done

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
tools.sample_from_stem('../samples/25-dashed-headers', {'start_with': 'css', height: '35em'})
```

+++ {"slideshow": {"slide_type": "slide"}}

## how it works

* properties **whose name starts with `--`** are *custom* properties
  * this naming convention should resonate (a bit) with the *dunder* names in Python
* the way to 'solve' the value of such properties  
  * is the same as for regular properties
* you can use `var()` to get the value of such a property
* and - among others - `calc()` to perform computations

+++ {"slideshow": {"slide_type": "slide"}}

## see also

* CSS-tricks' excellent summary on custom properties  
  <https://css-tricks.com/a-complete-guide-to-custom-properties/>
* the original codepen that implements parametrized underlined headers  
  <https://codepen.io/t_afif/pen/bGYEMgG>
