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
  title: React apps basics
---

+++ {"slideshow": {"slide_type": "-"}}

Licence CC BY-NC-ND, Thierry Parmentelat

```{code-cell}
tools = require('../js/tools'); tools.init()
```

# simple React apps

in this notebook we will see 2 small React apps

* one that is a toy really, that displays 2 counters;  
  each counter has a pair of + / - buttons to modify the counter

* another a little more elaborate, that implements a calculator

there is also a looooong list of examples here <https://reactjsexample.com>

+++

## app #1: the dual-counters app

the git repo for this app is <https://github.com/ue22-p24/web-react-counters>

````{admonition} read the assignment first
:class: warning

make sure to read the section "**app #1: the dual counters app**" section entirely before you start anything
````

+++

### your assignment

* clone the repo
* get it to work in your laptop
* add a third counter with a label of your choice  
  and observe how the notion of component makes this task much easier than with
  the html/css/js paradigm

+++

### what you'll need to know : getting started

the simplest way to get started is (click the arrow to see the details of each step)

````{admonition} you will need nodejs installed
:class: dropdown

* you can for example leverage `conda` for that

  ```shell
  # react-sandbox is just one arbitrary name
  conda create -n react-sandbox -c conda-forge nodejs
  conda activate react-sandbox
  ```

* this will give you the `node` and the `npm` commands

  ```shell
  # to check that you're all set
  node --version
  npm --version
  ```

````

````{admonition} clone the repo, and cd in there
:class: dropdown

* *you know how to do this, right ?*

````

````{admonition} install the dependencies
:class: dropdown

* you need to run this only once, of course

  ```shell
  npm install
  ```

  which will fetch a whole bunch of libraries in the `node_modules` folder  
  **warning:** be patient, and expect several hundreds of MB..

````

````{admonition} start the development server
:class: dropdown

* to run the app in devel mode

  ```shell
  npm start
  ```

  ```{admonition} authorization
  :class: attention

  you may be asked for your authorization to open a port on your laptop; answer yes

  ```

````

<br>

at that point you should have the application running in your browser (and executing in your laptop)

be aware that the `npm start` command will not return: it keeps monitoring
changes made to the files on the disk, and will trigger any recompilation
needed; bottom line is, you just need to save changes in vs-code, and the app
reflects them immediately, not need to reload the page nor anything !

+++

### what you'll need to know: the framework

the files of interest are mostly these (the other ones are just boilerplate that
come with the project when you create it)

```shell
./public/
  index.html
./src/
  index.js         <- the main entry point  in JSX
  index.css        <- related style sheet   in CSS
  App.js           <- creates 2 Counters    in JSX
  App.css          <- related style sheet   in CSS
  components/
    Counter.js     <- Counter component     in JSX
    Counter.css    <- related style sheet   in CSS
    Button.js      <- Button component      in JSX
    Button.css     <- related style sheet   in CSS
```

but wait, take a closer look, there's a large number of wtf's waiting for you

here are some points of astonishment, as compared to what
you might expect with respect to html/css/js, that deserve to be outlined:

+++

#### no need to reload

that's already a plus, as compared with the traditional page setup: **just save
your changes**, and you see them right away; for people who code all day long,
that is genuine relief !

+++

#### the HTML is irrelevant

there is no html file; or rather, there's just one in `public/index.html` and if
you look into it, it's vastly empty; actually, the html skeleton is **entirely
built from the js code**, so there's no need for html

+++

#### not quite JS, but JSX

the biggest surprises are in the JS code, which is actually **written in so-called
JSX**; think of it as a preprocessor that will do a pass on the contents and
create a plain JavaScript file from that.

Let us start with a quick reading of the overview that can be found here:  
<https://reactjs.org/docs/introducing-jsx.html>

then look at these  2 files `App.js` and `Counter.js`  
I am sure you can guess what they do !  
You should notice at least things like

* the way to import css right from the js side:

  ```js
  // explicit import of css
  import './App.css'
  ```

* how JSX allows to mix HTML in the js side:

  ```js
  // some sort of mix between JS and HTML
  return (
    <div class="toplevel">
      <img src={logo} className="App-logo" alt="logo" />
      <Counter text="temperature" />
      <Counter text="pressure"  />
    </div>
  )
  ```

* also the notion of **components** is at work in the above fragment; here the
  `<Counter>` thing denotes a piece of the app defined in another js file; that
  makes the code written in this paradigm much more reusable

* and of course a component can refer to other components, like here

  ```js
  // here we have a mix of actual HTML tags (in lowercase)
  // and of components tags(Button, in CamelCase)
  return (
      <div class="counter">
        <span>{text} ({counter})</span>
        <div class="buttons">
          <Button text="-" type="decrease" onClick={decreaseCounter} />
           {/* here {counter} is automatically updated
               each time we call setCounter */}
          <span class="value">{counter}</span>
          <Button text="+" type="increase" onClick={increaseCounter} />
        </div>
      </div>
    )
  ```

+++

* you can also notice how **JS variables** can be used **right in the HTML**  
  when mentioned between `{}`, like e.g. this line above  
  `<span>{text} ({counter})</span>`

```{admonition} summary of some templating syntaxes
:class: tip dropdown small

as a side note, this resonates with quite a few tools that have to do with some sort of templating, that we've seen so far, let us summarize them

| templating engine | syntax |
|------------------: |--------|
| Python f-strings | `f"hello {name}"` |
| JS backticks | `` `hello ${name}` `` |
| Jinja2           | `{{ name }}` |
| JSX              | `{name}` |
```


#### sharing data with `useState`


so another very useful feature of React is `useState`; this line

```js
const [counter, setCounter] = useState(0)
```

declares 2 JS variables:

* the first one `counter` being a **storage variable** (here initialized to 0),
* and the second one `setCounter` being the **function** to use for
  **modifying** this variable

and the magic here being that each time this function is called, all the places
where it is used in the DOM will be updated; and indeed when e.g. the
`increaseCounter` callback is called, you can see in the app the counter being
updated in 2 separate locations (in the title, and between the buttons), with
one single call to `setCounter`.

not only this is powerful, but it also efficient (under the hood React maintains
a so-called virtual DOM, that allows it to compute the changes in memory, so it
can only update the parts that need to be; but that's another story entirely...)

### the assignment

you can now get around to finish the assignment, which is to add a third counter in the app

again in this development environment, there is no need to reload anything, just

* organize your screen with the editor on the left and the browser on the right
* do changes in the editor, and save them (or turn on vscode's auto-save feature)
* the changes apply immediately in the browser

the change should take you less than a minute  
**if you're ahead** you can also add a logo on top of the page - check out `App.css`
that already has provisions for that

+++

## app #2: a calculator

````{admonition} ditto: read the assignment first
:class: warning

make sure to read the whole section entirely before you start anything
````

about this app:

* [the presentation page](https://reactjsexample.com/simple-but-well-styled-calculator-made-by-using-hooks/)
* the related git repo is here
  <https://github.com/ue22-p24/web-react-calculator>
  which I actually forked from
  <https://github.com/vasilykhromykh/React-Calculator-With-React-Hooks>
  with purely cosmetic changes

+++

### your assignment

* clone the (ue22-p24) repo
* get it to work on your laptop (see above)
* implement a new feature
  * for example: add a (global) 'Clear' button that is missing  
    (as the backspace-like icon only clears one character in the expression)

  * or add more operations like // and % (integer division and modulo)
  * or whatever you deem interesting

+++

### what you'll need to know: the framework

this time the code structure is a little simpler, this app does not define any
component, so the files of interest are mostly these:

```shell
./public/
  index.html
./src/
  App.js           <- the calculator code   in JSX
  App.sass         <- related style sheet   in Sass
  index.js         <- the main entry point  in JSX
  index.sass       <- related style sheet   in Sass
```

the new thing here is the use of SASS instead of CSS

+++

#### not CSS, but SASS

CSS is sometimes considered tedious and boring; so there are a few alternatives
around, here we've picked SASS - see <https://sass-lang.com/guide> for more
details  
one visible difference is that there's no `{` or `}` or `;` like with Python,
it's the indentation that is meaningful  
SASS has been popular for a long time as it supported variables and nesting,
although these are now native in CSS

anyway, the point here is that can easily use alternative / higher-level tools
within the context of a React app.

+++

#### inline components

one other thing to notice is, this app does not have a `components/` folder;  
it does use components though; search for example for `CalcButton` in `App.js` to see how it's done

+++

## HOWTO start a react app from scratch

Finally, FYI assuming you'd like to write your own app, there's a tool that
creates the scaffolding for you:

+++

### create project skeleton

this requires a network connection and may take a while...
it will also download a rather huge amount of libraries and dependencies, that go into the `node_modules` folder

```shell
npx create-react-app react-myapp
```

+++

### run the watcher

you can then do as above:

```shell
cd react-myapp
npm start
```

and, after a while again, you get a message that reads `Edit src/App.js and save
to reload.` with a spinning react logo on top: you're ready to code !   
try it: change this message with vs-code (it appears in `src/App.js`) and save
the file, you will see the changes have been taken into account
