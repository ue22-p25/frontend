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
  title: vite
---

+++ {"slideshow": {"slide_type": "slide"}}

Licence CC BY-NC-ND, Thierry Parmentelat

+++

(label-vite)=

# vite

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## what is vite ?

are you tired of reloading the browser page after each and every single change in your sources ?

`vite` is what you're looking for ...

with `vite`, you typically have your two windows side by side: an editor - say, vscode - and your browser  
and you just need to save your input - be it .html, .css or .js - and the browser automatically picks up on your changes and re-renders the current code  
is that cool or what ?

+++

## a local web server

### no `file:///` URL 

for that to work, you can no longer open in your broswer a file URL like `file:///Users/jeanmineur/the-webc-course/cv.html`  

### how to open a file then ?

the way it's going to work with vite is:

- `vite` runs as a local web server
- you typically launch it in the same folder as your inputs, say
  `/Users/jeanmineur/the-web-course/`
- and upon startup the `vite` process will display the **port number** that the vite server has bound to, say `5173`
- so in your browser:
  - instead of opening the `file:///Users/jeanmineur/the-webc-course/cv.html`
  - you will instead open `http://localhost:5173/cv.html`

and that's it  
from then on, any change done in `cv.html` will automatically refresh in the browser  

```{admonition} third party cookies
:class: dropdown tip

in addition, be aware that, with respect to recent changes in the "third-party cookies" policies, it is almost always a **good idea to use a local web server** in development, regardless of the comfort brought by vite
```

+++

(label-install-nodejs)=
## basic install

we're going to use vite through a tool named `npx`; this tool will let us run vite without the need for any prior installation

however, we still need .. to install `npx` of course; fortunately it all boil down to installing `node.js`  
just like a Python install comes with `pip`, `node` will come with `npm` and `npx`

+++

### installing `node` and `npx` 


````{admonition} option 1: you already have a conda env
:class: dropdown seealso

super easy with `conda`  
make sure to first activate the right conda virtual env if you have any

```bash
# this is true for all the commands in this section
conda activate my-web-conda
```

```bash
# and then
conda install -c conda-forge nodejs
```
````

+++

````{admonition} option 2: you do not yet have a conda env:
:class: dropdown seealso

in this case you can install node **directly** in the conda env when you create it


```bash
conda create -n my-web-conda python=3.13 nodejs=22
```

```bash
# and then
conda install -c conda-forge nodejs

# after which you must activate, as always
conda activate my-web-conda
```
````

+++

````{admonition} checking for node and npm
:class: dropdown important

regardless of the option you choose, remember to activate your conda env

```bash
conda activate my-web-conda
node --version
npx --version
```
````

+++

````{admonition} global install ?
:class: dropdown warning

note that you can also do a traditional install of `vite` like this:
```bash
npm install -g vite
```
in which case you can then directly run `vite` and no longer need to invoke `npx vite`

more details on npx can be found e.g. here: <https://dev.to/orlikova/understanding-npx-1m4>
````

+++

## how to use it ?

with most of the activities / exercises contained in this course, you will just need to run (in the right folder of course)

```bash
npx vite
```

which as part of its display will show a line like

```text
  ➜  Local:   http://localhost:5173/
```

and now, you know which port number to use

+++

### caveats

````{admonition} make sure **to mention a filename**
:class: warning

i.e. if you just point your browser at  
`http://localhost:5173/`  
you **won't get an answer**

so **you need to say e.g. `http://localhost:5173/cv.html`**  
this is because the web server does not provide indexing (it does list the content of the folder)
````

````{admonition} your terminal will hang
:class: warning

also, as usual, **that terminal will become unusable**  
so if there's anything else you need a terminal for, just create another one
````

+++

## conclusion

there are additional features in `vite` in terms of `vite build`, but that's totally optional

if you're serious about web development, using `vite` in development mode is a lifechanging experience  
totally worth the small amount of time required to get used to it ;)
