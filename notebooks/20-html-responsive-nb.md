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
short_title: responsiveness
---

# responsiveness

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

## responsive, meaning ?

* as opposed to a Word document - designed for a fixed page size
  * a web page gets displayed on **many** different devices (computer, phone, tablet)
  * even on the computer, windows can be **resized** arbitrarily
* a responsive page **adapts** its layout to the **device size**
  * technically the visible area is called the **viewport**

---

this means that for example, we want to obtain different layouts for the same content, depending on the screen size  

```{figure} media/responsive-layouts.excalidraw.svg
:align: center
:width: 600px

the same content seen through different viewport geometries
```

::::{admonition} logical zoom

* be aware also that **all browsers** have a feature that let users artificially zoom in and out
  * e.g. on Chrome on the mac, this is activated with `⌘ +` and `⌘ -`
* this also triggers changes, to which
  **responsive** pages are expected to **react** properly
::::

---

## default layout policy

* if you do not override the `display:` property, you use a **historical** layout policy
* very well summarized in [this document on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow) (MDN = Mozilla Developer Network)
* mostly fits a written document flow (think, a **Word document**)
* **not at all suited** for a responsive design

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/css-display-block-inline.png
:align: center
```

---

##  `display` property : basic policies

* layout policy is primarily materialized in the **`display` property**
* its value can be
  * `display: inline` - this is the default for `<span>`
  * `display: block` - this is the default for `<div>`
* these account for these legacy "document-oriented" policies  
  that have been supported from the very beginning of the Web
  * well illustrated [on this page on css-tricks.com](https://css-tricks.com/almanac/properties/d/display/)

---

## `display` - modern alternatives

good news is, there are more modern values, especially designed for responsive layouts:

* `display: grid` (**2-dimensional**) like the name suggests,  
  allows to define a **rectangular area** as an array of rows and columns

* `display: flex` (**1-dimensional**) a flexible layout,  
  with more control on how children will **fill the available space**

we will study these 2 policies in the following notebooks

---

## `display: none`

ther's also a special value worth mentioning here:

* one specific value is `display: none`
* in that case the element is still present in the DOM
* but it **won't show up at all** in the rendered page
* very often used in JavaScript to temporarily hide/show elements (more on JS later)

---

### `display: none` illustrated

```{code-cell}
:tags: [remove-input]

display_none_html = `<p> an element can easily be 'hidden' from the output </p>

<p id="do-not-show"> let us hide this part altogether </p>

<p> the #do-not-show node is not rendered</p>`

display_none_css = `#do-not-show {
    display: none;
    background-color: red;
}`
tools.sample_from_strings({html: display_none_html, css: display_none_css})
```
