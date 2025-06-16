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
  title: bultin types
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# JS builtin types

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## nothing but the usual

* set of builtin types similar to Python's offering
* atomic : numbers, strings, booleans
* containers : arrays (lists), maps (dicts) and sets
* objects

````{admonition} notes on using notebooks
:class: warning admonition-small

as mentioned earlier, all variables should be declared with either `let` or `const`  
however, in a notebook this is inconvenient because one **cannot declare** the **same variable twice** in the same scope  
and so using `let` would prevent us from re-evaluating the same cell twice  
in order to remind you of the necessity to declare everything, we will add `/*let*/` chunks when using a new variable    
````

+++

## atomic types

* `number` is the default type for numeric values  
* `boolean` may be `true` or `false`
* `string` is, well, for strings

```{code-cell}
:tags: [gridwidth-1-2]

// usual operators, here
// ** is power and
// % is modulo
(100 ** 9) % 11
```

```{code-cell}
:tags: [gridwidth-1-2]

// strings with ' or "

/*let*/ s1 = "abc" + 'def'
/*let*/ s2 = 'ab' + "cdef"
s1 == s2
```

````{admonition} attention
:class: warning

**beware** that `number` is similar to Python's `float` -- so **with imprecision !**  
google for `bigint` for error-free calculus on integers - in much the same way as Python's `int`
````

+++

### atomic types (continued)

* `null` is similar to Python's `None`
* `undefined` 
  * as mentioned earlier, JavaScript is very permissive
  * some expressions return `undefined` instead of raising an exception
* `NaN` is "Not a Number"

```{code-cell}
:tags: [gridwidth-1-2]

// in anticipation: let's create an object
/*let*/ object = { x: 10, y: 20}

// in Python this would trigger an exception
// but not is JS

console.log(object.z)
```

```{code-cell}
:tags: [gridwidth-1-2]

// unlike Python

3 * "abc"
```

### boolean operators

the syntax for boolean operators is here again inherited from C / C++ / Java:

```{list-table}
:align: center

* - and: `&&`
  - or: `||`
  - not: `!`
```

```{code-cell}
:tags: [gridwidth-1-2]

if (true && true) {
    console.log("logical and is &&")
}
```

```{code-cell}
:tags: [gridwidth-1-2]

if (true || false) {
    console.log("logical or is ||")
}
```

```{code-cell}
if ( ! false) console.log("not is ! ")
```

### strings

**litteral** string: very much alike Python - can use single or double quotes

```{code-cell}
/*const*/ message = "hello world"    // or 'hello world'
```

**formatted** string: the equivalent of *f-strings* is <code><i>&#96;made with ${expression} inside backticks&#96;</i></code>

```{code-cell}
/*let*/ x = 10
/*let*/ s = `format expression like ${x*x} in a string`
s
```

```python
# which in Python would be

x = 10
s = f"format expression like {x*x} in a string"
```

```{code-cell}
// there are also tons of methods to deal with strings, e.g.

console.log(`length of s is ${s.length}`)
```

### see also

for a deeper study, see javascript.info:

* [on numbers](https://javascript.info/number)
* [on strings](https://javascript.info/string)
* [operators on booleans](https://javascript.info/logical-operators)

+++

## arrays

* similar to Python's `list`s

```{code-cell}
:tags: [gridwidth-1-2]

// arrays can be heterogeous

/*let*/ array1 = [1, "two"]

// you can also create an
// empty instance explicitly

/*let*/ array2 = new Array()
```

```{code-cell}
:tags: [gridwidth-1-2]

// insert at the end: push (not append)

array2.push(3)
array2.push("four")
array2.push(5)
console.log(array2)
```

```{code-cell}
:tags: [gridwidth-1-2]

// and get it back

array2.pop()
```

+++ {"slideshow": {"slide_type": "slide"}}

### common operations on arrays

```{code-cell}
:tags: [gridwidth-1-2]

// use the concat method

/*let*/ array = array1.concat(array2)
array
```

```{code-cell}
:tags: [gridwidth-1-2]

// and NOT addition,
// it does NOT work like in Python

array1 + array2
```

```{code-cell}
:tags: [gridwidth-1-2]

// indexing starts at 0

array[2]
```

```{code-cell}
:tags: [gridwidth-1-2]

// getting length is more OO than in Python

array.length
```

### searching in array

* like with Python lists, searching in an array is **linear** in its length
* so like in Python if you need fast access, use a *Map* instead (more on this right away)

```{code-cell}
:tags: [gridwidth-1-2]

// searching; >=0 means it is found

console.log(array.indexOf(3))
```

```{code-cell}
:tags: [gridwidth-1-2]

// otherwise -1

console.log(array.indexOf("absent"))
```

+++ {"tags": []}

### iterating over values of an array

* using **`for .. of`** it is possible to iterate through an array like in Python:

```{code-cell}
:tags: []

for (let x of array1) {
    console.log(x)
}
```

* notice the use of `let` to define a variable **local** to the `for` loop

````{admonition} for .. in
:class: warning admonition-small

actually there is also a ~~`for .. in`~~ statement (see below), but beware that it is **a little misleading**,  
and for this reason we recommend against it for beginners 
````

+++ {"slideshow": {"slide_type": "slide"}}

### iterating using indices, aka. `enumerate` in python

+++ {"tags": ["gridwidth-1-2"]}

* using `for .. in` iterates over **indices**
  but see also the warning on next slide

```{code-cell}
:tags: [gridwidth-1-2]

for (let i in array1) {
    console.log(i)
}
```

````{admonition} WARNING about for .. in

comparing `for .. in` with `enumerate()` is an oversimplification  
with some data structures, `for (x in obj)` will iterate over more than the natural indices !

in fact, the indexes that `for .. in` will iterate over are *strings* ! which is, well, insane...

```js
tab = [10, 20]

for (let i in tab)
    console.log(`value=${i} type=${typeof i}`)
->     
value=0 type=string
value=1 type=string
```

and a notable example is e.g. when iterating over the result of `element.querySelectorAll()`  
that we'll see in the next chapter, but it's worth outlining this already - [see also the cheatsheet](cheatsheet)
````

+++

### more on arrays

* like always, there are many more methods available, like  
  `.sort()`, `.reverse()`  
  `.join()`, `.slice()`, `.splice()`,  
  `.shift()`, `.unshift()`
* for more details, see on *javascript.info* [this article on Arrays](https://javascript.info/array) and [this one on related methods](https://javascript.info/array-methods)

+++

### shared references (advanced)

* **exactly like in Python**, objects can be accessed from several references  
* so you need to shallow- or deep-copy depending on your needs

```{code-cell}
:tags: [gridwidth-1-2]

/*let*/ ref1 = [["shared", "data"], "unshared"]
ref1
```

```{code-cell}
:tags: [gridwidth-1-2]

// slice() works like Python's [:]
// so it's a shallow copy

/*let*/ ref2 = ref1.slice()
ref2
```

```{code-cell}
:tags: [gridwidth-1-2]

// changing data from ref2

ref2[0][0] = "from 2 - deep"
ref2[1] = "from 2 - shallow"
ref2
```

```{code-cell}
:tags: [gridwidth-1-2]

// impacts ref1 but not on first level
// because it is a shallow copy
ref1
```

+++ {"slideshow": {"slide_type": "slide"}}

### pythontutor illustration

```{image} media/references-shared.png
:align: center
```

+++

## args are passed by reference (advanced)

* like in Python, when passing a composite object   (array, map, object, …) to a function
* you pass a **reference** (not a copy), so the function can alter its parameter
* so this means **shared references** and possible side effects

```{code-cell}
:cell_style: center

// on an array
function side_effect(arg) {
    arg[1] *= 1000
}

/*let*/ list = [0, 1, 2]
side_effect(list)
list
```

+++ {"slideshow": {"slide_type": "slide"}}

### arguments passing is loosely checked

```{code-cell}
// just display arguments
function foo(x, y, z) {
    console.log(`x=${x}, y=${y}, z=${z}`)
}
```

```{code-cell}
:tags: [gridwidth-1-2]

// works fine, of course
foo(1, 2, 3)
```

```{code-cell}
:tags: [gridwidth-1-2]

// works fine TOO !
foo(1, 2)
```

```{code-cell}
// and this one AS WELL !!
foo(1, 2, 3, 4)
```

### more on arguments (advanced)

* unlike Python there is no named arguments  ~~`foo(arg0=10)`~~
* and no argument with default values
* there is however a way to deal with a **variable number of arguments**

```{code-cell}
// equivalent to Python's
// def bar(x, y, *args):

function bar(x, y, ...arguments) {
    // display what we receive
    console.log(`x=${x}, y=${y}`)
    console.log(`arguments=${arguments}`)
    // the arguments object can be iterated on
    for (let arg of arguments) {
        console.log(arg)
    }
}

// with this call, the 2 extra args are captured
bar(1, 2, 3, 4)
```

```{code-cell}
---
slideshow:
  slide_type: slide
---
// and the other way around
// with the so-called spread operator

function foo(x, y, z) {
    // just to illustrate the mapping
    console.log({x, y, z})
}

L = [1, 2, 3]

// just like foo(*L) in Python
//   (remember we've seen the same
//    construction with objects earlier too)
foo(...L)
```

## hash-based data types

* `Map` and `Set` are JavaScript builtin types
  * that match Python's `dict` and `set` respectively
* they exhibit the same constant-time lookup nice property
* like in Python, **make sure to use them** whenever you need fast searching and indexing

```{code-cell}
:tags: [gridwidth-1-2]

/*let*/ map = new Map()

map.set('key1', 'value1')
map.set(1000, 'value1000')

map.get(1000)
```

```{code-cell}
:tags: [gridwidth-1-2]

// iterating over map

for (let k of map.keys()) {
    console.log(`key=${k}, value=${map.get(k)}`)
}
```

+++ {"slideshow": {"slide_type": "slide"}}

**see also**

* read the [section on maps and sets on javascript.info](https://javascript.info/map-set)

+++

## objects

* as the name suggests, objects are the building block for OOP
* they are similar to Python's class instances
  * in that they can hold attributes (Python vocabulary)
  * that in JavaScript are called key-value pairs

```{code-cell}
:tags: [gridwidth-1-2]

// notice that, unlike in Python
// we don't need to put quotes around key names

/*let*/ bond = {
    first_name: "James",
    last_name: "Bond",
}

console.log(`my name is ${bond.last_name}`)
```

```{code-cell}
:tags: [gridwidth-1-2]

// check for a key

'first_name' in bond
```

````{admonition} JS objects vs Python dicts
:class: attention

the syntax for JavaScript objects, as well as the *key/value* vocabulary, make them **look like** Python dictionaries  
**do not get confused though**, JavaScript objects are much more alike Python class instances
````

+++ {"slideshow": {"slide_type": "slide"}}

### more examples

```{code-cell}
:tags: [gridwidth-1-2]

// how to write an object's keys

// note that the values MUST BE
// valid JS expressions

/*let*/ options = {
    
    // quotes are not needed in the key
    // if it looks like a variable
    margin_left: '10px',
    
    // but it's allowed to put them
    'margin_right': '20px',
    
    // and required if the key is odd
    // (can be any string really)
    // so here with a space inside
    'margin space': true,
}
```

```{code-cell}
:tags: [gridwidth-1-2]

/*let*/ x = 10

/*let*/ options2 = {
    // and, oddity, just this
    x,
    // replaces x: x
    y: 20,
    z: 30
}
```

+++ {"slideshow": {"slide_type": "slide"}}

### more examples (2)

```{code-cell}
:tags: [gridwidth-1-2]

// how to concatenate objects

/*let*/ options3 = {
    margin_top: '30px',
    // that's how objects can be concatenated
    ...options,
    ...options2
}
```

```{code-cell}
:tags: [gridwidth-1-2]

// how to shallow-copy

/*let*/ copy = {...options}
copy.add = 'more'

copy
```

### accessing object keys

* you can access an attribute with either of these 2 forms
  * `object.first_name`
  * `object['first_name']`
* the difference being that
  * `object.first_name` takes the key name literally
  * `object[expr]` **evaluates** `expr`, that should give a key name

### iterations

several options; probably the safest is

```{code-cell}
for (let [key, value] of Object.entries(bond)) {
    console.log(`${key}: ${value}`)
}
```

or to iterate over keys only

```{code-cell}
for (let key of Object.keys(bond)) {
    console.log(key, ':', bond[key])
}
```

+++ {"tags": ["level_advanced"]}

### computing keys when building objects (advanced)

and also, because there is no difference between

```{code-cell}
:tags: [level_advanced, gridwidth-1-2]

/* const */ with_quotes = {'a': 1}
```

```{code-cell}
:tags: [level_advanced, gridwidth-1-2]

/* const */ without_quotes = {a: 1}
```

```{code-cell}
:tags: [level_advanced]

// we need a way to express that a field name is actually an expression
// that we want to evaluate (could also be a simple variable)

/* const */ [begin, end] = ['a', 'b']
/*                 ↓           ↓        */
/* const */ obj = {[begin + end]: 1}
obj
```

+++ {"slideshow": {"slide_type": "slide"}}

### unpacking objects

there are a lot of fancy ways to deal with objects; this is also known as deconstructing / reconstructing

and these are truly all over the place in modern JavScript code, so you'd better have heard of these

```{code-cell}
// here let is mandatory

{
    let [a1, a2] = [100, 200]
    console.log(`a1 now is ${a1}, a2 is ${a2}`)
}
```

+++ {"slideshow": {"slide_type": "slide"}}

there a similar destructuring assignment on objects

```{code-cell}
function demo() {
    const example_obj = {name: "doe",
                         phone: '0123456',
                         other: 'some stuff'}

    // extract only a subset of the object
    // and assign them into variables
    // with the same names
    const {name, phone} = example_obj

    console.log(`variable name is ${name}, phone is ${phone}`)
}

demo()
```

+++ {"slideshow": {"slide_type": "slide"}}

### typical usage for optional parameters

the parameter-passing mechanism is not as powerful as Python  
but here's a common pattern to define optional parameters with default values

```{code-cell}
---
slideshow:
  slide_type: ''
---
// one mandatory parameter, the other ones
// - say width and height - are optional

function foo(mandatory, options) {
    // the default values
    const default_options = {width: 10, height: 10}
    const {width, height} = {...default_options, ...options}
    console.log(`mandatory=${mandatory}, width=${width}, height=${height}`)
}
```

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [gridwidth-1-2]
---
foo("something")
```

```{code-cell}
:tags: [gridwidth-1-2]

foo("else", {height: 800})
```

### `console.log()` and objects

**TIP** about debugging JS objects :

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [gridwidth-1-2]
---
vector = {x: 1, y: 2}

// it may be tempting to write
console.log(`vector = ${vector}`)
```

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [gridwidth-1-2]
---
// but it is a lot better like this
console.log("vector = ", vector)
```

````{admonition} practice
:class: seealso

try it out within the browser's console:  
try to run `console.log(document)` or any other JS object  
and observe that you can navigate the inner structure of the object  
rather than a flat text representation that traditional languages have used us to
````

+++ {"slideshow": {"slide_type": "slide"}}

### class instances are objects

```{code-cell}
:tags: [gridwidth-1-2]

class Person {
    constructor(first, last) {
        this.first_name = first
        this.last_name = last
    }
}

/*let*/ person = new Person("John", "Doe")

typeof(person)
```

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [gridwidth-1-2]
---
// objects are passed by reference too
// so this function can modify its object argument

function change_object(obj) {
    obj.first_name = 'BOOM'
}

/*let*/ person2 = new Person('John Doe')
change_object(person2)
person2
```
