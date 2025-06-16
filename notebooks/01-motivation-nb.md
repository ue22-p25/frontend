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
  title: motivation
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# web frontend pillars : HTML/CSS/JS

```{code-cell}
tools = require('../js/tools'); tools.init()
```

```{admonition} running locally ?
:class: admonition-small

the most comfortable way to read this content is on 
<https://ue12-p24-web.readthedocs.io>  
it is also possible to run the notebooks locally, even if it does require a more complex setup than the usual Python notebooks (the notebook here use a node.js kernel)  
anyway, if you do run this locally, make sure to always evaluate the initialization cells
```

+++

## why a course on web frontend pillars&nbsp;?

* with traditional languages like Python, C++, and Java  
  building a decent UI quickly becomes awkward

* but how much time do you spend on  
  facebook, twitter, what'sapp, … ?

* as of 202x, **everything** runs on the Web
* so this simply **cannot be ignored**

+++

## vocabulary

* web technologies are heavily **client-server** based
* **server**-side (think, **cloud**) is often called ***backend***  
* **client**-side (think, **browser**) is called ***frontend***

+++

for instance

* `facebook.com` hosts an enormous *backend* architecture
  * whole datacenters, huge amount of code
  * whose purpose is to serve network requests
* issued by traditional browsers (Chrome, Firefox, Edge, Safari, …)
  * and mobile apps running on phones and tablets
  * that are all *frontends*
  * in the sense that they face the end user

+++ {"slideshow": {"slide_type": "slide"}}

## scope

* for this course, we will restrict ourselves to the ***frontend*** side
* objective is to give you **some grip**
* on the **core** technologies supported in a browser  
  * namely **HTML**, **CSS** and **JavaScript**
* so that you can assess their enormous potential
* mostly ignoring the fast-moving over-layers  
  * like *e.g.* react, angular, ...  
  * way too numerous to list at this point

+++

## the root trio

* `HTML`: ***content***
  * everything that is visible on a web page has been created as an HTML fragment
* `CSS`: ***styling***
  * how the document gets rendered, suitable to customize visible aspect
* `JavaScript`: ***behaviour***
  * full-fledged programming language, suitable to customize, well, everything really

+++

## the "backend" course

this means that we will **not** address :

* backend technologies per se
  * like e.g. apache, nginx, django, REST apis, …
* nor the network protocols involved  
  * like http(s), websockets, and similar
* those will be touched on later this year in a separate course

+++ {"slideshow": {"slide_type": "slide"}}

## why are web technos so cool ?

+++

* so-called *GUI*-oriented tools (Graphical User Interfaces)
  * like .net, Java Swing, Qt, …
  * based on an anachronic and rigid widget-based mental model

***

* web allows for much cooler and more flexible interaction
  * any part of the screen can be part of the UI
* plus, thanks to a clear **separation** between **content** and **styling**
  * they allow designers to fruitfully collaborate with engineers
* as a bonus, super-portable with **zero installation**
  * across the whole range of **computers** and **mobile devices**

+++

## wider than just the browser

* keep in mind that web frontend techologies
  * go way beyond the browsers per se
* there are many options to build a **standalone** app (that runs **outside of the browser**)  
  * leveraging the same core technos (again, HTML, CSS and JavaScript)
  * as a native mobile app (IOS or Android)
  * and/or on traditional computers - **like e.g. vs-code**

+++

## even wider than just the frontend

* also be aware that JavaScript
  * that is primarily famous for powering frontends
  * is becoming more and more popular  as a traditional programming tool (see node.js)
  * so it can be, and actually is, more and more used for writing backends as well
  * and even for traditional computing

+++

## objectives

* make sure you are aware of the **enormous potential**
* outline some specific problems  
  esp. **asynchroneous** / non-sequential nature of user interaction and network activity
* start to build a **mental map** where you can place the current buzzwords
