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
  title: 'practice: your resume'
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# putting it all together

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## assignment

* as a conclusion of this overview on CSS,
* review your resume to create fancier layouts
* and so it **becomes responsive**
  * it should display properly on a phone, tablet, and laptop
* of course this implies that
  * the **content** is always the same
  * but the arrangement of the various pieces changes with the viewport width

+++ {"slideshow": {"slide_type": "slide"}}

## a sample cv

* here is one example
  * please do not try to mimick this example too closely,  
    it is just there so you can get a sense of what is possible;

  * plus, it is far from perfect anyway ...
  * but make sure to open it in a separate window  
    and observe its responsive behaviour

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
tools.sample_from_stem("../samples/26-monarque/resume", {sources_show: false})
```

+++ {"slideshow": {"slide_type": "slide"}}

## where to find the example

* previous example can be found together with the course   
  in the git repo
  <https://github.com/ue22-p24/web>
* specifically in the `samples/26-monarque` folder
* note that some of the other examples of the course  
  can be found in the `samples/` folder

+++ {"slideshow": {"slide_type": "slide"}}

## publishing

* once you're satisfied
* and provided that you have no problem with your resumé being **publicly available**
* you can **easily publish it on `github.io`** (see next slide)
* plus tons of other opportunities around as well

+++ {"slideshow": {"slide_type": "slide"}}

### publishing on github.io

* this is simple and free
* only supports **public pages** though

assuming your github slug is `myid`

* create a repo on github `myid/myid.github.io`
* make it public
* name the entry point as `index.html`
* your resume will be shortly available at `https://myid.github.io/`
* and simply push changes to have them published

see <https://pages.github.com/> for details

+++ {"slideshow": {"slide_type": "slide"}}

## another example

and finally, for fun, see a **much more** elaborated example below ;)

<http://www.rleonardi.com/interactive-resume/>
