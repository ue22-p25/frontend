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
  title: asynchronism
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# asynchronous behaviour

```{code-cell}
tools = require('../js/tools'); tools.init()
```

`````{admonition} use your browser console !
:class: danger

for various technical reasons, running asynchronous JS code is sometimes outside of the comfort zone for a Jupyter notebook environment

if things do not run smoothly from within Jupyter, and/or if you are reading this in static HTML format, you may want to copy-paste the code and run it in **right in your browser console** instead

````{admonition} the gory details
:class: danger admonition-small dropdown

actually `fetch()` was not a builtin in the *node.js* runtime until recently; if you still want to run `fetch()` in node, here's a recipe for loading the `node-fetch` extra lib

```js
// this is a magic recipe to import fetch
// useful **ONLY** if you're using node.js

// let's do the import only if needed
try {
    fetch()
} catch {
    // what did I tell you about loading JS modules ?
    /*const*/ fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
}
```
````
`````

+++ {"slideshow": {"slide_type": "slide"}}

##  problem statement

* at any given time, your browser does **several things** in parallel, typically
  * monitor and reacts to user inputs (mouse & keyboard)
  * network activity (during page loading, but also when issuing API calls,...)
* and so there is a crucial need for supporting **parallelism**
* and ideally in a way that makes code better (as in more legible)  
  (remember the best measurement of code quality is expressed in wtf/mn ;)

  ```{image} media/wtf-per-minute.png
  :align: center
  ```

but seriously though, let us consider some typical situations where concurrency is key

+++ {"slideshow": {"slide_type": "slide"}}

### page loading issue

* the browser starts displaying the page long before it is all loaded
* plus, in most cases, code **order matters**:
  * for instance your code cannot spot an element in the DOM if it was not yet created
  * you cannot use a given JavaScript library if its code has not finished loading

+++ {"slideshow": {"slide_type": "slide"}}

### networking from JS

* the naive paradigm is: the browser sends a request to the server, and displays the result
* this is **not good enough** ! - consider the case of pagination in an e-commerce website
  * if we had only that approach, would bring to permanent page changes (harsh pagination)
* so instead, the client (JS side) needs to be able to sends its own http requests (♡)
  * and to receive results not as HTML, but as pure data - typically JSON
* so it can change the page content **without reloading an entire page** (soft pagination)
  * same thing for example to get information about the basket
* this is [where the fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) comes in
  * see also: the TP on xkcd where we will practise this thoroughly

````{admonition} (♡)
:class: note

typically, the page sends back API calls to its server over HTTPS
````

+++

## callbacks hell

so far we have seen one tool to deal with concurrency: *callbacks*  
however the code can quickly become the *callback hell* by cascading callbacks  
* which does not scale very well, because an essentially **sequential** business ends up creating a **deeply nested** program structure  

```{image} media/callback-hell.png
:align: center
:width: 450px
```

* (and it gets even worse if any kind of logic is involved)

````{admonition} we have seen an example already
:class: smaller

remember the example on catching key and mouse events ?  
we have a set of **linear** tasks (load page, arm callbacks, trigger callbacks)
and that results in this pattern of **nested** callbacks
````

to mitigate this issue, we have 2 additional tools

* promises
* `async`/`await`

+++

## promise example with `fetch()`

to illustrate the notion of promises, we will see how the browser would typically **send its own HTTP requests**  
our example is about fetching some DNA samples on `www.ebi.ac.uk`, but the content is not really important, it's just an example..  
for instance, the same technique can be used as-is to send API calls

to achieve this we have a builtin function called **`fetch()`**, that **returns a promise** object

```js
// let us start with defining a few URLs

// NOTE that they do NOT return HTML, it's actually PLAIN TEXT
// in some kind of bio-informatics standard...
// to get a glimpse, point your navigator to the first one

// a valid small DNA sample (60 kb)
URL_small = 'https://www.ebi.ac.uk/ena/browser/api/embl/AE000789?download=true'

// valid too, but larger (10 Mb)
URL_large = 'https://www.ebi.ac.uk/ena/browser/api/embl/CP010053?download=true'

// an invalid URL - used later for error management
URL_broken = 'http://some-invalid/web/site'
```

+++ {"slideshow": {"slide_type": "slide"}}

### fetching a small file

that done, we can fetch one URL (the small one for starters) with this code:

```js
// fetching a URL would typically be done like this

fetch(URL_small)
    .then(response =>  response.text())
    .then(text => console.log(`received ${text.length} characters`))
```

as you can see, this causes 2 things:

* a `Promise` object gets printed
* a little while later, we get a message with the size of the downloaded file

next, we'll redo it with a larger file,
that takes a longer time, to get a better understanding

+++ {"slideshow": {"slide_type": "slide"}}

### again with a larger file

let's kind of zoom in, and redo the same with a larger URL that will take more time

run the following code, and observe that:

* the http request is sort of "running on its own"
* during all the time it takes to fetch the data, we can still run code !

```js
// again with a larger file
// observe how the network activity happens "in the background"

fetch(URL_large)
    .then(response =>  response.text())
    .then(text => console.log(`received ${text.length} characters`))

// proceed to running these immediately
console.log("I am still alive")

10 * 2000
```

## promises

+++

### `.then()`

typically, you use a library function that returns a promise - like here with `fetch()`  

creating a promise is like starting a separate task, it will be **processed in parallel** !

and you can use `.then()` to specify what should happen next
(i.e. when the promise is complete)

+++

````{admonition} the gory details about .then()
:class: seealso dropdown

here are more details on the expected arguments of `.then()`

```js
promise.then(function_ok, function_ko)
```

where

* `function_ok` is triggered if "all goes well"
* `function_ko` is triggered otherwise - note that this *second argument is optional*
* `function_ok` is a function that consumes the output of the promise (once it is complete)  
  and **produces** (returns) the **output of the `.then()` call**
* so in other words, the `.then()` expression also returns .. a promise
  whose result is the result of `function_ok`
````

+++

````{admonition} pending, fulfilled, or rejected
:class: seealso dropdown admonition-small

there is **no need to bother about that** in your code 
since that is exactly what `then()` will manage for you  
but well, if only for your curiosity:

* upon creation the promise is set in state ***`pending`***
* the event loop will make it progress behind the scene, and it can
  * either end well, in which case its state becomes ***`fulfilled`***
  * or it can fail, and its state becomes ***`rejected`***
````

+++

### `.then().then()`

all this allows for *chaining*, like we did when fetching the URLs above

specifically, in these examples above, what happens is

* by sending a `fetch()` we initiate an HTTP request
* the corresponding promise will be fulfilled **as soon as the HTTP headers are received**
* it (the promise returned by `fetch()`) returns a `Response` object,  
  that in turn has a `.text()` method, that returns .. a promise, whose value is the full response body

````{admonition} the content is JSON ?
:class: tip

our use case is to fetch a plain text file; if the URL contained JSON instead, we would just need to use the `.json()` instead of the `.text()` method, on the `Response` object
````

````{admonition} why 2 phases ?
:class: dropdown tip admonition-small

the reason for splitting the process in two is for more flexibility  
this way we could inspect the HTTP headers without the need to wait for the whole response  
````

+++ {"tags": []}

````{admonition} another chaining example
:class: seealso dropdown admonition-smaller

here's another illustration, this time with a promise created programatically

```js
// another way to create a promise
// (it takes no time and always succeed)
Promise.resolve(5)
   .then(res => res * 2)
   .then(res => res * 2)
   .then(res => res * 2)
   .then(res => res * 2)
```

```{image} media/promise-chaining.png
:align: center
```
````

+++

## as a function

let us now rewrite our code **into a proper function**, so we can use it on any URL

```js
// for convenience, just in case

URL_small = 'https://www.ebi.ac.uk/ena/browser/api/embl/AE000789?download=true'
URL_large = 'https://www.ebi.ac.uk/ena/browser/api/embl/CP010053?download=true'
URL_broken = 'http://some-invalid/web/site'
```

+++ {"slideshow": {"slide_type": "slide"}}

### without error management

in this first iteration, we **do not handle errors**  
for the sake of simplicity, we just display:
- the HTTP return code (digression: google for 'http return codes')
- the size of the response payload
- and we return the actual body

```js
/* const */ get_url1 = (url) => {
    // hope for the best (no error handling)
    let promise = fetch(url)
        .then(response => {
            // display http status from header
            // to illustrate that it is available early
            console.log(`${response.url} returned ${response.status}`)
            // actually get the contents
            // and pass it to next stage
            return response.text()
        })
        .then(text => {
            console.log(`${url} page contains ${text.length} bytes`)
            return text
        })
    return promise
}
```

and here is how we could use it  
since our function returns a promise, we use it with `.then()`, just like we did with `fetch()`

```js
// let us display the first 20 characters in the file
get_url1(URL_small)
    .then(text => console.log(`first 20 characters >${text.slice(0, 20)}<...`))
```

````{admonition} reminder
:class: warning

let us stress again that the static HTML version of this notebook does not tell the whole story, make sure to run the code in your browser console
````

but when called on a broken URL, this code raises an exception:

```js
get_url1(URL_broken)
```

+++ {"slideshow": {"slide_type": "slide"}}

so we need some tool to handle errors, and that's the purpose of `.catch()`

+++

### `.catch()`

* just like `.then()`, the `catch()` method applies on a promise
* it allows to deal with errors
* a common pattern is to apply it **to the last `.then()` in the chain**
* this way, any error occurring **at any stage** in the chain gets captured

````{admonition} if you've read the small prints
:class: tip admonition-small dropdown

this means that `catch(failureCallback)` is short for `then(null, failureCallback)`
````

+++

### with error management

so we can come up with a second iteration, where we **take care of errors**  
to this end, we add a `catch()` at the end

```js
/* const */ get_url2 = (url) => {
    // let's get rid of the promise variable, not needed
    return fetch(url)
        .then(response => {
            console.log(`${response.url} returned ${response.status}`)
            return response.text()
        })
        .then(text => {
            console.log(`actual page contains ${text.length} bytes`)
            return text
        })

        // this catch will deal with any error in the upstream chain
        .catch(err => console.log(`OOPS with ${url}`, err))

        // just to show that the exception was properly handled
        .then((text) => {
            console.log("the show must go on")
            return text
        })
}
```

+++ {"cell_style": "center"}

### `.catch()` recalls exception handling

* let us run this code with an invalid URL
* note that the error occurs in the `fetch()` call itself
* and not in any of the 2 `.then()`
* still, the error gets captured at the end of the chain
* this recalls the way exceptions bubble up to find a `catch` statement

```js
// and now, no exception occurs on an invalid URL
// we just receive a void result from get_url2 in that case

get_url2(URL_small)
    .then(text => {
        if (text)
            console.log(`first 20 characters >${text.slice(0, 20)}<...`)
    })
```

+++

````{admonition} no more pyramid of doom
:class: dropdown tip admonition-small

with this model, we can now avoid the pyramid of doom, using chaining  
which means that this code (not runnable of course)

```js
// nested / pyramidal
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log(`final result ${finalResult}`)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)
```

becomes this linear form, that much better describes the logic

```js
doSomething()
  .then(function(result) {
     return doSomethingElse(result)
  })
  .then(function(newResult) {
     return doThirdThing(newResult)
  })
  .then(function(finalResult) {
     console.log(`final result ${finalResult}`)
  })
 .catch(failureCallback)
```
````

+++ {"slideshow": {"slide_type": "slide"}}

## `async` / `await`

hopefully you are now convinced that promises are cooler than callbacks - for this kind of processing at least  
however the syntax is still a little awkward, and so in order to still improve readability, these 2 keywords have been introduced

+++

### `async` functions

with `async` we can create a function that **returns a `Promise` by default**  
moreover, all functions that return a `Promise`, including `.fetch()`, are called asynchronous functions

+++

### the `await` keyword

the `await` keyword allows to wait for **the result** of a promise (as opposed to getting the promise itself)

````{admonition} limitation

in general, `await` can only be used inside an `async` function  
for convenience though, it is more and more also supported at the interpreter toplevel, so hopefully that won't be an issue
````

+++

### `async get_url()`

let us see how we could take advantage of these new features to rewrite `get_url()`

```js
//                  ↓↓↓↓↓
/*const*/ get_url = async (url) => {
    try {
        //         ↓↓↓↓↓
        response = await fetch(url)
        console.log(`status=${response.status}`)
        //     ↓↓↓↓↓
        text = await response.text()
        console.log(`length=${text.length}`)
        return text
    } catch(err) {
        console.log(`OOPS with url=${url}`, err)
    }
}
```

````{admonition} worth noticing

* the function is defined with the `async` keyword
* each time an asynchronous function is called, it is `await`*ed*; which means we wait for the promise to complete
* this time, error management can be done through a regular `try/catch` instruction

and as a result, the code pretty much looks exactly like what we would have written in a synchronous world,
with the extra benefit that it is actually running asynchronously !
````

and here is how we would use this code

```js
/* const */ text = await get_url(URL_small)
console.log(`first 20 characters >${text.slice(0, 20)}<...`)
```

+++ {"slideshow": {"slide_type": "slide"}}

## see also

this is just an overview, refer to

* the [article on fetch() on MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
* a [more thorough description of promises on javascript.info](https://javascript.info/promise-basics)
* also [this article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) can come in handy about promises too
* and [the javascript.info article about `async/await`](https://javascript.info/async-await)

+++

````{admonition} you can skip the rest
:class: danger

the remainder of this notebook is for advanced readers
````

+++ {"slideshow": {"slide_type": "slide"}, "tags": ["level_advanced"]}

## optional (advanced) features

+++ {"cell_style": "center", "tags": ["level_advanced"]}

### promises run as coroutines

* let us observe what happens if we create several promises at the same time
* remember that promise creation returns *immediately*  
  (we've seen the REPL working right after we had created our promise earlier)
* for example here is how we could fetch these 3 URLs **simultaneously**
* that's the main point of promises

```js
// let us fetch the 3 URLS **at the same time**

for (let url of [URL_broken, URL_small, URL_large])
    get_url(url)
```

+++ {"cell_style": "center", "tags": ["level_advanced"]}

### `Promise.all()`

* but now, when running several things in parallel like this,
  we may need to **also retrieve their results**
* that is the point of `Promise.all()` - [and similar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#static_methods)
* that create a promise from a collection of promises
* and wait for some/all of them to complete

```js
// could also use .map(), but let's keep it simple
promises = [
   get_url(URL_broken), get_url(URL_small), get_url(URL_large)
]

contents = await Promise.all(promises)
    .then((results) => {
          console.log(`all ${results.length} jobs are done - storing in 'contents'`)
          return results
         })
// then you find in contents[0] .. contents[2] the 3 texts returned 
// first one being undefined because the url is broken
```
