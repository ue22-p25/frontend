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
short_title: id and class
---

# HTML ids and classes

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

---

## the need for selectors

there is a need for more accurate / selective settings  
remember when we styled our first hyperlink ? our CSS clause was something like this:

::::{grid} 2

```css
a {
    color: red;
    font-family: times;
}
```

```{div}
but the settings apply *on **ALL `<a>` elements***  
that may be what we want, but in some cases we also need **more selective** mechanisms
```
::::
---

## `id=` : assign a unique identifier

an element that is unique in your document can be attached a **unique** identifier

```{code-cell}
:tags: [remove-input]

let id_html = `<p id="only-me">This paragraph has an id 'only-me'</p>

<p>this one does not</p>

<p id="another-id">this one has id 'another-id'</p>
`
let id_css = `/* will apply ONLY to elements that are tagged <p>
 * AND whose id is 'only-me' - and actually there's only one 
 */

p#only-me {
    background-color: pink;
}`
/*await*/ tools.sample_from_strings({html: id_html, css: id_css}, {start_with: 'html'})
```

````{admonition} no need for the tag
:class: note admonition-small

note that we have written `p#only-me`, but in this case `#only-me` would be quite enough
````

---

## `class=` : styling elements by class

* it is also possible to create arbitrary groups of elements
* so that they can be styled together
* this is simply done by setting a `class` attribute

* an element can - and often has - several classes
* e.g. `class="one-class another-class"`

```{code-cell}
:tags: [remove-input]

let class_html = `<p class="yes">yes 1</p>
<p class="no">no 1</p>
<p class="yes">yes 2</p>
<p class="no">no 2</p>
<p class="yes no">yes and no</p>
`
let class_css = `/* applies to all <p> elts
   with the 'yes' class */
p.yes {
    color: green;
}
p.no {
    background-color: red;
}
`;
/*await*/ tools.sample_from_strings({html: class_html, css: class_css})
```

---

## summary of basic selectors

let's summarize

| selector | applies to elements |
|----------|:------------|
| `p`      |  any element tagged `<p>` |
| `#someident` | that have `id='someident'` |
| `.someclass` |  that have `someclass` in their `class` attribute |

and you can create combinations, e.g.

| selector | applies to elements |
|----------|:------------|
| `h1.someclass` | tagged `<h1>` **and** of class `someclass` |
| `h1.someclass#someid` | tagged `<h1>` **and** of class `someclass` **and** with `id='someid'` |
| `.yes.no` | any element that has class `yes` **and** class `no` |

---

## cascading and inheritance

* cascading:  
  what happens if **several rules** define, say, the `color` property on an element ?
* inheritance:  
  what happens if **no rule** defines the `color` property on an element ?

in a nutshell :

| cascading | inheritance |
|-|-|
| the **most specific** rule wins | if not set on me, take the value **from my parent** |

---

## cascading  & specificity

in a nutshell, the intuition behind the specificity rules is

* the `style` attributealways wins
* otherwise if the selector specifies an `id`, it wins
* otherwise if you have specified a `class`, it will apply
* otherwise rules based on the element's *tag* will apply
* otherwise, use wildcard rules (you can use `*` as the selector)
* and finally, use the browser's default properties if set

---

````{admonition} how to compute specificity for combined selectors
:class: dropdown info

for combined selectors, specificity can be reasonably approximated as follows :

* for each property setting, compute a tuple with
  * 1 or 0 whether the property setting is in a `style=` attribute
  * number of applicable `id`s in the selector
  * number of applicable `class`es in the selector
  * number of applicable `element`s in the selector
* compare the tuples - like Python would do
````

---

## specificity example

in the 4 examples below, the CSS is unchanged throughout; we will see

1. the `<p>` element with a `style`, an `id` and a `class` attributes  
   so all the CSS rules match, but the `style=` clause wins
2. then we drop the `style` attribute, and the `id` rule wins
3. and we drop the `id` attribute, so the `class` rule wins
4. and finally when we drop the `class` attribute, and there is only one rule left to apply

---

### #(1) embedded `style=` wins

```{code-cell}
:tags: [remove-input]

let specificity1_html = `<!-- the style
     attribute trumps all -->

<p class="myclass"
   id="myid"
   style="color: purple">

Lorem ipsum dolor sit amet.
</p>`

let specificity_css = `p {
  color: green;
  font-weight: bold;
  font-size: 40px;
}

.myclass {
  color: red;
}

#myid {
  color: blue;
}`

/*await*/ tools.sample_from_strings({html: specificity1_html, css: specificity_css})
```

---

### #(2) then `id=` wins

```{code-cell}
:tags: [remove-input]

let specificity2_html = `<!--
if we drop the style=
then id wins
-->

<p class="myclass"
   id="myid">

Lorem ipsum dolor sit amet.
</p>
`
/*await*/ tools.sample_from_strings({html: specificity2_html, css: specificity_css})
```

---

### #(3) then `class=` wins

```{code-cell}
:tags: [remove-input]

let specificity3_html = `<!--
if we further drop the id=
then class wins
-->

<p class="myclass">

Lorem ipsum dolor sit amet.
</p>
`
/*await*/ tools.sample_from_strings({html: specificity3_html, css: specificity_css})
```

---

### #(4) then the element's tag wins

```{code-cell}
:tags: [remove-input]

let specificity4_html = `<!--
finally there is no ambiguity
-->

<p>
Lorem ipsum dolor sit amet.
</p>
`
/*await*/ tools.sample_from_strings({html: specificity4_html, css: specificity_css})
```

---

## inheritance

```{code-cell}
:cell_style: center
:tags: [remove-input]

let inherit_html = `<div class="inheritance">
  <p> You can use inheritance to avoid setting</p>
  <ul>
    <li> a lot of different elements</li>
    <li> using a common ancestor instead</li>
  </ul>
</div>`

let inherit_css = `.inheritance {
    color: maroon;
    font-family: times;
}`

/*await*/ tools.sample_from_strings({html: inherit_html, css: inherit_css})
```

---

### inheritance - why

the point is that we **do not** style the `<p>` and `<li>` elements specifically

so in this case the properies are fetched from their parent (the `<div>` element)

(note that not all properties behave that way though)

---

### inheritance & the `body` rule

so, it is common practice to create a rule for the `body` element  
this way we can tweak the global style of the page

```{code} css
:linenos:
:emphasize-lines: 1
body {
    font-family: Times;
    font-size: 18px;
}
```

---

## see also

here is some further reading on these topics

* list of properties and terms
  * <https://www.w3schools.com/cssref/>
* reference (hard to read) : detailed description of cascading and inheritance
  * <https://www.w3.org/TR/css-cascade-3/>
* more readable explanations on specificity :
  * <https://pawelgrzybek.com/css-specificity-explained/>
