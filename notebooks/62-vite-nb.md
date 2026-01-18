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

# vite

```{code-cell}
:tags: [remove-cell]
import * as tools from "../js/tools.js"; await tools.init()
```

---

(label-vite)=

## what is vite ?

are you **tired of reloading** the browser page after each and every single change in your sources&nbsp;?  
`vite` is what you're looking for ...

with `vite`:

- you typically have your two windows side by side: an editor - say, vscode - and your browser
- then you just need to save your input - be it `.html`, `.css` or `.js`
- and the browser **automatically picks up** on your changes and re-renders the current code

so, no more back and forth switching between applications; is that cool or what ?

````{admonition} autosave
:class: dropdown tip

again, we recommend you to enable autosave in your editor of choice, so that you don't even need to think about saving your changes; just edit, and the rest is automatic

under vs-code, you can enable autosave through the `File` -> `Auto Save` menu entry

```{image} media/vs-code-autosave.png
:alt: vite setup
:width: 380px
:align: center
```
````

---

## how it works

### no `file:///` URL

for that to work, you can **no longer** open in your browser a file URL like `file:///Users/jeanmineur/the-webc-course/cv.html`

### how to open a file then ?

the way it's going to work with vite is:

- you typically launch it in **the same folder** as your inputs,  
  say in `/Users/jeanmineur/cours-info/frontend/`
- `vite` runs as a local web server  
  and on startup will display the **port number** it has bound to, typically `5173`
- so in your browser:
  - instead of opening the `file:///Users/jeanmineur/cours-info/frontend/cv.html`
  - you will instead open `http://localhost:5173/cv.html`

and that's it !  
from then on, any change done in `cv.html` will automatically refresh in the browser

```{admonition} third party cookies and CORS
:class: dropdown tip

in addition, be aware that, with respect to recent changes in CORS (Cross Origin Resource Sharing)
and "third-party cookies" policies,
it is almost always a **good idea to use a local web server** in development (as opposed to using `file:///` URLs),
regardless of the extra convenience brought by vite
```

---

(label-install-nodejs)=
## basic install

we're going to use vite through a tool named `npx`; this tool will let us run vite without the need for any prior installation

however, we still need .. to install `npx` of course; fortunately it all boil down to installing `node.js`  
just like a Python install comes with `pip`, `node` will come with `npm` and `npx`

---

### installing `node` and `npx`


````{admonition} option 1: you already have a conda env
:class: dropdown seealso

super easy with `conda`  
make sure to first activate the right conda virtual env if you have any

```{code} bash
:linenos:
:emphasize-lines: 2
# this is true for all the commands in this section
conda activate my-web-conda
```

```{code} bash
:linenos:
:emphasize-lines: 2
# and then
conda install conda-forge::nodejs

# or if you want a specific version
# conda install conda-forge::nodejs=24
```

````

````{admonition} option 2: you do not yet have a conda env:
:class: dropdown seealso

in this case you can install node in the conda env in one go, i.e. right when you create it:


```{code} bash
:linenos:
:emphasize-lines: 1
conda create -n my-web-conda python conda-forge::nodejs

# or if you want specific versions:
# conda create -n my-web-conda python=3.13 conda-forge::nodejs=24
```

```{code} bash
:linenos:
:emphasize-lines: 2
# after which you must activate it, of course, as always
conda activate my-web-conda
```
````

---

````{admonition} checking for node and npm
:class: dropdown important

regardless of the option you choose, remember to activate your conda env

```{code} bash
:linenos:
:emphasize-lines: 1, 3-4
conda activate my-web-conda

node --version
npx --version
```
````

---

````{admonition} global install ?
:class: dropdown warning

note that you can also do a traditional install of `vite` like this:
```{code} bash
npm install -g vite
```
in which case you can then directly run `vite` and no longer need to invoke `npx vite`

more details on npx can be found e.g. here:  
<https://dev.to/orlikova/understanding-npx-1m4>
````

---

## how to use it ?

with most of the activities / exercises contained in this course, you will just need to run (in the right folder of course)

```bash
npx vite
```

which as part of its display will show a line like

```text
  ➜  Local:   http://localhost:5173/
```

and now, you know which port number to use; read on though...

---

### caveats

````{admonition} make sure **to mention a filename**
:class: warning

i.e. if you just point your browser at  
`http://localhost:5173/`  
you **won't get an answer**, unless you have a file named `index.html` in that folder

so **you may need to use instead** e.g. `http://localhost:5173/cv.html`  
pointing your browser at the root path will **not** display a list of available files in the folder - it returns 404 instead
````

````{admonition} open the URL from the terminal
:class: tip

most terminal applications will let you click on that URL directly from the terminal display, using a modifier key like `Cmd` or `Ctrl` or `Alt`, depending on your OS and terminal application; under "Git Bash" on Windows for instance, just `Ctrl+Click` will do

however, this will work only if your file is named `index.html`
````

````{admonition} your terminal will hang
:class: warning

also, as usual, beware that **the terminal**  where you start `vite` **will become unusable**  
so if there's anything else you need a terminal for, just create another one
````

---

## conclusion

there are many additional features in `vite`, like `vite build`, but that's
totally optional

if you're serious about web development, using `vite` in development mode is a
lifechanging experience, totally worth the small amount of time required to get
used to it ;)
