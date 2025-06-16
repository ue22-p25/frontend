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
  title: 'practice : games'
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# practice : games

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## tic-tac-toe

write a tic-tac-toe game, something like this - there is a lot of room for improvement !

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/45-tic-tac-toe/tic-tac-toe",
                       {sources_show: false, separate_height: '400px', separate_width: '400px'})
```

## minesweeper

write a minesweeper game; again you can do better than this :)

```{code-cell}
:tags: [remove-input]

tools.sample_from_stem("../samples/45-minesweeper/minesweeper2",
                       {sources_show: false, separate_height: '700px', separate_width: '600px'})
```
