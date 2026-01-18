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
---

# JavaScript by examples

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## why JavaScript

JavaScript comes in addition to

* HTML for **content**
* CSS for **style**

JavaScript

* it is a full-fledged **programming language**
* and provides for **behaviour**

````{admonition} focusing on the the browser runtime (♡)
:class: note dropdown
:label: label-browser-runtime

for your information, one can also write "regular" programs in JS using the `node.js`&nbsp;runtime


```bash
# here how to start a node.js session
$ node
Welcome to Node.js v12.5.0.
Type ".help" for more information.
> console.log("hello world")
hello world
> process.exit()
$
```
however in this course we focus on **JavaScript for the Web browser**

````



---

## JavaScript characteristics

* runs **inside the browser**(♡)
* has direct **access to the DOM**
* so it can freely **manipulate the HTML**
* in order to add / remove / **modify content**
* and/or dynamically **change properties**
* in response to e.g. **user-triggered events**

let's start with a few examples that use JS  
objective is just to give you a glimpse of what is possible, will dig on details later on

---

## example #1

in the following example :

* HTML has two elements `#button` et `#area`
* one acts as a button, that can make  the other one visible or not
* for that we create a **JavaScript function** named `toggle()`
* that locates the `#area` element and changes its `display` property
* and then `toggle()` is bound to the `click` event of the button element  
  (using the `onclick` property)

---

```{code-cell}
:tags: [remove-input]

await tools.sample_from_stem("../samples/30-js-intro-01-on-off", {start_with: 'js'})
```

---

### ex1 - takeaways (1)

* we can defined **functions** in JS
* the JS code can access the HTML tree (the DOM) and alter it  
* we can attach a JS-written behaviour (`toggle()`)  
* to a user-triggered **event** (mouse click in an element) - named a **callback** function

---

### ex1 - takeaways (2) - scope

about visibility of symbols: variable and function names

* **global** variables `document` and `console` allow to access browser components
* the `function toggle() ..` statement defines a **global** variable `toggle`
* **local** variables inside `toggle` are declared with `let` (or `const`, see below)
* in HTML, we set the `onclick` property on `#button`  
  it is a JavaScript fragment that refers to the global `toggle` function

::::{admonition} variable declaration with `const`
:class: dropdown tip

in addition to `let`, there's a `const` keyword too to declare a variable whose content is, well, constant;  
and in fact here we could/should have declared our variables with `const`, but let's keep it simple for now
::::

::::{admonition} `onclick` is not super clean
:class: warning admonition-small dropdown

using `onclick` is the quick, but dirty, way to attach an event handler to an element  
a cleaner way is to use `addEventListener` from the JS side, as we will see later on
::::


---

## example #2

in this further example :

* we create two visible elements: a button, and a graphic area `<svg>`
* the page runs a cyclic task, that adds a random point
* click the button to start / suspend

---

```{code-cell}
:tags: [remove-input]

await tools.sample_from_stem("../samples/30-js-intro-02-svgcircles", {
  height: "30em", start_with: 'js'})
```

---

### ex2 - takeaways (1)

* we can also define **classes** in JS
* instances are built with `new Board(...)`  
  which in turn calls `constructor()` much alike Python's `__init__()`

* `the_board` is a JavaScript **object**, i.e. composite data keyed on `w`, `h`, etc…
* methods do not need to define a `self` parameter  
  instead the method subject is accessed through the automagical `this` variable

::::{admonition} object or dict
:class: note dropdown

in Python, we have dictionaries and class instances, 2 very different things
that both provide a key-value mapping

if that has sometimes felt confusing to you, the good news is in JavaScript
there is no such distinction, objects are the only (builtin) way to deal with
key-value mappings
::::
---

### ex2 - takeaways (2) - DOM

* it's easy to add to the DOM to create new content: `createElementNS` and `append`
* also it's easy to locate an existing element by its id: `document.getElementById`
* and then to attach it a callback using `object.addEventListener(event, function)`

---

### ex2 - takeaways (3) - async

* most of what happens in JS is **asynchronous**
* as opposed to a usual Python program  
  where there is an **entry point**, and the rest follows from there
* in JS the program flow is made of **several** actions  
  taking place **at the same time** with no clear starting point
* so for example here in addition to arming callbacks  
  we use `setInterval()` to register a cyclic task

---

### ex2 - takeaways (4) - loading

* a page is made of html + css + js  
  and **we have no control on the order in which things happen in the browser**
* initialization code messes with the `<svg>`'s attributes  
  so the `<svg>` element must have been created **beforehand**
* consequently, we need to ensure that init code is executed **after** html elements are created
* this is the purpose of `DOMContentLoaded` event sent to the global `document` object  
  it gets fired once the entire document is loaded

but more on this in the next notebook

---

## example #3

in this further example :

* we create two visible elements: a `<div>` label, and a `<canvas>` graphic area
* clicking in the canvas causes it to randomize itself

---

```{code-cell}
:tags: [remove-input]

await tools.sample_from_stem("../samples/30-js-intro-03-canvas",
                       {separate_show: true, start_with: 'js'})
```

### ex3 - takeaways (1)

* notice this programing style:  
  * all variables and functions are defined inside an anonymous function
  * this way impact of this code on **global variables** is zero !
* the `() => {}` notation allows to define **anonymous** functions  
  much like Python's `lambda`s

---

## let's wrap it up

### event-driven

* as opposed to more traditional languages, (think `main()` in C++ or Java,  or the entry module in Python)
* browser-hosted code has **little control** on overall **order**
* plus, apps need to **react to events** that can be
  * **user**-triggered (clicking, ...)
  * **network**-triggered (a page finished loading)
  * or **time**-triggered - some cyclic task is scheduled

---

### callbacks

the historical paradigm for event-driven programming :

* one very pervasive pattern in JavaScript is the notion of a **callback**
* which is a **function** attached to some sort of **event**
* and then of course the function gets **fired** when event **occurs**


in our 3 examples, we have seen 4 callbacks already

* ex.1 : `onclick="toggle()"`
* ex.2 : `setTimeout(() => this.run(), 500)`
* ex.2 : `document.addEventListener('DOMContentLoaded', ...)`
* ex.3 : `canvas.addEventListener('click', drawShapes)`

---

### take home message

as far as Web frontend, JavaScript :

* runs **in the browser**  <span style="font-size: 70%">(and also increasingly used as a regular programming language)</span>
* **full-fledged** modern language, with objects, classes, modules…
* some globals are specific to web pages in the browser, such as `document`, `window`, `console`
* highly influenced by **asynchronicity** / reactive programming

::::{admonition} see also: JS *vs* Python

an interesting summary of the *similarities* and *differences* between *JavaScript* and *Python*  can be found here  
<https://observablehq.com/@ballingt/javascript-for-python-programmers>
::::
