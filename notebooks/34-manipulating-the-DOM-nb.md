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
short_title: messing with the DOM
---

# manipulating the DOM

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

## about the DOM

* the DOM is the [tree of the HTML code, as already seen](10-html-basics-nb#label-dom-tree)
* the DOM can be read and modified in JavaScript, using the global variable `document`
* the DOM exposes a standard API, see the details on [Mozila MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

---

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

---

## messing with an element

### classes

* manage the class(es) of an element `element.classList`
  ```javascript
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

---

### properties

* to **read** a *computed* property (the one actually applied), you'd do
  ```javascript
  // e.g to read the 'background-color' property

  window.getComputedStyle(element).backgroundColor
  ```
  ````{admonition} notice the spelling
  :class: warning admonition-small

  the CSS property is called **`background-color`**, but in this context it becomes **`backgroundColor`**  
  can you figure out why the original name could not be used ?

  ```{admonition} hint
  :class: tip dropdown
  in your opinion, how would JavaScript interpret this:  
  `window.getComputedStyle(element).background-color`
  ```
  ````

* and to **set** an element property:  
  several angles are possible, here we are writing directly in the `style=` part of the element  
  and so, in line with the specificity rules, this will win over all other applicable settings
  ```
  element.style.backgroundColor = "rgb(10, 23, 255)"
  ```

---

### attributes

* read the attribute of an element `element.getAttribute("someattr")`  
  write it with `element.setAttribute("someattr", somevalue)`

````{admonition} what's an attribute again ?
:class: tip admonition-small dropdown

to set this attribute in HTML, one would have written `<div someattr="some-value">...</div>`  
not to be confused with properties !
````

````{admonition} data attributes

just so you know: best practice to store custom data in HTML elements is to use attributes named in `data-something`
````

---

## creating DOM element from scratch

* simply use e.g. `document.createElement("div")`
* mind you, sometimes - like for svg elements for example -  
  you need to specify a namespace with `createElementNS()`  
  see the cheatsheet below for an example

* in any case, **don't forget to add** the new element somewhere in the tree  
  `father.appendChild(new_node)`  
  because otherwise it won't appear in the page at all !

---

## summary / cheatsheet

click on 'Open in new window' to see a cheatsheet that contains all this

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem(
  "_static/cheatsheet",
  {sources_show: false, separate_width: "1000px", separate_height: "800px"},)
```

````{admonition} other ways to access the cheatsheet
:class: dropdown

* if you have cloned the course repo: open `notebooks/_static/cheatsheet.html`
* also there used to be [a bookmarkable link](cheatsheet) - but it might be broken now
````

---

## practice: a dynamic grid - step 1

now could be a [right time to start the dynamic grid exercise on github](42-exo-grid-nb#label-tp-grid) !

start with just Step 1:

* write a function that adds a line,
* and see the initial examples on how to attach that function to the button
