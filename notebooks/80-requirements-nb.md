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
  title: course requirements
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# run this course locally ?

```{code-cell}
tools = require('../js/tools'); tools.init()
```

as usual you can enjoy this course with no local installation, and use the pure HTML version here  
<https://ue22-p24-web.readthedocs.io/>

if however you plan on reading this course locally on your computer, there are a few specific requirements that need to be fulfilled

+++ {"slideshow": {"slide_type": "slide"}}

## foreword

* **PREREQUISITES**  
  the instructions below assume you have installed the common stack used for the
  S1 courses, namely `miniconda` + `bash` + `git` + `vs-code`
* **WARNING**  
  note that on Windows, the installation instructions below involve the
  installation of some Visual-Studio components, which is a little intrusive and
  take a looonng time...
* do all the installs as **a regular user**  
  the commands below should be as far as possible run as a regular user  
  if however, depending on your setup, they fail to complete because of a lack of permissions, you may need to invoke them as super-user  
  by prepending them `sudo`; like in
  ```
  sudo npm install -g ijavascript
  ```
  instead of just
  ```
  npm install -g ijavascript
  ```

+++ {"slideshow": {"slide_type": "slide"}}

## create a virtualenv

in one go: will install jointly Python and nodejs !

```
conda create -n web python=3.11 nodejs=20
conda activate web
```

+++ {"slideshow": {"slide_type": "slide"}}

## install Python requirements

```
# like always
pip install -r requirements.txt
```

+++

## install the JavaScript kernel for Jupyter

* we use a JavaScript kernel - of course
* this requires `node` and `npm` (that we have installed with conda)
* and can be installed with

```
npm install -g ijavascript
ijsinstall
```

+++ {"slideshow": {"slide_type": "slide"}}

## read the course

```
# the usual
jupyter lab
```
