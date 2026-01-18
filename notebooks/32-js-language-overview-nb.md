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
short_title: 30,000 ft overview
---

# 30,000 ft overview of JavaScript

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## preamble

* in this notebook, we will very briefly cover **some** features of the language
* for a more thorough study, refer to [this excellent tutorial on javascript.info](https://javascript.info/)
* as we go, we will point at a selection of chapters in that tuto
* students interested should probably read it through

also remember that we focus on the **browser runtime** here  
refer to [this screenshot to spot the browser console](10-html-basics-nb.md#label-repl)

---

## `console.log()` function

* a function to show output - quite similar to Python's `print()` function
* accepts any number of arguments
* of course from a browser it ends up in the devel tools area (under `node` it will just print)

```{code-cell}
console.log(1, "two", [3, "four"])
```

````{admonition} super useful for debugging
:class: tip

if the argument is an object:  
* it will be displayed as a collapsible with togglable arrows `→` / `↓`  
* so you can explore the data structure interactively

try `console.log(window)` in the browser console to see that in action
````

see also below [how to format strings with backticks](#label-backticks) a la Python f-strings

---

## syntax

* the syntax is similar to C, C++ and Java
* unlike Python, indentation does not matter
* `;` is commonly used at the end of each statement (although this is **not mandatory**)[^semicolon]

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

[^semicolon]: being a Pythonist at heart, I prefer omitting semicolons whenever possible; this is not a very widespread practice though if I'm being honest

### tests and loops

* `if` and `while` statements are similar to C

  ::::{grid} 2

  ```{code-cell}

  // conditional if
  if (a == 10) {
      console.log("YES", a)
  } else if (a == 12) {
      //
  } else {
      //
  }
  ```

  ```{code-cell}

  while (a >= 5) {
      console.log(a)
      a -= 3
  }
  ```

  ::::

---

### `==` vs `===`

talking of tests, a common pitfall for newcomers is the difference between `==` and `===`[^equality-operators]

* `==` : loose equality, performs type coercion if needed
* `===` : strict equality, no type coercion

```{code-cell}
console.log( 10 == '10' )    // true - loose equality
console.log( 10 === '10' )   // false - strict equality
```

[^equality-operators]: this resonates a bit, but not quite exactly, with Python that has `==` and `is` to compare values vs identities

---

### C-style `for` loop

* C- or Java-like iteration loops are supported - although seldom needed

```{code-cell}
for (let i=0; i<2; i++) {
    console.log(i)
}
```

````{admonition} seldom the right way
this is **not the right way** to iterate over an array as we'll see later on
````

---

### `switch`

the switch statement in JavaScript
is similar to the ones in C++ and Java  
it will branch your control flow into a
location that depends on the subject's value

**do not forget** the `break` statements !

```{code-cell}
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
:class: tip dropdown admonition-small

if the switch statement is new to you, please refer to this [full article on javascript.info](https://javascript.info/switch)
````

---

## variables

### declaration

* as usual, variables are **names** that refer to **data in memory**
  * like in Python, any such data is **typed** (although the name is not)
  * core language has some **basic types**
* variables should be **explicitly declared** using one of the keywords `let` or `const`

::::{grid} 2
```{code-cell}

let n = 10
console.log(typeof(n))

// possible since declared with let
n += 20
```

```{code-cell}

const s = "hello world"
typeof(s)

// we could not do this
// because declared with const
// s += ' john'
```
::::

````{admonition} prefer const when relevant
:class: note

use `const` instead of `let` when declaring a constant variable
````

````{admonition} link in tuto
:class: admonition-small dropdown tip

see more on this topic on javascript.info at this link <https://javascript.info/variables>
````

---

### Python-style unpacking

```{code-cell}
// there is a form of parallel assignment
// similar to what Python offers

let [py, thon] = [10, 20]

console.log(py, thon)
```

---

### object unpacking

anticipating a bit, but there's a very handy construction that looks a bit like the one above

```{code-cell}
// you receive some data from the outside
const data = {height: 100, width: 200, radius: 20, linewidth: 5}

// and you're interested in extracting width and height
// in two variables of the same name; easy !
const {height, width} = data

console.log(height, width)
```

---

## variable scope

* like in all other languages, there is a need to limit the scope of a variable  
  so that variable `x` in 2 distinct functions do not clash

* JS uses **lexical nested scope**:  
  a variable is visible only within its **code block** (the stuff within `{}`)

::::{admonition} unlike Python
:class: admonition-small

this is like in C/C++, and unlike Python where a variable's scope is the whole function
::::

::::{admonition} cannot use `let` twice
:class: warning

you cannot declare the same variable twice in the same block
::::

---

### blocks `{}` and scope illustrated

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

---

### do **not** use `var` !

* (a lot of) legacy code uses the `var` construct to declare variables - but **this is dangerous !!**
* JS being lax, it may accept a code where you don't declare a variable at all  
  note that in this case you're actually using a global variable - which is bad practice !
* bottom line: you should **always declare your variables with `let` or `const`**

---

## globals

context (browser components mostly) is exposed to programer through a set of **global variables**, e.g.

* `window` - the browser window
* `document` to access the DOM, remember `getElementById()`
* `console` like in `console.log()`
* `this` - a tricky one

````{admonition} depends on the runtime
:class: admonition-small

of course there is for example no `window` global in the context of the `node.js` interpreter !
````

````{admonition} cannot inspect the browser globals from here
:class: warning dropdown admonition-small

as it turns out, the code embedded in these notebooks is executed by an instance of `node.js`  
for this reason so we could **not** inspect the `document` or `window` variables from right here  
but of course you can do so from the browser's console though
````

---

(label-backticks)=
## formatting with backticks

in JS, the backticks <code>&#96;&#96;</code> feature reminds of Python's f-strings

```{code-cell}
let [x, y] = [100, 200]

// the `` is very similar to Python's f-strings
// except that you use ${expression} 
// note the extra $ as compared to Python

console.log(`x = ${x} and x+y = ${x+y}`)
```

---

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

const bar = (x, y) => console.log(`from bar: ${x} + ${y} = ${x+y}`)
bar(100, 200)
```

```{code-cell}
// you can use { } if the code is more than one-line
// but make sure to explicitly use 'return' if you do !
const bar2 = (x, y) => {
    let [x2, y2] = [x**2, y**2]
    return x2+y2;
}

bar2(10, 20)
```

---

### loose parameter binding

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

---

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

---

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

---

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

---

## classes

as of ES2015, the language has a proper `class` statement

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

````{admonition} old-school pseudo classes in JS before ES6
:class: admonition-small dropdown warning

FYI, older JavaScript did not have a builtin class mechanism, and used other - quite cryptic - ways to create pseudo-classes  
you may come across such older-school code that uses techniques typically involving a `prototype` thingy  
but just stay away from that when you write new code, and just stick to the new idiom !
````


<!-- ````{admonition} cannot run this cell twice under Jupyter
:class: warning dropdown

here again, when executing this under Jupyter, running this cell twice will cause an error  
this is because, just like with `let`, the language **won't let** you define the same `Vector` class **twice** in the same scope
```` -->

---

### notes on classes

**NOTICE** the following facts from that first class example :

* `constructor` is very much alike `__init__` in Python
* the **implicit** `this` variable refers to the current object  
  it is very much alike the traditional `self` argument in Python, except that it is **not mentioned** as a method parameter

* objects get created with `new Vector()` - Java and C++ style  
  and **not** just plain Python-style `Vector()`

* of course, inheritance is supported too; see `extends` and `super()` for details

---

### get / set (advanced)

* modern JavaScript has a native notion of what Python calls *properties*
* i.e. expose an apparently mundane access to an instance attribute
* through **getter** and **setter** functions
* that intercept read/write attempts on the attribute

```{code-cell}
// get / set example

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

---