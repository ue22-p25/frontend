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
  title: in / out-of flow
---

+++ {"tags": ["remove-input"]}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# in-flow and out-of-flow

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## default is in-flow

most of the elements we have seen so far are said to be *in-flow* :

* i.e. they show up in the order where they appear in the source
* at a position determined by the elements before them

+++

## out-of-flow is available too

* there are ways to create elements out-of-flow 
* a common practical example is a pinned header
  (or navigation bar), illustrated below

````{admonition} do not use position: fixed
:class: warning admonition-small

here we demonstrate the use of `position: sticky` to achieve this *pinned header* feature  
there is also a  - very **old-school** - `position: fixed` that can be used, but it has only drawbacks, so we'll stay away from that
````

+++ {"slideshow": {"slide_type": "slide"}}

## `sticky` example : a pinned header

```{code-cell}
:tags: [remove-input]

sticky_html = `
<div id="header">
  I am a header with <code>position: sticky</code><br>
  my background is made transparent on purpose
</div>

<div>scroll me up ! <br>
</div>

<div>you can see the header sticks at the top !</div>`

sticky_css = `
#header {
    position: sticky;
    top: 6px;

  /* everything below is just cosmetic */
    text-align:center;
    font-size: 20px;
    padding: 4px 10px;
    background-color: rgb(255 240 240 / .50);
    border: 3px solid red;
}

div:not(#header) {
    /* outline borders */
    border: 2px solid blue;
    margin-top: 20px;
    font-size: 45px;
    height: 400px;  /* fake content */
    background-color: #fafafa;
}`

tools.sample_from_strings({html: sticky_html, css: sticky_css},
                          {start_with: 'css', height: '16em'})
```

## see also

* this topic is described [at greater length in this MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/In_Flow_and_Out_of_Flow)
* css-tricks also has [a blog post dedicated to floats](https://css-tricks.com/all-about-floats/)
* **WARNING** : advised for **advanced users only**  
  * beginners should probably not try to use this at first
  * as mix-and-match of `display` and `position` settings can quickly become rather confusing  
  * see these as **last resort**, only if grid/flex really won't work for you

+++

## extras

optional topics :

* see property `z-index` to define what is on the front or in the back
* **experts** : if you believe you have a full understanding 
  of how CSS layouts work, you should [give this test a shot](https://css-tricks.com/how-well-do-you-know-css-layout/)  
  (you will feel more humble afterwards ;-)
