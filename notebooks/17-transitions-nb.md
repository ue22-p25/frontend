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
  title: CSS animations
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# CSS transitions and animations

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## transitions

* properties can change over time
* either on events (e.g. a hyperlink, when you hover on it, or click it)
* or programmatically (typically through JavaScript)

+++ {"slideshow": {"slide_type": "slide"}}

* the browser has the ability to perform those changes **smoothly**
  * over a certain duration
  * in a continuous way
* of course this applies to some properties only, e.g. **lengths** or **colors**
* anything that can be mapped to a **continuous** space,
  so that one can do **interpolation**, between the beginning and ending states

+++ {"slideshow": {"slide_type": "slide"}}

### transition example 1

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/17-transition1", {start_with: 'css'})
```

### how transitions work

* you need to define a `transition` property on the element
* e.g. the `<section>` element has  
  `transition: all 0.4s ease-in-out`
* then its `background-color` property changes somehow  
  here due to the `section:hover` selector
* the transition is requested to apply to `all` properties  
  so here it triggers to implement the color change
* and the `ease-in-out` algorithm is used  
  over a `0.4s` duration

+++

### the `transition` property

* is a **shorthand** property for setting in one rule
  * `transition-property` : comma separated names of properties  
     here we could/should have used `background-color` instead of `all`
  * `transition-duration`
  * `transition-timing-function`
  * `transition-delay` that we leave unchanged here (i.e. 0s)

+++

### most common timing functions

* `linear` is, well of course, linear interpolation
* the other 3: `ease-in`, `ease-out`, and `ease-in-out` make the move
  smoother at one or two ends of the duration range

* see a more detailed explanation from the *see also* section below

+++ {"slideshow": {"slide_type": "slide"}}

### transition example 2

```{code-cell}
---
slideshow:
  slide_type: '-'
tags: [remove-input]
---
tools.sample_from_stem("../samples/17-transition2", {separate_width: '800px'})
```

### do not overuse !

as a piece of advice

* transitions can make user experience very nice
* but **do not overuse them**
* too many moving pieces quickly become **more confusing than helpful**

also notice that this starts to have to do with **responsiveness**

* that deals with defining layouts that cope with geometry changes
* that we will cover later on
* here for example we have used `flex` (more on this later)

+++

### transition example 3 (advanced)

transitions apply **to all** changes, not only triggered by a user

here we use JavaScript (studied later) to alter a `<div>`'s size  
with e.g. `growing.style.width = '200px'`

```{code-cell}
---
slideshow:
  slide_type: '-'
tags: [remove-input]
---
tools.sample_from_stem("../samples/17-transition3", {start_with: 'js'})
```

## animations

* there is also a notion of **animations** in CSS
* simply put, an animation allows to define a succession of states  
* each state being a collection of CSS properties
* together with the point in time where they should apply

for example :

* at the beginning of the duration (0%) background-color is red and color is blue
* somewhere in the middle, say at (25%) of the duration, they become green and yellow
* then at the end of the period (100%) they become black and white

+++

### more on animations

* see [one example on codepen](https://codepen.io/team/css-tricks/pen/EjaJNd) for a better idea of what can be achived
* extracted [from this blog on CSS-Tricks](https://css-tricks.com/almanac/properties/a/animation/)  
  that is left to the interested reader as an exercise

* **WARNING** like with transitions, and fun as they are,  
  these techniques should be used with extreme circumspection

+++ {"slideshow": {"slide_type": "slide"}}

## see also

* [transitions on css-tricks](https://css-tricks.com/almanac/properties/t/transition/)
* [animations on css-tricks](https://css-tricks.com/almanac/properties/a/animation/)
* an explanation, among other things,  
 [about `linear`, `ease-in`, `ease-out`, and `ease-in-out`](https://www.freecodecamp.org/news/css-transitions-explained-d67ab9a02049/)
