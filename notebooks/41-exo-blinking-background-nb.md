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
short_title: "blinking + develtools"
---

# practice : blinking background

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

**make sure you read this notebook thoroughly before you start**

in this notebook :

* a simple assignment
* plus a few tips to get started

---

## assignment

create or reuse a HTML document as a collection of 3 files

::::{admonition} commit your files first

it can be your resumé, or any other; if they have ay value (e.g. your resumé),
don't forget to commit them first...
::::

1. make sure the html `<head>` loads **both** the css and js companions
2. then edit the JavaScript code, so that the **background alternates** every 1
   second between 2 different colours  
   note that there are many approaches to achieving this, and at least 2:

     * either changing properties directly on the DOM,
     * or messing with CSS classes  
   and early finisher should give both angles a go  

in any case you should obtain something like this

(label-blinking-demo)=

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem("../samples/41-resume-blinking", {sources_show: false})
```

---

## tip #1 : run code upon load

so, you want to start some code - say call function `start()` - **right after the page loads**

### the wrong way

it is tempting, but **totally unsafe**, to do something like

```html
<!-- DO NOT DO THIS -->

<script src="thecode.js">
</script>

<script>
start('some-data')
</script>
```

because:
- at the time when `start('some-data')` gets executed, your page is **still in the middle** of the loading phase ! 
- you might be lucky and this may work just fine for you, but then it is *just a coincidence* and **that is not right**

---

### the proper way

the proper way is to attach a **callback** to the document's **`DOMContentLoaded`** event

```javascript
// attach an (anonymous) function to the 'load' event
document.addEventListener(
    'DOMContentLoaded',                   // the event name
    () => start('some-data')  // the callback: must be a function
)
```

this time, `start()` will get **called later** at a time where you can be sure the document is entirely **loaded**

---

## tip #2: implementing a cyclic task

implementing a cyclic task was done in example 2 already; as a reminder it is based on `setInterval()`:

```{code} js
:linenos:
:emphasize-lines: 11
// not mandatory, but with this soft switch
// we could easily turn the blinking on and off
let active = true;

function one_step() {
    if (active)
        console.log("beep");
}

// start the cyclic job: will call one_step() every 1s
const interval = setInterval(one_step, 1000)
```

---

````{admonition} single tasking vs multi tasking
:class: note

the kind-of equivalent in Python would look like:

```python
while True:
    if active:
        one_step()
    sleep 1
```

however with such an approach, the Python interpreter **can't do anything else** at the same time  
notice how here with JS, the browser is still able to **do other things** ! 
````

---

### turning it off

quick users may want to implement some sort of trick to turn off the blinking  
with the code above, we have 2 options to do that

1. just do `active = false`
   in that case the cyclic task is still there, but does nothing
2. or cancel the cyclic task altogether, like so
   ```{code} js
   clearInterval(interval)
   ```

---

## tip #3: the browser cache (yet again)

the browser cache thingy applies exactly the same with CSS and with JS

````{admonition} the browser cache
:class: warning

remember to **use Shift-reload**, or other cache-cleaning tool, if changes in a file do not seem to kick in
````

---

## tip #4 : use devel tools

* crucially important to get familiar with these tools
* and to turn to them **as soon as anything seems to ge wrong**
* here you will need to use the most useful ones :
  * *Elements*
  * *Console*
  * and to a lesser extent, *Sources*

---

### Devel Tools : *Elements*

as mentioned earlier already, you can

* navigate the DOM
* *Inspect* an element (find an element from a position in the page)
* see the CSS rules that apply to an element
* find out where these styles come from
* see the computed values for each property
* interactively change a property and see effect immediately

---

### visualizing a changed property

to quickly see the effect of a changed property  
of course once you're satisfied you should put it back in your CSS or JS code...

```{image} media/devel-tools-change-properties.png
:align: center
:width: 500px
```

---

### Devel Tools : the *Console* REPL

* the place where lands the output of `console.log` of course quite useful for naive debugging
* **and** that lets you **run JavaScript** on the fly much like the Python interpreter does  
  (this is known as a REPL = Read Eval Print Loop)

```{image} media/devel-tools-console-1.png
:align: center
:width: 450px
```

---

```{image} media/devel-tools-console-2.png
:align: center
:width: 500px
```

---

```{image} media/devel-tools-console-3.png
:align: center
:width: 500px
```

---

```{image} media/devel-tools-console-4.png
:align: center
:width: 500px
```

---

### Devel Tools : *Sources*

+++ {"tags": ["gridwidth-1-2"]}

occasionnally useful to browse the code actually loaded

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/devel-tools-sources.png
:align: center
:width: 500px
```

---

### Devel Tools : debugger

+++ {"tags": ["gridwidth-1-2"]}

the *Sources* tab has buit-in debugging features

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/devel-tools-debugging.png
:align: center
:width: 500px
```

---

### more on devel tools

* there are standard keyboard shortcuts to invoke devel tools,  
* e.g. for [google chrome](https://developers.google.com/web/tools/chrome-devtools/shortcuts)  
  * macOS `⌘ ⌥ J` (console) or `⌘ ⌥ I` (your last tab)
  * others `⌃ ⇧ J` (console) or `⌃ ⇧ I` (your last tab)
  * others `ctrl+shift+J` (console) or `ctrl+shift+I` (your last tab)
* a bit early for now, but be aware that they come with a complete debugger
* do not hesitate to search for some hands-on / video tuto
