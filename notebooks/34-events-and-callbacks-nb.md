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
  title: events & callbacks
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# events and callbacks

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"slideshow": {"slide_type": "slide"}}

## events

* due to the specificity of the browser and the network, JavaScript within the browser is not driven like other languages
  * there is no `main()` function that runs forever
  * it is not either driven like a video game, i.e. by an infinite loop that eats all the CPU
* instead JavaScript is driven by **events**, which can be of different kinds:
  * can come from the **user activity** such as mouse click
  * can be **time-bound**
  * can be linked to **network** activity
 
````{admonition} examples
:class: tip admonition-small

* we have already seen the `load` event, that is rather crucial
* there are also builtin events for keyboard / mouse interaction, illustrated on the next example (we use `click` and `keydown`)
* for more details, see [this section in javascript.info](https://javascript.info/event-details) on all the available events
````

+++ {"slideshow": {"slide_type": "slide"}}

## callbacks

events are handled using **callbacks**
* callbacks are functions that are triggered when an event occur
* to get a function to be called on a given event, you have to use the `addEventListener`
* the callback function typically receives an **event** object as a parameter

`````{admonition} for example
:class: tip

for exemple, to catch user clicks on a specific element, you can write:

```js
// typically you locate 'element' using getElementById
// of course you need to call this 
// at a time where element has been created...
element.addEventListener(
    "click", 
    (event) => { 
        console.log("received click", event)
})
```

as we will see in the next example, the `event` variable within the callback is a JS object, that contains all the details on what happened


````{admonition} callback with no parameter
:class: attention admonition-x-small

also note, we have seen several examples, a **callback** can also be a function that **takes no parameter**  
this is possible because JS is so flexible/lenient with respect to argument passing
````
`````

+++

### `addEventListener`

* a fundamental tool to register a callback with an event
* available on most objects (not only `window`, often used on a DOM element)
* again, observe on the example below, how the callback **receives the event** in parameter

+++ {"slideshow": {"slide_type": "slide"}}

### example: `load`, `click` and `keydown

in this first version we are going to use globally defined functions

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [remove-input]
---
tools.sample_from_stem("../samples/34-events-and-callbacks-01",
                       {separate_show: true, start_with: 'js', 
                        separate_width: "600px", height: 'js'})
```

+++ {"slideshow": {"slide_type": "slide"}}

here's a timeline of what is going on

```{image} media/callbacks-chain.svg
:align: center
```

+++ {"slideshow": {"slide_type": "slide"}}

### example - observations

+++

notice from the example :

````{admonition} cascading
:class: seealso
see how `addEventListener()` are cascaded, which is a very typical pattern in JS code
````

````{admonition} the contents of event
:class: tip admonition-smaller

also notice that the actual content of the `event` object depends on the event type:

* the `keydown` event has a `event.key` that exposes the keyboard key
* the `click` event has `event.offsetX` that exposes the click coordinates

it is helpful to use `console.log(event)` in the callback, and to inspect the event object in the console, to get the list of all its attributes
````

+++

````{admonition} global variables
:class: note admonition-small

also, this code uses **global variables** like e.g. `onclick`  
and so here, we'd be in trouble if our application used another library that defines a global with the same name  
we will see in a moment how to rewrite this example into a code that **leaks no global variable**  
````

+++ {"slideshow": {"slide_type": "slide"}}

## other types of events

+++

### time-related events

```javascript
setTimeout(foo, 3000)  // call foo once in 3000 ms
setInterval(foo, 3000) // call foo every 3000 ms
```

````{admonition} see also
:class: seealso

for more details and a more exhaustive list of available events, see [this section in javascript.info](https://javascript.info/event-details)
````

````{admonition} requestIdleCallback
:class: dropdown admonition-smaller

for the geeks:
there is also a `requestIdleCallback` that is used to schedule a function to run **when the browser is idle**  
so if you have a big chunk of code to run, you can use this to avoid blocking the UI  
you will have to explicity split your code into chunks, though
````

+++ {"slideshow": {"slide_type": "slide"}}

### code-generated events

you can create your own event by code, e.g. :

```javascript
const foo = () => console.log("foo ! ")
const event = new Event('myevent')
// Listen for the event - on any element
document.body.addEventListener('myevent', foo, false)

// Dispatch the event.
document.body.dispatchEvent(event)
```

+++ {"slideshow": {"slide_type": "slide"}}

## anonymous functions

due to the extensive use of callbacks in JavaScript, having to name every function is annoying  
for this reason, JavaScript has 2 convenient ways to create anonymous functions:

* the modern one (*arrow functions*)
  ```javascript
  const mylambda0 = (arg0, arg1) => { /* some code here */ }
  ```
* the legacy one:
  ```javascript
  const mylambda0 = function (arg0, arg1) { /* some code here */ }
  ```

+++

````{admonition} functions vs arrow functions
:class: attention admonition-smaller

* /!\ Both variants are valid, even if the new one looks nicer
* with the fat arrow, `{}` and `return` can be sometimes omitted
* also, there are subtle differences about the `this` variable, not covered here
````

+++ {"slideshow": {"slide_type": "slide"}}

### anonymous function usage

in this context, it is common to create functions **on the fly**, e.g.
```javascript
document.addEventListener(
    "DOMContentLoaded",
    // the expression on the following line
    // returns a function object
    () => console.log("page loaded")  
)
```

+++ {"slideshow": {"slide_type": "slide"}}

## previous example using arrow functions

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/34-events-and-callbacks-02",
                       {separate_show: true, start_with: 'js', 
                        separate_width: "600px", height: 'js'})
```

## limits of callbacks

* highly recommended to study the [introduction to callbacks in javascript.info](https://javascript.info/callbacks)
* that highlights the fundamental drawback of using callbacks
* which is that you need to split your code into pieces, and fit the pieces into functions
* it easily becomes hard to read and modify, especially if there is logic involved

+++

````{admonition} you can skip the rest
:class: danger

the remainder of this notebook is for advanced readers
````

+++

## closures

* it is rather frequent that a callback needs to access data that sits **outside of the function context**
* it is safe to use lexically-bound variables inside the callback
* see the `context` variable in the example below

````{admonition} safe if you use let or const
:class: admonition-small warning

we say it's safe, and indeed it is, but **only if you use `let` or `const`**  
declaring a variable with `var`, or even worse, not declaring it at all, will **not work** as you expect
````

````{admonition} use your browser console
:class: error

we don't run this code here, as we're moving outside of the notebook's comfort zone with this code  
feel free to cut and paste the code into your web browser's console
````

```js
// here the 'context' variable is not visible

{  // <- this is the block where 'context' is visible
  let context = {a:1, b:2}
  setTimeout(
  // here the 'context' variable is visible and remain valid
  // even if we leave the block
    () => console.log("in the callback: ", context),
    1000)
  console.log("NOW timeout armed")
}

// here neither, let us prove it:

try {
  context
} catch(err) {
  console.log(`OOPS ${err.message}`)
}

// BUT: wait for 2s and see the callback still triggers properly
// it means that the 'context' variable somehow is still alive
```

+++ {"slideshow": {"slide_type": "slide"}}

### takeaway

* `context` is created in a block
* that is **long gone** at the time the callback triggers
* but it is still reachable from the callback
* as it was *captured* in the closure

+++ {"slideshow": {"slide_type": "slide"}}

## `let` *vs* `var`

### a broken example

* an example with `var` in effect creates a global `i`
* while the one with `let` behaves as expected

```js
// again you need to run this in the browser console

function ko() {
  // DO NOT USE var IN YOUR CODE !
  for (var i=1; i<=3; i++) {
     setTimeout(() => console.log("ko, i =", i),
                100*i)
    }
}

ko()
```

```js
function ok() {
  // use let instead
  for (let i=1; i<=3; i++) {
     setTimeout(() => console.log("ok, i =", i),
                100*i)
    }
}

ok()
```

### takeaway

* take home message is: **never use `var` declarations**
* it is old-fashioned and **badly broken**
+++ {"slideshow": {"slide_type": "slide"}}

## see also

* thorough article on closures <https://javascript.info/closure>

+++

***
