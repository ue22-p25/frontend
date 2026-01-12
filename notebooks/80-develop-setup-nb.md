---
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
short_title: course requirements
---

# run this course locally ?

```{code-cell}
:tags: [ remove-cell ]
tools = require('../js/tools'); tools.init()
```

as usual you can enjoy this course with no local installation, and use the pure
HTML version here  
<https://frontend.info-mines.paris/>

if however you plan on reading this course locally on your computer, or you need
to edit the notebooks source, there are a few specific requirements that need to
be fulfilled.

+++

## foreword

```{admonition} WARNING for Windows users
:class: warning

note that on Windows, last time I checked the installation instructions below 
involve the installation of some Visual-Studio components, which is a little intrusive and
take a looonng time...
```

+++

## create a virtualenv with Python and nodejs

in one go: will install jointly Python and nodejs !

```bash
# you can pick another name for the env if you want of course
# warning: as of 2026-02 it still seems that nodejs 20 is required
# more about that in https://github.com/n-riesco/ijavascript/issues/297

conda create -n ue22-p25-frontend python=3.13 conda-forge::nodejs=20

# and of course activate it
conda activate ue22-p25-frontend
```

+++

## install Jupyter

```bash
# like always
# this is for Jupyter and related tools
# and is needed for the JS kernel too,
# and for MyST too as a consequence

pip install -r requirements.txt
```

+++

## install the JavaScript kernel for Jupyter and/or MyST

These notebooks use a JavaScript kernel - of course...

```bash
npm install -g ijavascript
ijsinstall
```

+++

## install MyST and build html site

```bash
# install MyST
npm install mystmd

# to build the static site in watch mode
cd notebooks; npx myst start --execute
```
