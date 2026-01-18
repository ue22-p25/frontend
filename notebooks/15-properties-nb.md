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
short_title: CSS properties
---

# CSS main properties

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

## too many to be listed

* more than 100 properties defined in the standard ([see full list here](https://www.w3schools.com/cssref/))
* we just mention the most obviously needed

---

## text properties

```{code-cell}
:cell_style: center
:tags: [remove-input]

let text_html = `<p class="text">
a sample text</p>`;

let text_css = `.text {
    font-family: times;
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
    color: darkolivegreen;
}
`;
await tools.sample_from_strings({html: text_html, css: text_css}, {start_with: 'css'})
```

---

## many fonts available

* see for example [a collection of google fonts](https://fonts.google.com/)
* note also some less traditional fonts
  * that come with usual symbols
  * see [in particular *fontawesome*](https://fontawesome.com/icons?d=gallery&m=free) who offer a decent collection for free

the example below illustrates how to load and use them in your page

```{code-cell}
:tags: [remove-input]

await tools.sample_from_stem("../samples/15-font-demo")
```

::::{admonition} notes (1): a single CSS rule
:class: tip dropdown

* observe **the single CSS** rule here, that allows to apply the font **to the whole document**
  this is an example of *inheritance*

* btw, it is strongly recommended to avoid mixing fonts in a document
::::

::::{admonition} notes (2): how to use `fontawesome`
:class: tip dropdown

* also observe the import and use of *fontawesome*
  to display custom symbols before address and phone number, like

  ```html
  <span class="fas fa-mobile-alt">
  ```

  that I found [browsing the fontawesome catalog](https://fontawesome.com/v6/icons)

* these symbols are more convenient than bitmap pictures
  in particular can be safely scaled / colorized using CSS

```{admonition} the names may change
:class: warning

**BEWARE** the names may change with the version of *fontawesome*, and so of course you must pick a name that is defined in the version of fontawesome that you have imported in your page
::::


::::{admonition} notes (3): to import all font variants
:class: tip dropdown

* for cosmetic reasons, the example is a bit simplified
* in real pages, use something like this to import a font in all variants of bold/italic

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Raleway:200,200i,400,400i,500,500i,600,600i,700,700i">
```

::::

---

## Unicode characters

* also remember there are more than 150.000 characters defined in the Unicode standard; so without the need to switch to another font, you can just write things like these
  ︙→ ⇀ « » ❯ × ∑ ∀α ∃ε ∈ x² © …

* being part of a text, these can also be safely styled - i.e. scaled, coloured&hellip;  
  as opposed, again, to using bitmap pictures

```{code-cell}
:tags: [remove-input]

await tools.sample_from_strings({
    html :
    `<div>
︙→ ⇀ « » ❯ × ∑ ∀α ∃ε ∈ x² © …
<div>`
    ,
    css : `body {
    color: red;
    font-size: 18px;
    padding: 20px;
}
`
}, {iframe_max_height: 80})
```

::::{admonition} input-methods (1): cut-n-paste
:class: tip dropdown

if you need to insert e.g. the ℃ symbol, you can do it several ways :

**easiest way** : just cut-and-paste it right into the html as-is (provided that your html file is utf8-encoded)
::::

::::{admonition} input-methods (2): using shortnames like `&lt;`
:class: tip dropdown

some characters can be inserted with the `&...;` notation using nicknames, like e.g.

* `&lt;` for &lt; and `&gt;` for &gt;
  sometimes useful to actually insert brackets like in &lt;code&gt;

* `&nbsp;` for a non-breaking&nbsp;space
  which is more explicit/readable

* `&hellip;` for ellipsis &hellip;

:::{code-cell}
:tags: [remove-input]
await tools.sample_from_strings({
    html :
    `<div>
here's how to obtain an HTML tag:
&amp;lt;code&amp;gt; ... &amp;lt;/code&amp;gt;

<br>

most current characters also have a nickname,
here's an ellipsis: &amp;hellip;
</div>`
    ,
    css : `body {
    color: blue;
    font-size: 18px;
    padding: 20px;
}`
})
:::

::::

::::{admonition} input-methods (3): using Unicode codepoints (optional)
:class: tip dropdown

each Unicode character has a unique codepoint
you can use that in a pure-ASCII source, and  write either

* `&#8451;` (decimal) or
* `&#x2103;` the `x` stands for hexa

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/unicode-celsius.png
:align: center
:width: 300px
```

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/convert-unicode.png
:align: center
:width: 300px
```
::::

---

## the box model

so much about fonts and text, now for something completely different:  
each visible element can be styled according to the box model, as shown in the browser devel tools

::::{grid} 2

```{image} media/box-model.png
:align: center
```

````{admonition} padding, border, and margin
as you can see

* padding is **inside the border**
* margin is **outside the border**
````

::::

note that the margin area is technically **not part of the element** !  
it is just a space around it, that remains transparent (so colored by parent)

---

### atomic properties

each side (top, right, bottom, left) of the box has its own individual properties
here e.g. we illustrate this with *padding* and *border*

click on *Open in new window* and use inspector on the `<p>` element

```{code-cell}
:tags: [remove-input]

let box1_html = `<p class="box1">
a box
</p>`

let box1_css = `p.box1 {
    font-size: x-large;
    background-color: #ccc;

    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 5px;
    padding-left: 40px;

    border-bottom-width: 5px;
    border-bottom-color: black;
    border-bottom-style: solid;
}`

await tools.sample_from_strings({html: box1_html, css: box1_css}, { start_with: 'css' })
```

::::{admonition} another example: margin and border
:class: tip dropdown


again with also *margin* and *border-radius* - nothing really new, but you can see the combinations are likely to be numerous ...

```{code-cell}
:tags: [remove-input]

let box2_html = `<p class="box2">
a second box
</p>`

let box2_css = `p.box2 {
    font-size: x-large;

    background-color: #ccc;

    padding-left: 40px;
    padding-top: 10px;

    margin-left: 20px;
    margin-top: 30px;

    border-top-width: 5px;
    border-top-color: black;
    border-top-style: solid;

    border-left-width: 10px;
    border-left-color: red;
    border-left-style: solid;

    border-top-left-radius: 5px;
}`

await tools.sample_from_strings({html: box2_html, css: box2_css}, { start_with: 'css' })
```

::::

---

### shorthand properties

of course this can become quite tedious !

so there also are so-called *shorthand properties*  
that allow to set **several atomic properties in a single line**

this is available for dealing with paddings, margins, borders, fonts, among others&hellip;

---

### box-related shorthands order

one trick is to remember this figure

```{image} media/box-sides-order.png
:align: center
:width: 400px
```

* `padding: 10px 20px 30px 40px` will assign the 4 padding properties in the order above
* `padding: 10px` will set all 4 *padding* properties
* `margin: 10px 20px` will set top *and bottom* to `10px`, and *both* sides to `20px`

---

## unit lengths

a great many deal of units are available to express lengths - [see more details on this page](https://css-tricks.com/the-lengths-of-css/) , e.g. :

* `10px`
* `1in`, `2.54cm`, `25mm`
* `20pt` (1pt = 1/72 inch)
* `2em`, `1ex`, `20ch`, relative to current font size
* `80%` typically for width and height, relative to parent element
* `90vh` means 90% of the viewport height - try it out ! and there is `vw` for the viewport width

---

## colors

several formats are supported to describe a color :

* common colors by name, like `red` ([see full list](https://www.w3schools.com/colors/colors_names.asp))
* RGB components like `#8000ff` that means
  * red = 0x80 = 128, green = 0x00 = 0, blue = 0xff = 255
* same in decimal - the recommended way:
  * **`rgb(128 0 255)`**
* **opacity** (in the [0-1.] range can be given as a fourth argument
  * **`rgb(128 0 255 / 20%)`** will be only 20% opaque, i.e. almost transparent

you can read [more on this on css-tricks](https://css-tricks.com/almanac/properties/c/color/)

::::{admonition} a useful site to pick colors: colorhunt.co
:class: tip dropdown
* like always, many online sites can help pick a decent color palette
  * personnally I like this one <https://colorhunt.co/palette>

```{admonition} tip
:class: tip

note that on colorhunt you can copy a color code by just clicking it
```

::::

---

## more shorthands

same kind of shorthands are available for

* `font: xxx` [see details here](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#font_properties)
* `border: xxx` [see details here](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#background_properties)
* for a more complete list, [see this page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)

::::{admonition} an example with multiple shorthand properties
:class: tip dropdown

use the inspector from the devel tools to check the individual properties of the `<p>` elt, e.g. the `padding`

```{code-cell}
:tags: [remove-input]

let shorthand_html = `<div>
  some <span>text</span>
with shorthand properties
</div>
`

let shorthand_css = `body{
    font: italic 10pt "Arial", serif;
}
div {
    border: 2px dashed blue;
    border-radius: 5px;
    padding: 20px 5px;
}
span {
    background-color: #ddf;
    padding: 2px 10px;
}
`
await tools.sample_from_strings({html: shorthand_html, css: shorthand_css}, {start_with: 'css'})
```

::::

---

## `background`

there are 8 elementary properties that make an element's background

|  |  |
|---------------|---------------|
| `background-color` | `background-image` |
| `background-repeat` | `background-position` |
| `background-size` | `background-attachment` |
| `background-origin` | `background-clip` |

---

### `background` shorthand

most often this is set through a unique shorthand property `background`

<https://css-tricks.com/almanac/properties/b/background/>

also note that background only covers the **padding area**

::::{admonition} remainders about the margin
:class: warning

- remember the margin area is **not technically part of the element** !  
  so to style the margin area, you must style the parent element !
- and that two consecutive margins do not 'add', they 'max'  
  e.g. if one element has `margin-bottom: 20px`,  
  and the one below has `margin-top: 30px`,  
  the effective margin between them will be 30px (the maximum of both)
::::

---

## `box-sizing` (optional)

the `box-sizing` property affects the way `width` and `height` properties are computed:

* `box-sizing: content-box` : only take content into account
* `box-sizing: border-box` : content + padding + border

(note that margins are **always excluded**)

not often needed, but typical use case is

* you want a given component to take 500px **in total**
* so the borders and paddings *push content inside*
* then use `box-sizing: border-box`

see also <https://css-tricks.com/box-sizing/>
that has a live demo, as well as <https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing#browser_compatibility>
