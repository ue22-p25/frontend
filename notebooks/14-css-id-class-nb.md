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
  title: id and class
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# HTML ids and classes

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"tags": ["gridwidth-1-2"]}

## the need for selectors

there is a need for more accurate / selective settings  
remember when we styled our first hyperlink ? our CSS clause was something like this:

+++ {"tags": ["gridwidth-1-2"]}

```
a {
    color: red;
    font-family: times;
}
```

+++ {"tags": []}

however it will apply the settings *on **ALL `<a>` elements***  
that may be what we want, but in some cases we also need **more selective** mechanisms

+++

## `id=` : assign a unique identifier

* an element that is unique in your document
* can be attached a unique identifier

```{code-cell}
:tags: [remove-input]

id_html = `<p id="only-me">This paragraph has an id 'only-me'</p>

<p>this one does not</p>

<p id="another-id">this one has id 'another-id'</p>
`
id_css = `/* will apply ONLY to elements that are tagged <p>
 * AND whose id is 'only-me' - and actually there's only one 
 */

p#only-me {
    background-color: pink;
}`
tools.sample_from_strings({html: id_html, css: id_css}, {start_with: 'html'})
```

+++ {"slideshow": {"slide_type": "slide"}}

````{admonition} no need for the tag
:class: note admonition-small

note that we have written `p#only-me`, but in this case `#only-me` would be quite enough
````

```{code-cell}
:tags: [remove-input]

id2_html = `<div id="an-id">
This div element has its id set to <code>an-id</code>
<br>
and the css selector here does not need the html tag at all
</div>`

id2_css = `/* applies to elements
 * whose id is 'an-id'
 * regardless of the tag */

#an-id {
    background-color: blue;
    color: white;
}`

tools.sample_from_strings({html: id2_html, css: id2_css}, {start_with: 'css'})
```

## `class=` : styling elements by class

* it is also possible to create arbitrary groups of elements
* so that they can be styled together
* this is simply done by setting a `class` attribute

* an element can - and often has - several classes
* e.g. `class="one-class another-class"`

```{code-cell}
:tags: [remove-input]

class_html = `<p class="yes">yes 1</p>
<p class="no">no 1</p>
<p class="yes">yes 2</p>
<p class="no">no 2</p>
<p class="yes no">yes and no</p>
`
class_css = `/* applies to all <p> elts
   with the 'yes' class */
p.yes {
    color: green;
}
p.no {
    background-color: red;
}
`;
tools.sample_from_strings({html: class_html, css: class_css})
```

## summary of basic selectors

let's summarize

| selector | applies to elements |
|----------|:------------|
| `p`      |  any element tagged `<p>` |
| `#someident` | that have `id='someident'` |
| `.someclass` |  that have `someclass` in their `class` attribute |
| `h1.someclass` | tagged `<h1>` **and** of class `someclass` |
| `h1.someclass#someid` | tagged `<h1>` **and** of class `someclass` **and** with `id='someid'` |
| `.yes.no` | any element that has class `yes` **and** class `no` |

+++

## cascading and inheritance

* cascading : what happens if **several rules** define,  
  say, the 'color' property on one element ?
* inheritance : what happens if **no rule** defines  
  the 'color' property on an element ?
* in a nutshell :

| cascading | inheritance |
|-|-|
| the **most specific** rule wins | if not set on me, take the value **from my parent** |

+++

## cascading  & specificity

in a nutshell, the intuition behind the actual rules is that

* if you have defined a property in a `style` attribute, i.e. in the very node, it means you want this property to apply
* otherwise if the selector specifies an `id`, this means you expect this setting to be valid on that node
* otherwise if you have specified a `class`, it should apply
* otherwise if the rule is based on the element's *tag*, it should apply
* otherwise, if it is a wildcard rule (you can use `*` as the selector)

+++

````{admonition} how to compute  specificity
:class: dropdown info

selectors can be more convoluted than what we've seen so far,  
(more on this later on) but the logic to compare  
specificity can be reasonably approximated as follows :

* for each property setting, compute a tuple with
  * 1 or 0 whether the property setting is in a `style=` attribute
  * number of applicable `id`s in the selector
  * number of applicable `class`es in the selector
  * number of applicable `element`s in the selector
* compare the tuples - like Python would do
````

+++

## specificity example

in the 4 examples below, the CSS is unchanged throughout; we will see

1. the `<p>` element with a `style`, an `id` and a `class` attributes  
   so it would match all the CSS rules
1. then we drop the `style` attribute
1. and then the `id` attribute
1. and finally when we drop the `class` attribute  
   there is only one rule left to apply

+++ {"slideshow": {"slide_type": "slide"}}

### #(1) embedded `style=` wins

```{code-cell}
:tags: [remove-input]

specificity1_html = `<!-- the style
     attribute trumps all -->

<p class="myclass"
   id="myid"
   style="color: purple">

Lorem ipsum dolor sit amet.
</p>`

specificity_css = `p {
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

tools.sample_from_strings({html: specificity1_html, css: specificity_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

### #(2) then `id=` wins

```{code-cell}
:tags: [remove-input]

specificity2_html = `<!--
if we drop the style=
then id wins
-->

<p class="myclass"
   id="myid">

Lorem ipsum dolor sit amet.
</p>
`
tools.sample_from_strings({html: specificity2_html, css: specificity_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

### #(3) then `class=` wins

```{code-cell}
:tags: [remove-input]

specificity3_html = `<!--
if we further drop the id=
then class wins
-->

<p class="myclass">

Lorem ipsum dolor sit amet.
</p>
`
tools.sample_from_strings({html: specificity3_html, css: specificity_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

### #(4) then the element's tag wins

```{code-cell}
:tags: [remove-input]

specificity4_html = `<!--
finally there is no ambiguity
-->

<p>
Lorem ipsum dolor sit amet.
</p>
`
tools.sample_from_strings({html: specificity4_html, css: specificity_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

## inheritance

```{code-cell}
:cell_style: center
:tags: [remove-inputut, remove-input]

inherit_html = `<div class="inheritance">
  <p> You can use inheritance to avoid setting</p>
  <ul>
    <li> a lot of different elements</li>
    <li> using a common ancestor instead</li>
  </ul>
</div>`

inherit_css = `.inheritance {
    color: maroon;
    font-family: times;
}`

tools.sample_from_strings({html: inherit_html, css: inherit_css})
```

### inheritance - why

the point is that

* we **do not** style the `<p>` and `<li>` elements specifically
* so in this case the properies are fetched
  * from their parent (the `<div>` element)
  * that **is targetted** by our CSS rule
* note that not all properties behave that way though

+++

### inheritance & the `body` rule

* however, it is common practice to create a rule  
  whose selector targets the `body` element  
  to tweak the global style (typically `font-family` and `font-size`)
  
```css
body {
    font-family: Times;
    font-size: 18px;
}
```

+++

## see also

here is some further reading on these topics

* list of properties and terms
  * <https://www.w3schools.com/cssref/>
* reference (hard to read) : detailed description of cascading and inheritance
  * <https://www.w3.org/TR/css-cascade-3/>
* more readable explanations on specificity :
  * <https://pawelgrzybek.com/css-specificity-explained/>
