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
---

# CSS basics

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

CSS = Cascading Style Sheets

---

## purpose of a style sheet

* keep contents and presentation separate
* allow to adapt same contents
  * to different media
  * to differents tastes (themes)
* generally written by people with different background and sensibility

  * engineers *vs* designers

### what can be styled ?

* short answer : virtually everything
* let's start with the obvious

---

## text properties

* `font-family` : e.g. Times
* `font-size` : e.g. 12px
* `font-weight` : e.g. bold
* `font-style` : e.g. italic
* `text-decoration` : e.g. underline
* … and a whole many more

```{figure} media/list-properties-all.png
:align: center

how to inspect an element's properties
```

```{figure} media/list-properties-filtered.png
:align: center

you can also filter the list of properties
```

---

## first example

* we create a hyperlink to google
* we attach a CSS fragment to change its appearance
* **warning** this changes **all the `<a>` elements** on that page

```{code-cell}
:tags: [remove-input]

let link_html = `<a href="https://www.google.com" target="_">
link to google
</a>
`
let link_css = `/* change these properties
   on all <a> elements in the page */
a {
    font-family: times;
    font-size: large;
    color: red;
    padding: 10px;
    border: 1px solid green;
    border-radius: 8px;
    text-decoration: none;
}`
/*await*/ tools.sample_from_strings({html: link_html, css: link_css}, {start_with: "css"})
```

::::{admonition} what with `target` thing ?
:class: tip admonition-smaller dropdown
here we also set `target="_"` so that the link opens in another tab (or window) - instead of replacing the current page !
::::
---

## vocabulary: properties

* the names that appear on the left hand side of the `:` colon   
  like `color`, `font-family`, …

* are called **properties**
* also listed in the `Elements` tab of the devel tools,  in the `Computed` pane
* [several hundreds of them](https://css-tricks.com/how-many-css-properties-are-there/)
  * note that not all properties are relevant on all elements

```{figure} media/vocabulary-html.excalidraw.svg
:class: figure-outline admonition-smaller
recap vocabulary on HTML
```

```{figure} media/vocabulary-css.excalidraw.svg
:class: figure-outline admonition-smaller
recap vocabulary on CSS
```

---
 
## how to locally override properties

````{admonition} practice
:class: seealso

- open the example above in a new (separate) window
- inspect the link
- use the devel tools to manually set some properties
  - try e.g. `background-color: red`, or
  - `background-color: #ccc`
````

to do that you need to go in this area of the *Devel Tools*
```{image} media/override-properties.png
:align:center
```

````{admonition} volatile changes

this way you can quickly decide what works best; note that these changes are volatile of course, so you will still need to put the change in your sources somewhere, if that deserves to remain permanent
````
