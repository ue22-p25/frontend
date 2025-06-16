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
  title: jQuery
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# jQuery

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## jQuery used to be everywhere

jQuery has been around for a **very long time**
with the objective of making **common operations**,  like **interactions with the DOM** **smoother**, and more **cross-browser**

it is still embedded in **many applications**, so it makes sense to have an idea of what it used to provide

````{admonition} cross-browser meaning ?
:class: tip admonition-small

*cross-browser* means it provides abstractions that will work everywhere, even if the user's browser is old and lacks some features
````

+++

## status

this library is still very widespread - used in a lot of code  
but it is no longer that popular with new / starting projects, because of all the other newer and fancier stacks (react, angular, vue, ...)  
also the basics are better standardized now, so the cross-browser argument no longer appeals so much (plus, IE is dead ;)

so, it makes sense to learn how to read code that uses it - and the material below is a good start - but not to invest time in its inner details

+++

## digression : cdnjs

there are many places where to find 3rd-party libraries like jQuery  
personnally I like <https://cdnjs.com>, because it is easy to locate resources and to import them in your project

```{image} media/cdnjs-search.png
:align: center
:width: 500px
```

```{image} media/cdnjs-copy.png
:align: center
:width: 500px
```

```{image} media/cdnjs-paste.png
:align: center
:width: 500px
```

+++

## digression$^2$

real applications will use more sophisticated tools to deal with dependencies, most popular being `npm` and/or `yarn` (by now, but that may change in 2 months :)

however `cdnjs` remains quite convenient if you use only a handful of 3rd party tools

````{admonition} not available in the notebook
:class: tip

jQuery being mostly **browser-oriented**,
running jQuery examples right in the notebook is not possible at this time
````

+++

## back to jQuery

as per <https://jquery.com>

> **What is jQuery?**

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

+++

## how to use

* after importing jQuery, the module is available as the global `$` variable (and yes, this is legal in JavaScript)
* you can use `jQuery` instead of `$` if you prefer

+++

## CSS selectors

* the `$` function, when called with a string, interprets it as a CSS selector
* and returns a JavaScript object, on which further jQuery treatments can be applied
* it will implicitly apply those treatments **on all the matching DOM elements**

+++

### CSS selectors example

for example this one-liner would hide  
all elements of class `to-hide`
```javascript
$(".to-hide").hide()
```

which is admittedly **a little simpler** than using native JavaScript functions

+++

## event handlers

likewise jQuery makes event handling nicer
```
$("#button-container button").on(
    "click",
     function( event ) {
        $("#banner-message").show();
});
```

would require much more verbose code if written in pure JavaScript

+++

##  run code at load-time

finally, a **very common idiom** is to use the `$` function which, when called **on a function**, 
means to add it to the list of things to be done once the page has loaded

```javascript
////// 3 equivalent forms
// using an arrow function
$(() => console.log("loaded"))

// using an anonymous function
$(function() {console.log("loaded")})

// using a named function
function loaded() {console.log("loaded")}
$(loaded)
```

+++

## networking

* your javascript code is allowed to issue network requests
* here again jQuery has a convenience tool called `$.ajax`
* which makes things easier than with pure JavaScript
* let us see how the example works exactly

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/61-jquery-colors", {start_with: 'js'})
```

````{admonition} note
:class: note

for obscure security-related reasons, this example no longer works in the context of the notebook, but is otherwise valid
````

+++

## chaining

a very general idiom is to select, then apply a **series of changes**  
observe in the example above

```javascript
$("#result")
    .html(`That div is ${color}`)
    .css("color", color);
```

* selection of the target elements (here just one, could have been many)
* apply them the `html()` method to change their content
* and on the same set of elements, change their css property

+++

## and much more

* it is worth taking [a look at the API documentation](https://api.jquery.com/) to get a sense of all the possibilities
* starting maybe with [the section on manipulation](https://api.jquery.com/category/manipulation/)
