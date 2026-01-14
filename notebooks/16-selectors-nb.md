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
short_title: more on selectors
---

# more elaborate selectors

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

## selectors are very powerful

generally speaking, selectors can be combined to create more and more selective ones;  
for example

- `p.class1.class2 {...}`  
  **AND**: matches elements that are tagged with `<p>` and have **both** classes
- `p.class1, p.class2 {...}`  
  **OR**: will apply to `<p>` elements that have **either** one of the classes

---

## pseudo-class selectors

* pseudo-classes are set by the browser to expose  
  the status of some elements
* e.g. `a:hover` allows to match `<a>` tags  
  but **only when the mouse is hovering** above them
* similarly `a:link` matches `<a>` tags  
  that have a `href=` attribute (i.e. are real links, not just anchors)

---

### `:hover` and `:link`

to get it right, we can use the other pseudo-class `:link`  
that is set only on `<a>` tags that have a `href=` attribute

```{code-cell}
:tags: [remove-input]

hover_html = `<div>
  <a href="https://minesparis.psl.eu/" target="_">
    this is a link - hover mouse here
  </a>
  <br>
  <a name="minesparis">
    now this is an &lt;a&gt; 
    tag too but it does not react to hover
    since it is excluded from the CSS selector
  </a>
</div>`

hover_css = `/* <a> elements under a .part2
   and that have both pseudo-classes */
a:hover:link {
    font-size: 200%;
    background-color: red;
    text-decoration: none;
}`

tools.sample_from_strings({html: hover_html, css: hover_css}, {start_with: 'css'})
```

````{admonition} 2 pseudo-classes
:class: note

note that here we build a selector that applies on elements that have **both** pseudo classes, much like with regular classes
````

---

### rank of element amongst its siblings

* `:first-child`, `:last-child` : pseudo-classes  
  for what you think they do

* `:nth-child()` : can match for example the 4th child,  
  but also more usefully even/odd ranked  
  [see this page for details](https://css-tricks.com/useful-nth-child-recipies/)

---

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

---

### pseudo-class selectors (continued)

* see also [a more detailed list of pseudo-class selectors](https://css-tricks.com/pseudo-class-selectors/)
* in particular `:not()` for negations

---

## selecting X under Y (optional)

`div p`  
matches all `<p>` elements that are **below** a `<div>` element **at any depth**

`div>p`  
matches all `<p>` elements that are an **immediate child** of `<div>` element

````{admonition} note
:class: note

here the `div` and the `p` parts are selectors themselves, they can be any more specific selector, of course
````

```{code-cell}
:tags: [remove-input]

under_html = `<div>
  <p>
    a <span> span </span> as the div's grandson
  </p>
  <span> this span is div's immediate son </span>
</div>
`

under_css = `/* a <span> anywhere under <div> */
div span {
   color: red;
}

/* a <span> immediately under <div> */
div > span {
   color: green;
}
`

tools.sample_from_strings({html: under_html, css: under_css}, {start_with: 'css'})
```

---

## selecting X as a sibling of Y (optional)

`div + p`  
matches all `<p>` elements that are **immediate right sibling** of a `<div>` element

`div ~ p`  
matches all `<p>` elements that are **some right sibling** of a `<div>` element

````{admonition} what are siblings ?
:class: note admonition-small

two elements are siblings iff they have the same parent
````

```{code-cell}
:tags: [remove-input]

sibling_html = `<section>
  <p>some header</p>
  <h1>title</h1>
  <p>paragraph 1</p>
  <p>paragraph 2</p>
  <p>paragraph 3</p>
</section>
`

sibling_css = `
/* siblings have the same parent */

/* all <p> immediately after a <h1> */
h1 + p {
  color: red;
}

/* all <p> somewhere after a <h1> */
h1 ~ p {
  background-color: #ccc;
}
`

tools.sample_from_strings({html: sibling_html, css: sibling_css}, {start_with: 'css', id: 'siblings'})
```

---

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
