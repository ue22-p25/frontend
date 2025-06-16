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
  title: html tags
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# most common HTML tags

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"slideshow": {"slide_type": "slide"}}

## text tags `<p>` and `<br>`

```{code-cell}
:tags: [remove-input]

text_fragment = `<p> it is wise to always embed your text
in a text tag like &amp;lt;p&amp;gt;,
that stands for paragraph, and that of course gets justified
when the text is too wide to fit within the available space.</p>

<p>Sometimes the separation between paragraphs is too much,
<br> and in this case you can insert a simple linebreak
instead using the &amp;lt;br&amp;gt; tag
</p>
`
tools.sample_from_strings({html: text_fragment})
```

+++ {"slideshow": {"slide_type": "slide"}}

## lists with `<ul>`  and `<li>`

```{code-cell}
:tags: [remove-input]

ul_fragment = `<div><p> a typical bullet list with a &amp;lt;ul&amp;gt; tag</p>
<br> <code>ul</code> stands for "unordered list"
<br> <code>li</code> stands for "list item"
<ul>
<li> the first bullet </li>
<li> the second bullet </li>
</ul>
</div>
`;
tools.sample_from_strings({html: ul_fragment})
```

```{code-cell}
:tags: [remove-input]

ol_fragment = `<div><p> the same with a &amp;lt;ol&amp;gt; tag instead</p>
<br> <code>ol</code> stands for "ordered list"
<ol>
<li> the first bullet </li>
<li> the second bullet </li>
</ol>
</div>
`;
tools.sample_from_strings({html: ol_fragment})
```

+++ {"slideshow": {"slide_type": "slide"}}

## styling tags

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

styling_fragment = `<p>
there are tags for direct styling but <b>please note that their usage is discouraged</b> as generally you will style your own classes instead
</p>

<p>
tags for <b>bold</b> or <i>italics</i>
or <u>underline</u> or <s>strike-through</s>
<br>
that of course <u><b><i>can be combined</i></b></u>
</p>`
tools.sample_from_strings({html: styling_fragment})
```

+++ {"slideshow": {"slide_type": "slide"}}

## code-like

* `<pre>` stands for preformatted
* `<code>` is for a terminal-like font and style

```{code-cell}
:tags: [remove-input]

code_fragment = `<p>for inserting code that should be kept as-is

<code><pre>
import numpy as np
import matplotlib.pyplot as plt

X = np.linspace(-2*np.pi, 2*np.pi)
Y = np.sin(X)
plt.plot(X, Y)
</pre></code>
</p>`
tools.sample_from_strings({html: code_fragment})
```

## hyperlinks, and the anchor tag `<a>`

the anchor tag `<a>` serves two purposes :

* → create a **hyperlink** that can bring users to another location
* ← create a **name** locally so that this particular location can be **the target of** a hyperlink

+++

### hyperlink `<a href="some-url">`

typical **hyperlink** reads like this  

````{admonition} opening in another tab
:class: note

here we also set `target="_"` so that the link opens in another tab (or window)
````

```{code-cell}
:tags: [remove-input]

hyperlink_fragment = `<a href="https://www.google.com/" target="_">the hyperlink</a>`;
tools.sample_from_strings({html: hyperlink_fragment})
```

### name anchor `<a name="some-name">`

if you need a hyperlink to point, not at the beginning of this page, but somewhere in the middle, then create an anchor at that location

+++ {"slideshow": {"slide_type": "slide"}}

### URL to an anchor

* you can then refer to that anchor from any other webpage using a URL that ends with `#the-anchor-name`
* so if this page is published as `https://example.com/some/page.html`
* then you can create a direct access to *the magic location*
* with a `<a href="https://example.com/some/page.html#the-anchor-name">`

+++ {"slideshow": {"slide_type": "slide"}}

### local URL

here's an example of a page that has a named anchor (below the gray area) and a hyperlink to that location

````{admonition} do not worry about that gray blob for now
:class: admonition-small

we have not yet seen how to create this gray thingy, please admit it for now
````

```{code-cell}
:tags: [remove-input]

redirect_fragment = `
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
tools.sample_from_strings({html: redirect_fragment})
```

+++ {"slideshow": {"slide_type": "slide"}}

## grouping with `<div>` and `<span>`

+++

* one **very common** tag is `<div>`
  * it is used to group together elements inside a single tree
  * `<div>` stands for *division*
* there is also `<span>` that serves a similar purpose
  * except for the linebreaking behaviour
* an **essential tool** in any page design

+++ {"slideshow": {"slide_type": "slide"}}

### `<div>` and `<span>` example

```{code-cell}
:tags: [remove-input]

group_html = `<p> a paragraph may  
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
tools.sample_from_strings({html: group_html})
```

```{admonition} note on styling
:class: seealso

this example uses styling - that we have not studied yet - to outline the <code>&lt;span&gt;</code> and <code>&lt;div&gt;</code>
elements by changing their background color
```

+++ {"slideshow": {"slide_type": "slide"}}

### second example of `<div>`

```{code-cell}
:tags: [remove-input]

group2_html = `<div>
the &amp;lt;div&amp;gt; tag is an essential unit brick for creating a page layout
</div>
<div style="position: absolute;
            bottom: 20px; right: 20px;
            background-color: aquamarine;">
  <div style="margin: 20px">if you inspect a real page, you will see </div>
  <div style="padding: 10px">that <b>div</b> elements are
     typically all over the place</div>
</div>`;
tools.sample_from_strings({html: group2_html})
```

+++ {"slideshow": {"slide_type": "slide"}}

## a word on tables

+++

there indeed is a `<table>` tag in html;  
in the early ages of HTML, tables were present everywhere, for creating fancy layouts

however, we strongly recommend that you stay away from that for the moment,  
especially if your goal is to create  grid-based layouts, that we will cover later on

+++

### `<table>` in action

```{code-cell}
---
slideshow:
  slide_type: slide
tags: [remove-input]
---
table_html = `Use a &amp;lt;table&amp;gt; tag <b>only for data</b>
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

table_css = `
th {
    border: 3px solid red;
    padding: 20px;
}

td {
    border: 1px solid blue;
    padding: 5px 20px;
}
`

tools.sample_from_strings({html: table_html, css: table_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

## header tags `<h1>` .. `<h5>`

```{code-cell}
:tags: [remove-input]

headers_fragment = `<h1> toplevel title </h1>
<h2> first sublevel title </h2>
<h3> and so on </h3>
<h3> other subsublevel </h3>
<h2> second sublevel title </h2>`

tools.sample_from_strings({html: headers_fragment}, {height: '18em'})
```

```{admonition} these tags are old-school
:class: note

these tags are essentially <b>a legacy thing</b>; they are convenient, but not quite necessary,  
you can easily write your own classes (more about classes later on) to get a similar outcome, with more control on the result.
```
