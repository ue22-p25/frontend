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
  title: other html tags
---

# more HTML tags

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## multimedia

* [`<img>`](https://www.w3schools.com/tags/tag_img.asp)
* [`<audio>`](https://www.w3schools.com/html/html5_audio.asp)
* [`<video>`](https://www.w3schools.com/html/html5_video.asp)

find out more on these by yourselves

+++

## graphics and `<svg>`

* SVG is a complete subsystem to deal with vector graphics
* [learn more about SVG at w3schools](https://www.w3schools.com/graphics/svg_intro.asp) (basic)
* [and much more on css-tricks](https://css-tricks.com/svg-properties-and-css/)  
  (very advanced, including animations)

+++ {"slideshow": {"slide_type": "slide"}}

### svg example

```{code-cell}
:tags: [remove-input]

svg_html=`<h1>my first SVG</h1>

<svg width="200" height="200">
  <circle cx="50" cy="50" r="20" />
  <rect x="50" y="20" width="150" height="150" />
</svg>`

svg_css = `svg {
  border: 1px solid black;
}
rect {
  fill: blue;
  stroke: pink;
  stroke-width: 5;
  fill-opacity: 0.1;
  stroke-opacity: 0.8;
}

circle {
  stroke: rgb(100 200 50);
  stroke-width: 4;
  fill: yellow;
}`

tools.sample_from_strings({html: svg_html, css: svg_css})
```

## form-oriented

for building forms :

* `<input>` for entering data
* `<button>` for validating data
* `<form>` to group user-provided input  

out of scope for this course though, as it involves a backend

+++

## sectioning

* `<h1>` .. `<h6>` are only meaningful for the title line
* but are too poor to actually convey sectioning information
* so in addition to these, there are also
  * `<section>`
  * `<nav>`
  * [and a few others as described here](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines)

+++ {"slideshow": {"slide_type": "slide"}}

### sectioning example

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/18-sections")
```

## miscell others

in a jumble :

* `<br>` to insert a linebreak
* `<hr>` to insert a horizontal line
* `<iframe>` to insert another web page
* `<canvas>` is a more recent alternative to SVG for graphics,  
  [see more on css-tricks](https://css-tricks.com/learn-canvas-snake-game/)

+++ {"cell_style": "center"}

## practice

* before you start, make sure to read **next section on vs-code tricks**
* and then, as a conclusion of this first basic course, write your complete resume; you should have 2 files
  * `resume.html`
  * `resume.css`
* at this point, you may think of it as (if it were) a word document
  * with a header that has your details and photo
  * and the 4 well structured sections,
  * again *Experience*, *Education*, *Skills* and *Languages*
* try to print it in a PDF file, to evaluate how it fits with respect to an A4 page

````{admonition} do not worry about the layout for now
:class: tip

our next course will address overall layout in greater details  
(i.e. the relative place of all pieces wrt one another)  
so do not spend too much time on trying to make best usage of space at this point
````
