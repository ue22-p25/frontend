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

(label-livepreview)=

# vscode livepreview

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## vscode's livepreview

instead of switching constantly between vscode and your browser, you can use vs-code's livepreview extension

to install it, search for `live preview` in vscode's extension pane; it's by MicroSoft and has about 8M downloads

with that extension enabled, the workflow is **much faster**, as you can see here:

```{image} media/vs-code-livepreview.gif
:align: center
```

+++

## caveats

when ran this way, the devel tools will show your document but **within the vscode context**  
this is described in greater length [in this SO answer](https://stackoverflow.com/questions/73406192/vs-codes-live-preview-extension-element-section-doesnt-seems-to-work-properly), but in a nutshell this is because vscode is a web app in itself, and so you're going to inspect the full vscode elements, of which your document is just a fragment  

and it can make navigating through the DOM a little confusing  
if that's an issue [you can also use `vite`](label-vite)=

+++

## conclusion

you can very easily speed up your development workflow with livepreview !
