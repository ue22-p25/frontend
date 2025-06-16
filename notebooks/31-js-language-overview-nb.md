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
  title: 30,000 ft overview
---

+++ {"slideshow": {"slide_type": "slide"}, "tags": []}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# 30,000 ft overview of JS

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"slideshow": {"slide_type": "slide"}}

## preamble

+++

* from now on, we will very briefly cover **some** features of the language
* for a more thorough study, refer to [this excellent tutorial on javascript.info](https://javascript.info/)
* as we go, we will point at a selection of chapters in that tuto
* students interested should probably read it through

+++ {"slideshow": {"slide_type": "slide"}}

## various runtimes

+++

* FYI, JavaScript is not restricted to being used in a browser
* among others, the [`node.js` runtime](https://nodejs.org/en/about/) can be used e.g. to power a backend web server, or simply from a regular terminal:

```bash
$ node
Welcome to Node.js v12.5.0.
Type ".help" for more information.
> console.log("hello world")
hello world
> process.exit()
$ 
```

+++

## `console.log()` function

* a function to show output - quite similar to Python's `print()` function
* accepts any number of arguments
* of course from a browser it ends up in the devel tools area (under `node` it will just print)

```{code-cell}
console.log(1, "two", [3, "four"])
```

````{admonition} super useful for debugging
:class: tip

if the argument is an object, it will be displayed as a collapsible with togglable arrows `→` / `↓`, and that lets you explore the data structure  
try `console.log(window)` in the browser to see that in action
````

+++

## syntax

* the syntax is similar to C, C++ and Java
* unlike Python, indentation does not matter
* `;` is commonly used at the end of each statement (although this is **not mandatory**)
* 2 styles of comments

```{code-cell}
:tags: [raises-exception]

// this is a comment, no need to close
// but must be repeated on each line

// you may end all statements with a ;
let a = 10;

// but that's not mandatory
let b = a * a

/* this is another comment
   everything including newlines
   is ignored until the matching
*/
```

### tests and loops

* `if` and `while` statements are similar to C
* `for` are a little more awkward - we'll come back to that

```{code-cell}
:tags: [gridwidth-1-2]

// conditional if
if (a == 10) {
    console.log("YES 10")
} else if (a == 12) {
    //
} else {
    //
}
```

```{code-cell}
:tags: [gridwidth-1-2]

while (a >= 5) {
    console.log(a)
    a -= 3
}
```

+++ {"tags": []}

###   switch

the switch statement in JavaScript
is similar to the ones in C++ and Java  
it will branch your control flow into a
location that depends on the subject's value

**do not forget** the `break` statements !

```{code-cell}
:tags: []

switch (a) {
    case 0:
        console.log("ZERO")
        break
    case 10:
        console.log("TEN")
        break
    case 20:
        console.log("TWENTY")
        break
    default:
        console.log("NONE")
}
```

````{admonition} more on the switch statement
:class: note

if the switch statement is new to you, please refer to this [full article on javascript.info](https://javascript.info/switch)
````

+++

### C-style `for` loop

* C- or Java-like iteration loops are supported - although seldom needed

````{admonition} seldom the right way
this is **not the right way** to iterate over an array as we'll see later on
````

```{code-cell}
for (let i=0; i<2; i++) {
    console.log(i)
}
```

## variables

+++

### declaration

* as usual, variables are **names** that refer to **data in memory**
  * like in Python, any such data is **typed** (although the name is not)
  * core language has some **basic types**
* variables should be **explicitly declared** using one of the keywords `let` or `const`

````{admonition} link in tuto
:class: admonition-small

see more on this topic on javascript.info at this link <https://javascript.info/variables>
````

```{code-cell}
:tags: [gridwidth-1-2]

let n = 10
console.log(typeof(n))

// possible since declared with let
n += 20
```

```{code-cell}
:tags: [gridwidth-1-2]

const s = "hello world"
typeof(s)

// we could not do this because declared with const
// s += ' john'
```

````{admonition} prefer const when relevant
:class: note

use `const` instead of `let` when declaring a constant variable
````

+++

### Python-style unpacking assignment

```{code-cell}
// there is a form of parallel assignment
// similar to what Python offers

let [py, thon] = [10, 20]

py + thon
```

### object unpacking

anticipating a bit, but there's a very handy construction that looks a bit like the one above

```{code-cell}
// you receive some data from the outside
const data = {height: 100, width: 200, radius: 20, linewidth: 5} // possibly much richer

// and you're interested in extracting width and height
// in two variables of the same name; easy !
const {height, width} = data

console.log(height, width)
```

## variable scope

* like in all other languages, there is a need to limit the scope of a variable  
  so that variable `x` in 2 distinct functions do not clash
* JS uses **lexical nested scope**:
  a variable is visible only within its **code block** (the stuff within `{}`)

````{admonition} unlike Python
:class: admonition-x-small

this is unlike Python, where a variable scope is the **function**
````

+++ {"slideshow": {"slide_type": "slide"}}

### scope illustrated

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [raises-exception]
---
// this is a global variable
let variable = "global"

function foo() {
    // this local declaration
    // hides the global variable
    let variable = "local"
    console.log("in foo():", variable)
}

console.log("in global context:", variable)
foo()
```

### declaring variables with `let`

* (a lot of) legacy code uses the ~~`var`~~ construct to declare variables - but **this is dangerous !!**
* you should **always** declare your variables with **`let`** or **`const`** 

````{admonition} cannot use let twice
:class: warning

when declaring a variable with `let`, it cannot be declared a second time within the same block  
so in the context of notebooks, a drawback of this is that you cannot run a cell twice if it uses a toplevel `let`
````

+++

### blocks are delimited by `{}`

the elementary unit for scope is the **block** - which is materialized by `{}`

```{code-cell}
:tags: [raises-exception]

let variable2 = "outermost"
{
    let variable2 = "intermediate"
    {
        let variable2 = "innermost"
        console.log("level 2", variable2)
    }
    console.log("level 1", variable2)
}
console.log("level 0", variable2)
```

````{admonition} note
:class: note

this is like in C/C++, and unlike Python where a variable's scope is the whole function
````

+++

## globals

context (browser components mostly) is exposed to programer through a set of **global variables**, e.g.
* `document` to access the DOM
* `window`, remember `setTimeout()`
* `console` like in `console.log()`
* `this` - a tricky one


````{admonition} depends on the runtime
:class: admonition-small

of course there is for example no `window` global in the context of the `node.js` interpreter !
````

+++

````{admonition} cannot inspect the browser globals from here
:class: warning

as it turns out, the notebook's JavaScript engine is an instance of `node.js`,  
and so is not **browser-related**, so we could **not** inspect 
the `document` or `window` variables from right here  

but of course you can do so from the browser's console though
````

+++ {"slideshow": {"slide_type": "slide"}}

## formatting with backticks

in JS, the backticks <code>&#96;&#96;</code> feature reminds of Python's f-strings

```{code-cell}
let [x, y] = [100, 200]
```

```{code-cell}
// the `` is very similar to Python's f-strings
// except that you use ${expression} 
// note the extra $ as compared to Python

console.log(`x = ${x} and x+y = ${x+y}`)
```

## functions

like in other languages, and we have seen examples already

```{code-cell}
// the old way

function foo(x, y) {
    console.log(`${x} + ${y} = ${x+y}`)
}

foo(10, 20)
```

```{code-cell}
// a more fashionable way - similar to Python's lambdas

const bar = (x, y) => console.log(`${x} + ${y} = ${x+y}`)

// can use { } if the code is more than one-line
const bar2 = (x, y) => { console.log(`${x} + ${y} = ${x+y}`) }

bar(10, 20)
```

### duck typing

like in Python, **objects** are typed, but **variables** are not bound to a given type

```{code-cell}
function foo(x, y) {
    console.log('x is a ', typeof(x))
    console.log(`${x} + ${y} = ${x+y}`)
}

// like in Python, function arguments are not statically typed
foo('abc', 'def')
```

### loose binding

* JavaScript is **very permissive**; for example, number of args is not checked

```{code-cell}
function fuzzy(x, y, z) {
    console.log(`x = ${x}  y = ${y} z = ${z}`)
}
fuzzy(10)
fuzzy(10, 20)
fuzzy("abc", "def", "ghi")
// and even this !
fuzzy("abc", "def", "ghi", "trashed")
```

### `this`

* a very specific feature of JS is that the implicit variable `this` is always defined
* the content of `this` depends on the context
* useful and relevant **only** for
  * methods (more on this later)
  * and some callbacks

```{code-cell}
// for example in this context, it's unclear what 'this' refers to
function show_this() {
    console.log(typeof(this))
}

show_this()
```

## exceptions

JavaScript supports exceptions, just like Python, with the same bubbling mechanism  
that scans the call stack until a `catch` statement is found

```{code-cell}
try {
    // referring to an unknown variable
    unknown
} catch (err) {
    console.log(`OOPS name=${err.name}, message=${err.message}`)
}
```

## classes

as of ES2015, the language has a proper `class` statement

````{admonition} no classes in JS before ES6
:class: admonition-small dropdown

FYI, older JavaScript did not have a builtin class mechanism, and used other - quite cryptic - ways to create pseudo-classes
````

```{code-cell}
class Vector {
    // just like Python's __init__
    // NO NEED to pass 'self' in JavaScript
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // same for a regular method
    display() {
        console.log(`[Vector x=${this.x} y=${this.y}]`)
    }
}

let vector = new Vector(10, 20)
vector.display()
```

````{admonition} cannot run this cell twice under Jupyter
:class: warning dropdown

here again, when executing this under Jupyter, running this cell twice will cause an error  
this is because, just like with `let`, the language **won't let** you define the same `Vector` class **twice** in the same scope
````

+++ {"tags": []}

### notes on classes

**NOTICE** the following facts from that first class example :

* `constructor` is very much alike `__init__` in Python
* the **implicit** `this` variable refers to the current object  
  it is very much alike the traditional `self` argument in Python, except that it is **not mentioned** as a method parameter
* objects get created with `new Vector()` - Java and C++ style  
  and **not** just plain Python-style `Vector()`
* of course, inheritance is supported too; see `extends` and `super()` for details

````{admonition} old-school classes
:class: dropdown note

you may come across older-school code that uses other techniques - typically involving a `prototype` thingy  
just stay awy from that when you write new code,and just stick to the new idiom
````

+++ {"tags": ["level_intermediate"]}

### get / set (advanced)

* modern JavaScript has a native notion of what Python calls *properties*
* i.e. expose an apparently mundane access to an instance attribute
* through **getter** and **setter** functions
* that intercept read/write attempts on the attribute

+++ {"slideshow": {"slide_type": "slide"}, "tags": ["level_intermediate"]}

### get / set example

```{code-cell}
:tags: [level_intermediate, gridwidth-1-2]

class Temperature {
    constructor(temperature) {
        this.kelvin = temperature
        // "set kelvin(temperature)" will be called
    }

    get kelvin() {
        return this._kelvin
    }

    set kelvin(temperature) {
        if (temperature < 0) {
            console.log("negative - refusing to set")
            return
        }
        this._kelvin = temperature

        // we must use the hidden variable this._kelvin
        // that will store the value entered
        // and will be returned when we ask for this.kelvin
        // thanks to the get kevin() function

        // if we had written this.kelvin = temp_value
        // that would call set kelvin(temp_value) again
        // and we would have an infinite loop

    }
}
```

```{code-cell}
:tags: [level_intermediate, gridwidth-1-2]

let temp = new Temperature(10)
```

```{code-cell}
:tags: [level_intermediate, gridwidth-1-2]

temp.kelvin = -10
```

```{code-cell}
:tags: [level_intermediate, gridwidth-1-2]

temp
```
