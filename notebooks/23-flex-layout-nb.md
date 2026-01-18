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
short_title: flex layout
---

# `display: flex`

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

## purpose

`flex` is another modern layout engine that tries to solve or at least alleviate  
the obvious deficiencies of the old-school `block` model and related tools

* as opposed to grids, it is concerned with **1-dimension** flow of data
* it **complements nicely** what is doable with grids

---

````{admonition} as per MDN
:class: admonition-small

as per [this article on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox):

> The following simple layout requirements are either difficult or impossible to achieve with such tools, in any kind of convenient, flexible way:

> * Vertically centering a block of content inside its parent.
> * Making all the children of a container take up an equal amount of the available width/height, regardless of how much width/height is available.
> * Making all columns in a multiple column layout adopt the same height even if they contain a different amount of content.
````

---

## ex1 - default is `row nowrap`

by default, `direction: row`, `wrap: nowrap`

```{code-cell}
:tags: [remove-input]

let flex1_html = `<div class="container">
<div class="item"> Dolor quiquia </div>
<div class="item"> aliquam </div>
<div class="item"> sed numquam </div>
<div class="item"> voluptatem </div>
<div class="item"> quisquam modi. </div>
</div>`

let flex1_css = `/* the important part is just this */
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

/*await*/ tools.sample_from_strings({html: flex1_html, css: flex1_css}, {id: 'flex1', start_with: 'css'})
```

---

## ex2 - `flex-wrap: wrap`

identical except that we specify `flex-wrap: wrap`

```{code-cell}
:tags: [remove-input]

let flex2_html = `<div class="container">
<div class="item"> Dolor quiquia </div>
<div class="item"> aliquam </div>
<div class="item"> sed numquam </div>
<div class="item"> volup&shy;tatem </div>
<div class="item"> quisquam modi. </div>
</div>`

let flex2_css = `.container {
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

/*await*/ tools.sample_from_strings({html: flex2_html, css: flex2_css}, {id: 'flex2', start_with: 'css'})
```

---

## assignment: the css-tricks page

the `flex` display is an extremely powerful tool for fine-grained control over your layout  
to deepen your understanding of it :

* [this page on css-trick.com](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is an easy, and very complete, read on flex
* it is again **strongly recommended** that you browse it thoroughly
    to get a perception of what is doable with this layout

---

## grid's and flex's

* as mentioned earlier, both display policies have their own pros and cons
* you should not think in terms or one **or** the other
* but rather in terms of using **both** depending on the situation
* so **do not hesitate** to define **nested** layouts  
  with flex's in grid's in flex's in grid's ... as needed
* this is why the `<div>` tag is soooo all over the place

---

## practice: layout a header

mimick the layout below

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem("../samples/23-exo-flex", {sources_show: false})
```

::::{admonition} tip: `width: 100%`
:class: tip

in addition to using a `flex` display, you will probably need to set `width: 100%` on some elements to achieve this
::::

::::{admonition} use vs-code tricks
:class: note

see a few tricks to help you take full advantage of vs-code's features, and notably to

- [format your code](61-vs-code-tricks-nb#label-format-document)
- [indent and outdent code blocks](61-vs-code-tricks-nb#label-indent-outdent)
- [use Emmet wrap](61-vs-code-tricks-nb#label-emmet-wrap) to easily insert a `<div>` in your HTML
- [define keyboard shortcuts](61-vs-code-tricks-nb#label-custom-keybinding) to speed up your coding

::::

::::{admonition} optional activity
:class: dropdown seealso

Flexbox Froggy <https://flexboxfroggy.com/> is a game to practice the flexbox properties
::::

---

## challenge (optional)

if you believe you have a full understanding of how CSS layouts work,  
you should [give this test a shot](https://css-tricks.com/how-well-do-you-know-css-layout/) 
(and you will feel more humble afterwards ;-)
