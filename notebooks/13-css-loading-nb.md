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
  title: loading css
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# URLs and how to apply CSS

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## 3 ways to apply CSS

* located in a **separate CSS file** - via its own URL
* embedded in HTML within a `<style>` tag
* hard-attached to an element itself with `style=`

+++

## method 1 : a separate CSS

this is the preferred method

* write your CSS in a separate file, e.g. `mystyle.css`
* which, assuming it is in the same directory as your `hello.html`
* can be kind-of included in `hello.html`
* by inserting the following <link> line
* in the `<head>` part of your html

```{code-cell}
---
cell_style: center
slideshow:
  slide_type: ''
tags: [remove-input]
---
separate_html = `
<html>
  <head>
    <!-- this is the line that matters -->
    <link rel="stylesheet" href="hello.css">  
  </head>
  <body>
     Hello
  </body>
</html>
`

/* const */ fs = require('fs')
/* const */ separate_css = fs.readFileSync('hello.css', 'utf8')


tools.sample_from_strings({html: separate_html, css: separate_css})
```

+++ {"slideshow": {"slide_type": "slide"}}

````{admonition} self-closing tags
:class: warning

* notice the absence of a `</link>` above
* which may remind you of `<br>`
* such elements are called **void** or **empty** elements; they **do not require a closing tag**
* among others : `<br>`, `<hr>`, `<link>`, `<img>`, ...
````

+++

## URLs

````{admonition} a typical URL looks like this
:class: info

`https://hostname.io/the/path/to/content`
````

where
- `https://` is a indication of the **protocol** to use; it is very often `https://` indeed
  ````{admonition} what does the s stand for ?
  :class: info dropdown admonition-small

  the final `s` in `https` stands for **secure**; indeed `https` is mostly `http`, 
  but with 
  * an encryption layer (to avoid man-in-the-middle attacks), 
  * and also certificates to make sure that you really talk to whom you intend to
  ````
- `hostname.io` is a **hostname**; before the browser can actually send a packet to that host,
  it first needs to find **its IP address** - and for that purpose it asks the DNS service (Domain Name System)

- `/the/path/to/content` is a path relative to the web server root
  it may represent an actual path in the server's file system (for static pages)  
  but most often it is relative to virtual namespace, i.e. it is interpreted by the server as a way to identify what is requested; for example, `/book/52` could be a way to ask information about book number 52

+++

````{admonition} lots of variants
:class: tip dropdown admonition-smaller

there are many variants in the way to build a URL, and we'll touch on that during the course, but for example

- `mailto:someone@example.com` would use another protocol entirely - here it just opens a mail message
- `https://hostname.io:999/the/path/to/content` would mean to use an alternative port number 999
- `https://username:password@hostname.io/the/path/to/content` would specify an authentication method
- `https://hostname.io/the/path/to/content#some-section` would allow to point to the named anchor `some-section` in the page, i.e. a `<a name="some-section"> element, instead of the top of the page
````

+++ {"slideshow": {"slide_type": "slide"}, "tags": []}

### relative URLs

it is possible to omit some parts of the URL; 
and that's exactly what we've done when we wrote `href="hello.css"` in our `<head>` above

imagine if you have loaded a document as, say `https://hostname.io/the/path/to/content`  
then **from within that document**:

* `href="to.css"` is interpreted as `href="http://hostname.io/the/path/to.css"`
* `href="/to.css"` is interpreted as `href="http://hostname.io/to.css"`
* `href="/other/path/to.css"` is interpreted as `href="http://hostname.io/other/path/to.css"`
* `href="other/path/to.css"` is interpreted as `href="http://hostname.io/the/path/other/path/to.css"`

and the same goes with the <code>file:///</code> URL scheme

+++

## method 2 : inline in html

back to the topic of injecting CSS in the page

* you can also insert a `<style>` tag in your HTML
* and mention the CSS code there directly
* it is **less recommended** as it kind of ruins the  
  **separation** between **contents** and **presentation**

```{code-cell}
---
slideshow:
  slide_type: ''
tags: [remove-input]
---
embedded_html = `<div> CSS can be inlined right into the HTML
    as a &amp;lt;style&amp;gt; tag
</div>

<style>
div {
    color: red;
    font-size: x-large;
}
</style>
`

tools.sample_from_strings({html: embedded_html})
```

## method 3: hardwired with `style=`

* attach a `style=` attribute on a HTML tag
* this method is by far **the worst**
* and should be used in last resort

```{code-cell}
:tags: [remove-input]

embedded_html = `<div
style="background-color: red;
font-size: x-large;
line-height: 50px;
padding:30px;" >

If you attach styling to a HTML tag with a
<code>style=</code> attribute, it will
<b>take precedence</b> on
everything else
<br>
more on this later on

</div>`

tools.sample_from_strings({html: embedded_html})
```

## practice

* we recommend you use a local git repo all along  
  i.e. create a new folder and `git init`
* copy `hello.html` into `mycv.html`
* create a more realistic skeleton for a résumé
  * with 4 sections *Experience*, *Education*, *Skills* and *Languages*
  * **keep it simple** for now, nothing too elaborate
  * make sure all the text gets attached to adapted tags like `<div>` or `<li>`
  * and **not** directly under `<body>` - like it was done in `hello.html`
  * make sure to insert at least one `<a href=...>` hyperlink

+++

### practice (continued)

* create a CSS file `mycv.css`
  * with some settings that should apply to `mycv.html`
* add a `<link>` tag in the html `<head>` area
  * so the css is loaded by the html
* load `mycv.html` in a browser
  * change the CSS and reload the browser page
  * to see the effect of your changes

+++

## the browser cache

for performance reasons primarily :

* fetching a file may be slow in poor network conditions
* so, once a file has been loaded
  * it may be **cached inside** the browser
  * so that future references do not fetch it again

**beware of that** during development

* reloading the html file
* may **not reload** the css because it is cached

+++

### how to deal with it

a couple hints and workarounds

* reload with the `Shift` modifier pressed  
  either with a mouse-click (&#x21bb;),  
  or keyboard shortcut (⌘-r on e.g. chrome/mac)  
  double-check that with the browser you actually use

* devel tools have a *Sources* tab that let you check  
  the content of each individual loaded file

* often browsers have more advanced tools to manage cache  
  e.g. Chrome : `⠸` menu → *More Tools* → *Clear Browsing Data*
