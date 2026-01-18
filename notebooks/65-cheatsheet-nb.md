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
---

(label-cheatsheet)=

# cheatsheet

{download}`click here to open our cheatsheet <_static/cheatsheet.html>`

---
## ... or

```{code-cell}
:tags: [remove-cell]
// import * as tools from "../js/tools.js"; await tools.init()
tools = require('../js/tools'); tools.init()
```

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem(
  "_static/cheatsheet",
  {sources_show: false, separate_width: "1000px", separate_height: "800px"},)
```
