---
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
  title: grid layout
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# `display: grid`

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## purpose

* create grid-based layouts, obviously
* `grid` is now available in [all popular modern browsers](https://caniuse.com/#feat=css-grid)

````{admonition} historical note

creating this kind of layout has been historically a challenging task
* the `<table>` tag has long been overused to address that sort of needs
* twitter's `bootstrap` has been used for this too at some point
* **do not use** these tools for that in 202x !
````

+++ {"slideshow": {"slide_type": "slide"}}

## ex1 - proportional columns

+++ {"cell_style": "center", "tags": ["gridwidth-1-2"]}

next snippet demontrates:

* a proportional grid of [3 rows ⨉ 4 columns]
* with 4 areas defined, based on that tiling
  `header`, `main`, `sidebar`, and `footer`
* and 4 `<div>`s that are mapped on these areas
  *e.g.*  `grid-area: header`

+++ {"tags": ["gridwidth-1-2"]}

all this in one property:

```{image} media/grid-areas.png
:align: center
:width: 400px
```

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
grid_html = `<div class="container">
  <div id="item-a">
    the header<br>blabla
  </div>
  <div id="item-b">
    main area<br>blabla<br>blabla
  </div>
  <div id="item-c">
    side bar<br>blabla
  </div>
  <div id="item-d">
    a footer<br>blabla
  </div>
</div>`

grid1_css = `.container {
  display: grid;
  grid-template-columns:
    1fr 1fr 1fr 1fr;
  grid-template-areas:
    "header header header header"
    "main   main   .      sidebar"
    "footer footer footer sidebar";
}

#item-a {
    grid-area: header;
    background-color: #ffba5a;
}
#item-b {
    grid-area: main;
    background-color: #3282b8;
}
#item-c {
    grid-area: sidebar;
    background-color: #db3056;
}
#item-d {
    grid-area: footer;
    background-color: #7fa998;
}`
tools.sample_from_strings({html: grid_html, css: grid1_css}, {id: 'grid-1', start_with: 'css', height: "16em"})
```

````{admonition} notes
:class: tip

* the areas must be rectangular (no T- or L-shape)  
* each child is assigned an area in the grid through the `grid-area` property  
* note the mention of a *grid-specific* length unit `1fr`
  * `fr` stands for 'free space'
* so on this specific example, we could have omitted `grid-template-columns` altogether  
  but wait for the next example...

```{admonition} and by the way
:class: note admonition-small

we could have written `repeat(4, 1fr)` instead of `1fr 1fr 1fr 1fr`
```
````

+++

## ex2 - partially fixed columns

mostly the same, but :

* we can specify fixed size for some columns
* only change is to replace
  * `grid-template-columns: 1fr 1fr 1fr 1fr` with
  * `grid-template-columns: 100px 1fr 5% 1fr;`
 
and now

* the first column has a fixed size
* the third column has a size proportional to the page width
* and columns 2 and 4 equally share whatever is left in width

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
grid2_css = `.container {
  display: grid;
  grid-template-columns:
    100px 1fr 5% 1fr;
  grid-template-areas:
    "header header header header"
    "main   main   .      sidebar"
    "footer footer footer footer";
}

#item-a {
    grid-area: header;
    background-color: #ffba5a;
}
#item-b {
    grid-area: main;
    background-color: #3282b8;
}
#item-c {
    grid-area: sidebar;
    background-color: #db3056;
}
#item-d {
    grid-area: footer;
    background-color: #7fa998;
}`

tools.sample_from_strings({html: grid_html, css: grid2_css}, {id: 'grid-2', start_with: 'css', height: "16em"})
```

## ex3 - on rows too

in the previous examples :

* we have **not imposed** anything on **the height** of the result
* each box gets its height based on its content
* it is also possible - although less often needed  
  to fix a height globally and arrange the rows accordingly
* only change is to add on the grid:
  * `height: 100vh` to say we want to use all viewport height
  * `grid-template-rows: 50px 1fr 100px;`  
    which specifies how to use vertical space

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
grid3_css = `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
  grid-template-rows: 50px 1fr 100px;
  height: 100vh;
}

#item-a {
    grid-area: header;
    background-color: #ffba5a;
}
#item-b {
    grid-area: main;
    background-color: #3282b8;
}
#item-c {
    grid-area: sidebar;
    background-color: #db3056;
}
#item-d {
    grid-area: footer;
    background-color: #7fa998;
}
`
tools.sample_from_strings({html: grid_html, css: grid3_css}, {start_with: 'css', height: "16em"})
```

## assignment: the css-tricks page

browse quickly - but entirely - the very good introduction to grids
[that can be found on css-tricks.com](https://css-tricks.com/snippets/css/complete-guide-grid/)
so as to get a good grip of what's achievable

````{admonition} optional game
:class: seealso

you may also complete this game  <https://cssgridgarden.com/> at home if you feel like it
````

+++ {"slideshow": {"slide_type": "slide"}}

## more vs-code tricks

+++

### insert a wrapping tag

when using these technologies, you are often in a position to **add wrapping tags** in your html

to do this easily under vs-code :

* select the text you want to wrap
* enter the palette - the swiss knife in vs-code  
  (mac: ⌘-⇧-p - Windows ⌃-⇧-p - in doubt, ask google)
* type `Emmet wrap with abbreviation`
* enter the tag name

+++ {"slideshow": {"slide_type": "slide"}}

in pictures: if you need to add a wrapping `<div>` / `</div>` around some text, select it

```{image} media/vs-code-0.png
:align: center
:width: 500px
```

+++ {"slideshow": {"slide_type": "slide"}}

then activate the palette and search for 'emmet: wrap with abbreviation'

```{image} media/vs-code-1.png
:align: center
:width: 500px
```

+++ {"slideshow": {"slide_type": "slide"}}

select that function, you will be prompted for the name of the wrapping tag

```{image} media/vs-code-2.png
:align: center
:width: 500px
```

+++ {"slideshow": {"slide_type": "slide"}}

### custom keybinding

it is rather straightforward to attach a custom keybinding to that function if you use it often  
start with .. the palette, of course

```{image} media/vs-code-3.png
:align: center
:width: 500px
```

+++ {"slideshow": {"slide_type": "slide"}}

for example here, we just type 'Alt-o' and the shortcut gets recorded from now on

```{image} media/vs-code-4.png
:align: center
:width: 500px
```
