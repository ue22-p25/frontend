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
  title: messing with the DOM
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++ {"slideshow": {"slide_type": "-"}}

# manipulating the DOM

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"slideshow": {"slide_type": "slide"}}

## about the DOM

* the DOM is the tree of the HTML code, as already seen
* the DOM can be read and modified in JavaScript, using the global variable `document`
* the DOM exposes a standard API, see the details on [Mozzila MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

+++

## spotting elements in the DOM

* get element by their id: `document.getElementById("some-id")`
* get all elements matching a selector `document.querySelectorAll(".the-class")`  
  this kind of functions also work from a given element, for exemple:
  ```javascript
  // spot one specific element in the tree
  const root = document.getElementById("some-id")

  // find all elements under 'root' with class 'the-class'
  root.querySelectorAll(".the-class")
  ```

+++

## messing with an element

### classes

* manage the class(es) of an element `element.classList`
  ```
  // add a class
  element.classList.add("another-class")
  // remove a class
  element.classList.remove("another-class")
  // remove or add
  element.classList.toggle("some-class")
  ```

  ```{admonition} often the simplest way
  instead of messing with individual properties, it is often simpler for the JS code to just add / remove classes in DOM elements, and let the CSS do the heavy lifting
  ```

### properties

* **read** a *computed* property (the one actually applied)
  ```
  window.getComputedStyle(element).backgroundColor
  ```
  ````{admonition} notice the spelling
  :class: warning admonition-small
  
  the CSS property is called **`background-color`** but in this context it becomes **`backgroundColor`**  
  can you figure out why the original name could not be used ?
  ````
* **set** an element property  
  several angles are possible, here we are writing directly in the `style=` part of the element  
  and so, in line with the specificity rules, this will win over all other applicable settings
  ```
  element.style.backgroundColor = "rgb(10, 23, 255)"
  ```

### attributes

* read the attribute of an element `element.getAttribute("someattr")`  
  write it with `element.setAttribute("someattr", somevalue)`
  ````{admonition} what's an attribute again ?
  :class: tip admonition-small

  to set this attribute in HTML, one would have written `<div someattr="some-value">...</div>`  
  not to be confused with properties !
  ````

+++

## creating DOM element from scratch

* simply use e.g. `document.createElement("div")`
* mind you, sometimes - like for svg elements for example
  you need to specify a namespace with `createElementNS()`  
  see the cheatsheet for an example
* in any case, **don't forget to add** the new element somewhere in the tree  
  `father.appendChild(new_node)`

+++ {"slideshow": {"slide_type": "slide"}}

## summary / cheatsheet

you can find a cheatsheet that contains all this:

* there is [this bookmarkable link](cheatsheet) - (you might want to open it in a new window)
* if you have cloned the course repo: open `notebooks/_static/cheatsheet.html`
* from within this notebook: eval next cell

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("_static/cheatsheet", {sources_show: false})
```

````{admonition} practice
:class: seealso
now could be a [right time to start the dynamic grid exercise](https://github.com/ue22-p24/web-grid)  

start with just Step 1:
* write a function that adds a line, and
* and see the initial examples on how to attach that function to the button
````
