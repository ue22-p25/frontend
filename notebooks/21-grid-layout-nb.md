---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  name: deno
  display_name: Deno
  language: typescript
short_title: grid layout
---

# `display: grid`

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

## purpose

to create grid-based layouts, obviously

````{admonition} historical note
:class: dropdown

creating this kind of layout has been a challenging task in the past

* the `<table>` tag has long been overused to address that sort of needs
* twitter's `bootstrap` has been used for this too at some point
* **do not use** these tools for that in 202x !
````

---

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

---

```{code-cell}
:tags: [remove-input]

let grid_html = `<div class="container">
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

let grid1_css = `.container {
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
/*await*/ tools.sample_from_strings({html: grid_html, css: grid1_css}, {id: 'grid-1', start_with: 'css', height: "16em"})
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

---

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

---

```{code-cell}
:tags: [remove-input]

let grid2_css = `.container {
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

/*await*/ tools.sample_from_strings({html: grid_html, css: grid2_css}, {id: 'grid-2', start_with: 'css', height: "16em"})
```

---

## ex3 - on rows too

in the previous examples :

* we have **not imposed** anything on **the height** of the result
* each box gets its height based on its content


it is also possible - although less often needed  
  * to fix a height globally and arrange the rows accordingly
  * only change is to add on the grid:
    * `height: 100vh` to say we want to use all viewport height
    * `grid-template-rows: 50px 1fr 100px;`  
      which specifies how to use vertical space


::::{admonition} width and height do not behave quite the same !
:class: tip dropdown admonition-small

you may not have realized it yet, but because in Western languages we read from
left to right and top to bottom, the horizontal and vertical directions are not
quite symmetrical when it comes to page layout

think of the width of a document as something fixed (by the device screen size),
but its height depends on the content...

this is why setting `grid-template-rows` is less often needed than setting `grid-template-columns`
 ::::

---

```{code-cell}
:tags: [remove-input]

let grid3_css = `.container {
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
/*await*/ tools.sample_from_strings({html: grid_html, css: grid3_css}, {start_with: 'css', height: "16em"})
```

---

## assignment: the css-tricks page

browse quickly - but entirely - the very good introduction to grids
[that can be found on css-tricks.com](https://css-tricks.com/snippets/css/complete-guide-grid/)
so as to get a good grip of what's achievable

````{admonition} optional game
:class: seealso dropdown

you may also complete this game  <https://cssgridgarden.com/> at home if you feel like it
````
