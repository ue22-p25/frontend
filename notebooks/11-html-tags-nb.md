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
short_title: HTML tags
---

# most common HTML tags

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## text tags: `<p>` and `<br>`

observe that newlines do not matter in HTML source code, usually they are treated as spaces

```{code-cell}
:tags: [remove-input]

let text_fragment = `<p>
it is wise to always embed your text
in a text tag like &amp;lt;p&amp;gt;,
that stands for paragraph,
and that of course gets justified
when the text is too wide to
fit within the available space.
</p>

<p>
Sometimes the separation between paragraphs is too much,
<br>
and in this case you can insert a simple linebreak
instead using the &amp;lt;br&amp;gt; tag
</p>
`
await tools.sample_from_strings({html: text_fragment}, {id: 'hello'})
```

---

## grouping: `<div>` and `<span>`

+++

* one **very common** tag is `<div>`
  * it is used to group together elements inside a single node
  * `<div>` stands for *division*
* there is also `<span>` that serves a similar purpose
  * except for the linebreaking behaviour
* they are an **essential tool** in any page design

---

### `<div>` and `<span>` example

```{code-cell}
:tags: [remove-input]

let group_html = `<p> a paragraph may  
<span style="background-color: #ddd;">
      contain a fragment
</span>
that we want to keep together,
typically for styling purposes,
but that is inline (no linebreak),
and for that use a &lt;span&gt; tag.</p>

<div style="background-color: #ddd;">
  <p> when you need to create a group that
      contain several paragraphs</p>
  <p> then a "div" tag is more suitable</p>
</div>`
await tools.sample_from_strings({html: group_html})
```

:::{admonition} what with the `style` thing ?
:class: seealso dropdown

this example uses styling - that we have not studied yet - to outline the <code>&lt;span&gt;</code> and <code>&lt;div&gt;</code>
elements by changing their background color
:::

---

### second example of `<div>`

```{code-cell}
:tags: [remove-input]

let group2_html = `<div>
the &amp;lt;div&amp;gt; tag is an essential unit brick
for creating a page layout<br>
if you inspect a real page, 
you will find &amp;lt;div&amp;gt; elements all over the place
</div>

<div style="position: absolute;
            bottom: 5px; right: 20px;
            background-color: aquamarine;
            font-size: x-small;">
  bottom<br>right
</div>`;
await tools.sample_from_strings({html: group2_html})
```

---

### there is also `<section>`

the `<section>` tag also provides grouping capabilities, but with a more semantic meaning  
for example your CV will probably end up with e.g. 5 sections (header, education, experience, skills, languages)  
however if your layout is sophisticated enough, you will probably end up with more than 5 divs, that are just there for layout purposes

:::{admonition} other semantic sectioning tags
:class: tip dropdown admonition-smaller
 other tags related to semantic sectioning: `<body>`, `<nav>`, `<article>`, `<aside>`, `<hgroup>`, `<header>`, `<footer>`, `<address>`, as well as `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, that we will see later on
:::

---

## lists: `<ul>`  `<li>` and `<ol>`

```{code-cell}
:tags: [remove-input]

let ul_fragment = `<div><p> a typical bullet list with a &amp;lt;ul&amp;gt; tag</p>
<br> <code>ul</code> stands for "unordered list"
<br> <code>li</code> stands for "list item"
<ul>
<li> the first bullet </li>
<li> the second bullet </li>
</ul>
</div>
`;
await tools.sample_from_strings({html: ul_fragment})
```

```{admonition} ordered list
:class: tip

in the code above, replace `<ul>` by `<ol>`  
and observe that the bullets become numbered
```

---

## code-like: `<pre>` and `<code>`

* `<pre>` stands for preformatted
* `<code>` is for a terminal-like font and style

```{code-cell}
:tags: [remove-input]

let code_fragment = `<p>for inserting code that should be kept as-is

<code><pre>
import numpy as np
import matplotlib.pyplot as plt

X = np.linspace(-2*np.pi, 2*np.pi)
Y = np.sin(X)
plt.plot(X, Y)
</pre></code>
</p>`
await tools.sample_from_strings({html: code_fragment})
```

---

## links and anchors: the `<a>` tag 

the anchor tag `<a>` serves two purposes :

* → create a **hyperlink** that can bring users to another location
* ← create a **name** locally so that this particular location can be **the target of** a hyperlink

+++

### hyperlink `<a href="some-url">`

typical **hyperlink** reads like this  

```{code-cell}
:tags: [remove-input]

let hyperlink_fragment = `some text with 
<a href="https://www.google.com/" target="_">
  a hyperlink
</a>
in the middle`;
await tools.sample_from_strings({html: hyperlink_fragment})
```

````{admonition} opening in another tab
:class: note admonition-smaller

here we also set `target="_"` so that the link opens in another tab (or window)
````

### name anchor `<a name="some-name">`

if you need a hyperlink to point, not at the beginning of this page, but somewhere in the middle, then create an anchor at that location

+++

### URL to an anchor

* you can then refer to that anchor from any other webpage using a URL that ends with `#the-anchor-name`
* so if this page is published as `https://example.com/some/page.html`
* then you can create a direct access to *the magic location*
* with a `<a href="https://example.com/some/page.html#the-anchor-name">`

+++

### local URL

here's an example of a page that has a named anchor (below the gray area) and a hyperlink to that location

````{admonition} do not worry about that gray blob for now
:class: admonition-small

we have not yet seen how to create this gray thingy, please admit it for now
````

```{code-cell}
:tags: [remove-input]

let redirect_fragment = `
<p>let us simulate a page with some content (the gray area below)<br>
we have put <b>a named anchor right below this area</b></p>

<p> it is easy to craft 
<a href="#the-anchor-name">a local URL: click me</a>
and the hyperlink below will bring you right down to the anchor</p>

<div style="height:500px; border-radius:10px; background-color: #ddd;"></div>

<p>
<a name="the-anchor-name">
<b>here is the named anchor</b>
</a>
and then some more text
</p>
`
await tools.sample_from_strings({html: redirect_fragment})
```

---

## `<table>`, `<tr>`, `<th>`, `<td>`...

use the `<table>` tag in to display tabular data (think, *e.g.* a spreadsheet)

```{code-cell}
:tags: [remove-input]

let table_html = `Use a &amp;lt;table&amp;gt; tag <b>only for data</b>
and not for layouts, there are other,
and much better tools, for creating fancy layouts
<table>
  <thead>
    <tr> <th> Name </th> <th> Rank </th> </tr>
  </thead>
  <tbody>
    <tr> <td> Alice </td> <td> 1st </td> </tr>
    <tr> <td> Bob </td> <td> 2nd </td> </tr>
  </tbody>
</table>`

let table_css = `
th {
    border: 3px solid red;
    padding: 20px;
}

td {
    border: 1px solid blue;
    padding: 5px 20px;
}
`

await tools.sample_from_strings({html: table_html, css: table_css})
```

```{admonition} historical note
:class: warning dropdown

in the early ages of HTML, tables were a;; over the place, for creating fancy layouts 
(e.g., a page that has several columns, side by side)

however, we strongly recommend that you stay away from that for the moment,  
especially if your goal is to create  grid-based layouts, that we will cover later on
```

---

## legacy tags

### header tags `<h1>` .. `<h5>`

```{code-cell}
:tags: [remove-input]

let headers_fragment = `<h1> toplevel title </h1>
<h2> first sublevel title </h2>
<h3> and so on </h3>
<h3> other subsublevel </h3>
<h2> second sublevel title </h2>`

await tools.sample_from_strings({html: headers_fragment}, {height: '18em'})
```

```{admonition} use together with semantic tags
So wrapping up, you will often find structures like this in real-world pages:

```{code-cell}
:tags: [remove-input]

let section_fragment = `<section>
  <header>
    <h2> section title </h2>
  </header>
  <p> section content </p>
  <p> another paragraph ...</p>
</section>`
await tools.sample_from_strings({html: section_fragment})
```

```{admonition} these tags are a bit old-school
:class: warning admonition-smaller dropdown

these tags are essentially <b>a legacy thing</b>; they are convenient, but not quite necessary,  
you can easily write your own classes (more about classes later on) to get a similar outcome, with more control on the result.
```

---

### styling tags: `<b>`, `<i>`, `<u>`, `<s>`

for the record only (these dates back to the old days when HTML was mimicking a word processor...)

* a handful of convenience tags for quick styling
  * like bold, italics, underline and similar

```{admonition} warning: do not overuse !
:class: warning admonition-small

however as we will see later on, there are **much more powerful** mechanisms  
so **don't use this at scale**, they are just conveniences  
the right way to go is often **to use classes**, that we study later on
```

```{code-cell}
:tags: [remove-input]

let styling_fragment = `<p>
there are tags for direct styling but <b>please note that their usage is discouraged</b> as generally you will style your own classes instead
</p>

<p>
tags for <b>bold</b> or <i>italics</i>
or <u>underline</u> or <s>strike-through</s>
<br>
that of course <u><b><i>can be combined</i></b></u>
</p>`
await tools.sample_from_strings({html: styling_fragment})
```
