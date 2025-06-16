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
  title: more selectors
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# more elaborate selectors

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## selectors are very powerful

generally speaking, selectors can be combined to create more and more selective ones; for example

- **AND**:  
  `p.class1.class2 {...}` matches elements that are tagged with `<p>` and have **both** classes
- **OR**:  
  `p.class1, p.class2 {...}` will apply to `<p>` elements that have **either** one of the classes

+++

## selecting X under Y

`div p`  
matches all `<p>` elements that are **below** a `<div>` element **at any depth**

`div>p`  
matches all `<p>` elements that are an **immediate child** of `<div>` element

````{admonition} note
:class: note

here the `div` and the `p` parts are selectors themselves, they can be any more specific selector, of course
````

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
under_html = `<div>
  <span>
    <p> at level 2 under div </p>
  </span>
  <p> immediately under div </p>
</div>
`

under_css = `/* a <p> anywhere under <div> */
div p {
   color: red;
}

/* a <p> immediately under <div> */
div > p {
   color: blue;
}
`

tools.sample_from_strings({html: under_html, css: under_css}, {start_with: 'css'})
```

## selecting X as a sibling of Y

`div + p`  
matches all `<p>` elements that are **immediate right sibling** of a `<div>` element

`div ~ p`  
matches all `<p>` elements that are **some right sibling** of a `<div>` element

````{admonition} what are siblings ?
:class: note

two elements are siblings iff they have the same parent
````

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
sibling_html = `<div>
  <p>paragraph 1</p>
  <div>
    <p>child paragraph</p>
  </div>
  <p>paragraph 2</p>
  <p>paragraph 3</p>
</div>
`

sibling_css = `
/* siblings must have the same parent */

/* all <p> immediately after a <div> */
div + p {
  color: red;
}

/* all <p> somewhere after a <div> */
div ~ p {
  background-color: #ddd;
}
`

tools.sample_from_strings({html: sibling_html, css: sibling_css}, {start_with: 'css', id: 'sibling'})
```

## pseudo-class selectors

* pseudo-classes are set by the browser to expose  
  the status of some elements
* e.g. `a:hover` allows to match `<a>` links  
  but only when the mouse is hovering above them

+++

### `:hover` pseudo-class

a first, not-quite-working example (at least on Chrome)

```{code-cell}
:tags: [remove-input]

hover1_html = `<div id="part1">
  <a href="https://minesparis.psl.eu/" target="_">
a regular link is unsensitive to hovering</a>
</div>

<div class="part2">
  <a href="https://minesparis.psl.eu/" target="_">
     this one reacts if you hover mouse here</a>
  <br>
  <a name="minesparis">
     this is an anchor tag,
     it reacts to mouse presence
     (at least on Chrome), that is not what we want</a>
</div>`

hover1_css = `.part2 a:hover {
    font-size: 300%;    background-color: red;
    text-decoration: none;
}
a {
    font-size: 200%;
}`

tools.sample_from_strings({html: hover1_html, css: hover1_css}, {start_with: 'css'})
```

### `:hover` and `:link`

to get it right, we can use the other pseudo-class `:link`  
that is set only on `<a>` tags that have a `href=` attribute

```{code-cell}
:tags: [remove-input]

hover2_html = `<div id="part1">
  <a href="https://minesparis.psl.eu/" target="_">
     a regular link</a>
</div>

<div class="part2">
  <a href="https://minesparis.psl.eu/" target="_">
     hover mouse here</a>
  <br>
  <a name="minesparis">now this anchor tag
     is excluded from the CSS selector, so it behaves
     as expected</a>
</div>`

hover2_css = `/* <a> elements under a .part2
   and that have both pseudo-classes */
.part2 a:hover:link {
    font-size: 300%;
    background-color: red;
    text-decoration: none;
}
a {
    font-size: 200%;
}`

tools.sample_from_strings({html: hover2_html, css: hover2_css}, {start_with: 'css'})
```

+++ {"tags": []}

````{admonition} 2 pseudo-classes
:class: note

note that here we build a selector that applies on elements that have **both** pseudo classes, much like with regular classes
````

+++

### rank of element amongst its siblings

* `:first-child`, `:last-child` : pseudo-classes  
  for what you think they do

* `:nth-child()` : can match for example the 4th child,  
  but also more usefully even/odd ranked  
  [see this page for details](https://css-tricks.com/useful-nth-child-recipies/)

+++ {"slideshow": {"slide_type": "slide"}}

### `nth-child() example`

```{code-cell}
:tags: [remove-input]

rank_html = `<ul>
  <li>the first bullet</li>
  <li>the 2nd bullet</li>
  <li>the 3rd bullet</li>
  <li>the 4th bullet</li>
  <li>the 5th bullet</li>
  <li>the 6th bullet</li>
  <li>the 7th bullet</li>
  <li>the 8th bullet</li>
</ul>
`;
rank_css = `li:nth-child(2n+1) {
  background-color: #fee; /* pink-ish */
}
li:nth-child(3n) {
  background-color: #eef; /* blue-ish */
}
li {
    font-size: 200%;
}`;
tools.sample_from_strings({html: rank_html, css: rank_css}, {start_with: 'css'})
```

+++ {"slideshow": {"slide_type": "slide"}}

### pseudo-class selectors (continued)

* see also [more detailed list of pseudo-class selectors](https://css-tricks.com/pseudo-class-selectors/)
* in particular `:not()` for negations

+++

## attribute selectors (advanced)

* HTML elements can have arbitrary attributes,  
  not just `id`, `class`, `href`, ...

* it is possible to write selectors that match  
  on the **value** of a given attribute

* for example  
  `a[href="https://www.google.com/"]`  
  would match only the links to google

* [read more on this here](https://css-tricks.com/almanac/selectors/a/attribute/)

```{admonition} on any attribute
:class: seealso

of course this technique applies to any attribute, not just `href=`
```
