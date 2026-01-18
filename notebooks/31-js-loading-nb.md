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

# JS loading

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## page loading & asynchronism

### reminder : a few orders of magnitude

::::{grid} 2
:class: admonition-small

:::{div}
* CPU + memory : 1 ns
* storage :
  * SDD : 100 µs
  * HDD : 1-10 ms
* USB transfer latency : 1 ms
:::

:::{div}
* networking :
  * light-speed Paris-SF : 30 ms
  * light-speed Paris-Nice : 3 ms
  * plus, software stack traversals
  * plus, protocols = several back and forths
  * bottom line: more in the **several 100s of ms**
  * frequently several seconds
:::

::::

---

### a simple page

when loading the simplest possible page, contents get scattered into packets  
so it does not arrive all at once

```{image} media/loading-1-simple.excalidraw.svg
:align: center
:width: 500px
```

---

### a page with a nested page

if e.g. the html page uses one CSS stylesheet,  
there are 2 HTTP requests at work - essentially **at the same time**

```{image} media/loading-2-nested.excalidraw.svg
:align: center
:width: 500px
```

---

### loading a real page

Devel Tools can visualize the actual loading workflow

```{image} media/loading-3-google.png
:align: center
:width: 500px
```

---

## JS loading - howto

### open topic

* loading javascript is a bit tricky and is **still an open topic** because of:
  * asynchronism:
    * JS code might need to be loaded **before** the page is displayed
    * or **after** the page is displayed
    * or even **while** the page is being displayed
  * the evolutions of the language over time: proper modules are available only since ES2015
    * and that takes time to get widely adopted

````{admonition} and dependencies...
:class: note dropdown
we won't even touch on the subject of **dependencies** here, but be aware that:
* real-world JS programs often depend on **3rd-party libraries**
* those libraries might themselves depend on other libraries
* hence the need for a **dependency management system**
````

---

### simplest case

for our use case, it's simple though:  
we have a single HTML page, that needs to load one JS fragment  
and the good news is, there is one simple way : the `<script>` tag, that comes in 2 flavours:

* whether code is in a separate location (recommended)
* or inline (occasionnally handy)

---

## `<script src="...">` : load a URL

most often, code is stored in a **separate location**

* either as a companion to the HTML page
* or in a remote location

for that, use `<script src="some-url"></script>`

* so e.g. to load a JS file **in the same folder**, simply do  
  ```html
  <script src="foo.js"></script>
  ```
  ````{admonition} reminder
  :class: note admonition-x-small

  remember [the notebook on relative and absolute URLs](13-css-loading-nb.md#label-relative-urls) ?
  ````

* we can also use any URL in the `src` attribute to load from other folders or locations

  ````{admonition} good to know: cdnjs.com
  if you look for a specific JS library, be aware that [the CDNJS site](https://cdnjs.com/) exposes many common libraries through a publicly available CDN
  ````

---

### deferred loading

very convenient: by using `<script defer>`, you can ensure that the script runs **only once the entire page is loaded**

```js
<script src="foo.js" defer></script>
```

---

## `<script>` with inline code

::::{grid} 2

:::{div}
* quite simply, you can inject some JS code right into your HTML document, through a `<script>` tag
* this is **not** the usual way to do it though (for reusability, primarily)
:::

:::{div}
```html
<script>

  function hello() {
    console.log("Hello world");
  }

  hello()

</script>
```
:::

::::

---

## practice: `<body>` children count

* take a working html page of your choice
* create a separate file named `loading.js` that contains  

  ```js
  console.log('loading.js')
  console.log(`body has ${document.body.childElementCount} children`)  
  ```

* tweak the html header so that `loading.js` gets loaded
* open the html page, look at the console
* check that the message properly displays the number of children of your `<body>` tag

::::{admonition} no children ?
:class: tip

if you observe `0` children, that very likely means your script has run **before** the page was loaded...
::::