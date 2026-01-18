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
short_title: HTML basics
---

# HTML basics & devel tools

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

## HTML is based on tags

the HTML language structures the content of a web page
in terms of sections, headers, paragraphs, lists of items, images ...

the language is based on **tags** written between `<` and `>` - for example **`<head>`**

an **element** (a section, a header, ...) is composed by

* an opening tag e.g. `<head>`
* a content that can be empty
* a closing tag e.g. `</head>`

---

## HTML document structure

the overall structure of a HTML document is composed of two parts, a **header** and a **body**, like this:

```{code-cell}
:tags: [remove-input]

let fragment1 = `<html>
  <head>
     <!-- various document-wide declarations -->
  </head>
  <body>
     <!-- the actual document contents -->
     Hello
  </body>
</html>`

await tools.sample_from_strings(
  {html: fragment1}, {id: 'fragment1', separate_show: false})
```

---

## browser and server

### regular setup

usually the content gets fetched on the Internet  
with the `http://` protocol (or https..)

```{figure} media/browser-server-http.excalidraw.svg
:class: figure-outline
:width: 600px
:align: center

the usual browser-server setup
```

### our setup today

but today, we will instruct the browser to get files from our laptop  
hence the use of the `file://` protocol

```{figure} media/browser-file.excalidraw.svg
:class: figure-outline
:width: 600px
:align: center

the browser fetching files directly from the local filesystem
```

````{admonition} file: and CORS
:class: danger dropdown

please note that, as time goes by, using `file:` URLs for development is becoming less and less workable; notably because of new policies related to Cross-Origin cookies; but let's not get ahead of ourselves, this will work just fine for now

for more serious work, see [the page on setting up `vite` for a more realistic setup](62-vite-nb#label-vite)
````

---

## practice

```{admonition} a git repo for your first practice ?
:class: seealso dropdown

follow your teacher's instructions as to where to create your practice folder  
e.g. now might be a good time for creating a git repo so you can expose your work to them
```

* start from an empty folder
* open vs-code and create a file named `hello.html`  
* copy the above template
* open it in your web browser (preferably Chrome)
  * often you can simply double-click in the file explorer
  * or use the *File → Open File* menu
  * or directly type a URL like  
    `file:///the/complete/path/to/hello.html`

---

### your goal

you need to reproduce this:
- your `hello.html` should look like this (left hand side)  
- and in the browser it will look like this (right hand side)

```{code-cell}
:tags: [remove-input]

// need to set an id as the default is to hash the html content
// and we will reuse this later down the page
await tools.sample_from_strings(
    {html: fragment1},
    {id: 'fragment1_2', height: '12em', separate_show: false})
```

```{admonition} check out the URL
:class: note

also observe the URL that the browser has used to fetch your file <br>
it should look like `file:///the/path/to/your/current/directory/hello.html`
```

---

### accessing your browser's devel tools

* all browsers come with development tools for debugging
* as a first contact with these,  let us inspect the content of our HTML document
* for that, the simplest way is to
  * **right-click** on the `Hello` text
  * and choose *Inspect*

+++ {"tags": ["gridwidth-1-2"]}

```{image} media/inspect-element-menu.png
:align: center
```

````{admonition} devel tools
:class: note

this should open your browser's **devel tools**, which depending on your browser, may require additional preparation or installation steps  
we recommend using Chrome in case it is not working as expected

```{admonition} cannot find the devel tools ?
:class: tip dropdown

* if you cannot see the devel tools (see next slide for a glimpse)
  it means your browser may need additional installation (google for how to do that)

* here's how to check your browser (all this on mac at least)

 * on ***Safari***: you should have a ***Develop*** menu in the main menubar:  
    * *File Edit View History Bookmarks **Develop** Window*
 * on ***Chrome***: you should have a ***Developer*** submenu  
   in the *View* menu in the main menubar

 * on ***Firefox***: you should have a ***Web Developer*** entry  
   in the *Tools* menu in the main menubar
```
````

---

## the *Elements* tab

```{image} media/inspect-element-elements.png
:align: center
```

* left pane, navigate the elements
* right pane, visualize the selected element's applicable *Styles* and *Computed* properties
  (more on this later)

```{admonition} navigating the elements tree
:class: note

from that view you can navigate the elements tree, although in this case it is very simple, with just 3 nodes
```

---

## the *Console* tab

another interesting part is the (JavaScript) ***Console*** tab  
this is where **debug messages** end up (if any; here of course there are none)

```{image} media/inspect-element-console.png
:align: center
```

---

(label-repl)=
### the REPL

the area with the `> ` is the REPL (i.e. Read, Eval, Print Loop)  - juste like the `>>> ` with Python  
where you can type and run your first JavaScript code

```{image} media/inspect-element-console-code.png
:align: center
:width: 600px
```

---

## DOM = Document Object Model

* the `<tag> ... </tag>` notation
* unambiguously maps to a tree structure known as an Abstract Syntax Tree (AST)
* referred to in all documentation as "*the DOM* "

`````{grid} 2

````{card}
this HTML fragment
```html
<html>
 <head>
  <title>top title</title>
 </head>
 <body>
  <p>a paragraph</p>
  <p>a paragraph</p>
 </body>
</html>
```
````

````{card}
will result in this tree
```{image} media/abstract-syntax.excalidraw.svg
:width: 400px
:align: center
:label: label-dom-tree
```
````
`````

```{admonition} elements
:class: admonition-smaller

nodes in this tree are called **Elements**  
it is the basis for navigating the document in the ***Elements*** devel tools tab
```

---

## be rigourous

* browsers tend to be as tolerant as possible
* e.g. omitting a closing tag may render just fine
* **however** there's only so much that can be guessed
* and this may cause **huge headaches** down the road
* so make sure to **always *close your tags* properly**

### do not do this !!

```{code-cell}
:tags: [remove-input]

let fragment_unclosed = `<p> do not do this
<ul>
<li> unclosed tags <b>look like</b> they work
<li> but they will hurt eventually
`

await tools.sample_from_strings({html: fragment_unclosed}, {separate_show: false})
```

### do this instead

```{code-cell}
:tags: [remove-input]

let fragment_closed = `<p> do this instead </p>
<ul>
<li> always close your tags </li>
<li> clean up behind yourself </li>
</ul>
`

await tools.sample_from_strings({html: fragment_closed}, {separate_show: false})
```

---

## a few tips

* vs-code has great support for editing `html` documents
  * even with no extension installed
  * [see e.g. this page for details](https://code.visualstudio.com/docs/languages/html)
  * and [in particular emmet snippets](https://code.visualstudio.com/docs/languages/html#_emmet-snippets)
* you often need to switch from editor to browser and back
  * use keyboard shortcuts to switch between apps
  * typically with `⌘-tab` (or `⌥-tab` or `⌃-tab` depending on your environment)
* also make sure to know the keyboard shortcut  
  for your browser to reload a page

  * typically `⌘-r` (or `⌃-r` on Windows...)
