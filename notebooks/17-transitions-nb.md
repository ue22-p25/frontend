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

# CSS transitions

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

(label-transitions)=

## what are transitions

properties can change over time

* either on events (e.g. a hyperlink, when you hover on it, or click it)
* or programmatically (typically through JavaScript)

the browser has the ability to perform those changes **smoothly**

* over a certain duration
* in a continuous way

of course this applies to some properties only, e.g. **lengths** or **colors**:  

* anything that can be mapped to a **continuous** space
* so that one can do **interpolation**

---

## transition example 1

```{code-cell}
:tags: [remove-input]
:label: transition-code

/*await*/ tools.sample_from_stem(
  "../samples/17-transition1", 
  {
    start_with: 'css',
    separate_width: '1000px',
    separate_height: '800px',
})
```

---

## how transitions work

* you define a `transition` property on the element; e.g. on `<section>` here we have  
  `transition: all 0.4s ease-in-out`  

* then whenever its `background-color` property changes somehow  
  here due to the `section:hover` selector

* the transition triggers, and **the change occurs smoothly**

* and the `ease-in-out` interpolation function is used over a `0.4s` duration  
  more on those below

::::{admonition} `all`
because we have specified `all`, the transition will apply to **all** properties that change  
it's possible to be more specific here of course
::::

---

## the `transition` property

* is a **shorthand** property for setting in one rule
  * `transition-property` : comma separated names of properties  
     here we could/should have used `background-color` instead of `all`

  * `transition-duration`
  * `transition-timing-function`
  * `transition-delay` that we leave unchanged here (i.e. 0s)

---

## most common timing functions

* `linear` is, well of course, linear interpolation
* the other 3: `ease-in`, `ease-out`, and `ease-in-out` make the move
  smoother at one or two ends of the duration range

* see a more detailed explanation from [the *see also* section below](#label-see-also-transitions)

---

## transition example 2

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem(
  "../samples/17-transition2", 
  {
    separate_width: '1200px',
    separate_height: '600px',
    font_size: '8px',
  })
```

---

## do not overuse !

as a piece of advice

* transitions can make user experience very nice
* but **do not overuse them**
* too many moving pieces quickly become **more confusing than helpful**

also notice that this starts to have to do with **responsiveness**

* that deals with defining layouts that cope with geometry changes
* that we will cover later on
* here for example we have used `flex` (more on this later)

---

## transition example 3 (advanced)

transitions apply **to all** changes, not only triggered by a user

here we use JavaScript (studied later) to alter a `<div>`'s size  
with e.g. `growing.style.width = '200px'`

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem(
  "../samples/17-transition3", {start_with: 'js'})
```

---

## animations (optional)

* there is also a notion of **animations** in CSS
* simply put, an animation allows to define a **succession of states**
* each state being a collection of CSS properties
* together with the point in time where they should apply

to go further:

* see [one example on codepen](https://codepen.io/team/css-tricks/pen/EjaJNd) for a better idea of what can be achived

::::{admonition} use with parcimony
:class: warning

like with transitions, and fun as they are, these techniques should be used with extreme circumspection
::::

---

(label-see-also-transitions)=

## see also

* [transitions on css-tricks](https://css-tricks.com/almanac/properties/t/transition/)
* [easing functions on css-tricks](https://css-tricks.com/ease-out-in-ease-in-out/)
* an explanation, among other things,
 [about `linear`, `ease-in`, `ease-out`, and `ease-in-out`](https://www.freecodecamp.org/news/css-transitions-explained-d67ab9a02049/)
* [animations on css-tricks](https://css-tricks.com/almanac/properties/a/animation/)
