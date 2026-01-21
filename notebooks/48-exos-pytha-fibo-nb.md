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
short_title: "Pythagore and Fibonacci"
---

# practice : Pythagore and Fibonacci

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

two activities to explore mathematical concepts visually

---

````{admonition} pythagore
:class: seealso

you are tasked to write a "graphical demonstration" for the Pythagorean Theorem, getting inspiration from the page below

the sample app is not responsive, you will need to open it in a separate window
````

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem("../samples/48-pythagore/pythagore",
                       {sources_show: false, separate_height: '1000px', separate_width: '800px'})
```

---

````{admonition} fibonacci and the golden number
:class: seealso

you are asked to write a small app as a html+css+js that explores the neighbourhood between fibonacci numbers and the golden number, taking - as loose as you want - inspiration from the page below

here again the sample app is not responsive, you will need to open it in a separate window

**HINT** the slope of the 2 fixed rules is of course the golden ratio and its inverse
````

```{code-cell}
:tags: [remove-input]

// the minified version somehow was not working...
/*await*/ tools.sample_from_stem("../samples/48-fibonacci/fibonacci",
                       {sources_show: false, separate_height: '1000px', separate_width: '900px'})
```
