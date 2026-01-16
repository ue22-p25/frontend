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
short_title: CSS variables
---

# CSS variables

the official name for this feature is ***CSS custom properties***, but we'll
call them variables because that's the closest thing CSS has to offer that looks
like variables in a traditional language

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

---

## DRY: don't repeat yourself

* so far, we have not seen a way to "parametrize" things
* i.e. to use what other languages call *variables*
* like e.g., you want to use the same color in multiple places,  
   you need to repeat the color code each time  
   and then changing it is tedious and error-prone
* especially painful for people who want to use your code, but tweak it a bit  
  think: a themable website, where users want to change colors easily

---

## example 1: DRY

imagine you'd like to define a custom class:

* where the padding and margin properties are equal
* where the text color matches the border color
* and you want to be able to customize this on specific elements

let's see how that can be done

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem('../samples/25-simple-vars', {'start_with': 'css'})
```

---

## example 2: themeable document

a little more realistic example  
a document that can be displayed in light mode or dark mode, depending on user preference

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem('../samples/25-dark-mode', {
  'start_with': 'css', //height: '35em', iframe_max_height: '350',
})
```

::::{admonition} we've kept it simple
:class: dropdown

in this example we have not created a button to toggle between modes - 
this can be done with JavaScript, but is out of scope at this point

to exercise this, you just need to change your system global setting - which is OS-dependent;
- on macOS, go to *System Preferences → General → Appearance*
- on Windows, go to *Settings → Personalization → Colors → Choose your color*
::::

---

## how it works

* properties **whose name starts with `--`** are *custom* properties
* you can **use `var()` to get the value** of such a property
* like for regular properties, this typically involves **inheritance**
* by the way in CSS you can also use `calc()` to perform computations

::::{admonition} naming convention
this naming convention should resonate (a bit) with *dunder* names in Python
::::

---

## see also

* CSS-tricks' excellent summary on custom properties  
  <https://css-tricks.com/a-complete-guide-to-custom-properties/>

* another example on codepen that implements parametrized underlined headers  
  <https://codepen.io/t_afif/pen/bGYEMgG>
