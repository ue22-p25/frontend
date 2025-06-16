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
  title: web frontend ecosystem
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# web ecosystem

```{code-cell}
tools = require('../js/tools'); tools.init()
```

+++ {"tags": ["gridwidth-1-2"]}

## backend *vs* frontend

* Web server :  
  * operated by the application provider (i.e. in *the cloud*, i.e. a datacenter)
  * runs **backend** code
* Web browser :   
  * runs on your laptop
  * runs **frontend** code (even though that code is fetched at the backend)

```{image} media/client-server.svg
:width: 600px
:align: center
```

+++

## evolution speed

* all this started in a very awkward way
  * early versions were always quick and dirty
  * for example, the first JavaScript version [was written in 10 days](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/)
* evolving **very quickly**, especially
  * in the tooling for integrating the pieces together  
    (e.g. JS loaders and transpilers and bundlers…)

* many many over-layers that improve / mitigate some flaws
  * like ***less*** or ***sass*** above CSS,  
  * ***TypeScript*** or ***CoffeeScript*** above JavaScript, …
  * frameworks like vue, react, angular
  * tools for mobile depl. [expo](https://expo.io),
    [svelte](https://svelte.dev), [ionic](https://ionicframework.com) …

+++

##  focus on HTML - CSS - JavaScript

* again, we will only focus on **grassroots level**
  * that will likely remain valid for a while - even if they do evolve too
* versions for our focus
  * HTML-5, CSS-3, ECMAScript-6

+++

## you may have heard of

* typical **backend** technologies
  * PHP, django or flask (Python), Ruby/on rails, SQL databases
  * apache, nginx, load balancing
* typical **frontend** technologies
  * **HTML, CSS, JavaScript**
  * react, angular, vue, ...
* in between
  * TCP/IP : low-level communication protocol of the Internet
  * HTTP : HyperText Transfer Protocol
  * WebSocket : full-duplex communication channel  
    over a single TCP connection

you can see our focus is
a small fraction of the whole spectrum
