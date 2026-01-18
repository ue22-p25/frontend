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

# more HTML tags

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## sectioning

* `<h1>` .. `<h6>` are only meaningful for the title line
* but are too poor to actually convey sectioning information
* so in addition to these, there are also more "semantic" tags
  * `<section>`
  * `<nav>`
  * [and a few others as described here](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines)

---

### sectioning example

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem("../samples/18-sections", {separate_width: '1000px', separate_height: '800px'})
```

---

## multimedia

* [`<img>`](https://www.w3schools.com/tags/tag_img.asp)
* [`<audio>`](https://www.w3schools.com/html/html5_audio.asp)
* [`<video>`](https://www.w3schools.com/html/html5_video.asp)

find out more on these by yourselves

---

## graphics and `<svg>`

* SVG is a complete subsystem to deal with vector graphics
* [learn more about SVG at w3schools](https://www.w3schools.com/graphics/svg_intro.asp) (basic)
* [and much more on css-tricks](https://css-tricks.com/svg-properties-and-css/)  
  (very advanced, including animations)

---

### svg example

```{code-cell}
:tags: [remove-input]

let svg_html=`<h1>my first SVG</h1>

<svg width="200" height="200">
  <circle cx="50" cy="50" r="20" />
  <rect x="50" y="20" width="150" height="150" />
</svg>`

let svg_css = `svg {
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

/*await*/ tools.sample_from_strings({html: svg_html, css: svg_css})
```

---

## graphics and `<canvas>`

the `canvas` tag is a more modern alternative to SVG for graphics  
it is a **programming-only** interface, so accessible via JavaScript  
don't panic, we'll cover that later on :)  
here's a simple example - just for a glimpse

```{code-cell}
:tags: [remove-input]

/*await*/ tools.sample_from_stem("../samples/18-canvas-basic",
  {
    start_with: 'js',
    separate_width: '700px',
    separate_height: '500px',
    })
```

---

## form-oriented

for building forms :

* `<input>` for entering data
* `<button>` for validating data
* `<form>` to group user-provided input  

out of scope for this course though, as it involves a backend

---

## miscell others

in a jumble :

* `<br>` to insert a linebreak
* `<hr>` to insert a horizontal line
* `<iframe>` to insert another web page
* and plenty more actually, but you can get started with these :)
