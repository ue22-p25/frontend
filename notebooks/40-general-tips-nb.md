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
  title: coding tips
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# how to code: general tips

```{code-cell}
tools = require('../js/tools'); tools.init()
```

* first do not think on coding, but think about what do you want to achieve
* decompose the thing you are trying to achieve into smaller things  
  e.g. in the case of the spinning wheel, you need:
  * a button
  * circles
  * to change the color of a circle
  * to start/stop by pressing the button
  * and more ...
* try to achieve the smallest objectives first separately or independently
  * at this step the search engine can help :)
  * **BUT NEVER USE SOMETHING THAT YOU DO NOT UNDERSTAND**
  * **always** try to understand what you are using from others
  * **always** adapt the code you want to use from others
  * this goes for ChatGPT and/or copilot, of course !
* gather all technics acquired in previous steps and combine them
* commit often
* enjoy ;)
