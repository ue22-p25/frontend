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
  title: 'practice : networking apps'
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# practice : networking apps

```{code-cell}
tools = require('../js/tools'); tools.init()
```

the common objective here is: how to talk directly to an (http) API from JS

+++

````{admonition} xkcd
:class: seealso

build a small app that will let us browse the collection of drawings by xkcd - a lot like <https://xkcd.com> but with just the navigation buttons and the images; clone the repo below, and follow the instructions  
<https://github.com/ue22-p24/web-xkcd.git>

the result would look like this
````

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/49-xkcd/xkcd", 
                       {sources_show: false, separate_height: '750px', separate_width: '820px'})
```

````{admonition} chatbot
:class: seealso

build your own chatbox using a mistral-7B LLM (other models available too)  
clone the repo below, and follow the instructions  
<https://github.com/ue22-p24/web-chatbot.git>
````

+++

````{admonition} pixels-war
:class: seealso

build a small app that will let us paint a commonly shared image one pixel at a time  
clone the repo below, and follow the instructions  
<https://github.com/ue22-p24/web-pixels-war>
````
