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
short_title: course requirements
---

# run this course locally ?

```{code-cell}
:tags: [ remove-cell ]
import * as tools from "../js/tools.js"; await tools.init()
```

before 2026 we were using ijavascript as the JavaScript kernel for Jupyter, but
unfortunately it seems that it is not compatible with nodejs 22, and the repo
seems to be unmaintained;  
so we have swapped to the `deno` kernel, which is easier to install and apparently
more heavily maintained

so to setup your computer to read this course locally on your computer, and/or
to edit the notebooks source, refer to  
`.github/workflows/myst-to-pages.yml`  
that spells out the CI configuration that builds the static site on GitHub

+++

## build in devel mode

```bash
# to build the static site in watch mode
cd notebooks
npx myst start --execute
```
