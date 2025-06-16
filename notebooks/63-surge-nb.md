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

(label-surge)=

# surge

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## what is surge ?

surge lets you deploy your static website in 6 keystrokes; that's how their pitch has it, and it's mostly true !

in a nutshell, surge is a CDN (Content Delivery Network) that offers free static web hosting

take a look at <https://surge.sh> for more details

+++

## requirements: `npx`

just like with `vite`, [you can run `surge` through `npx` - see here for details](label-install-nodejs)

+++

## how to use it ?

### upload your folder

go in the right folder, and type

```bash
npx surge
```

will ask you a few questions

- you will have to enter a login / password; this will create your account when using surge for the first time
- you will have to enter a domain name:
  if you answer `jeanmineur-resume`, then `https://jeanmineur-resume.surge.sh` becomes available in a matter of seconds, populated with the contents of the current folder

+++

### how to update it ?

see here <https://stackoverflow.com/questions/49243509/how-to-update-your-surge-sh-project>

+++

### more commands

```bash
npx surge --help
```

+++

## caveats: `index.html`

by default (i.e. if you use a URL with a hostname but no path) the website will search for a file named `index.html`  
if you had written, say, `cv.html`, then pointing at the domain will result in a 404 - not ideal...

you can easily fix it by doing

````{admonition} all platforms
you can rename the main file, say `cv.html`, into `index.html`  
depending on whether the file is in your git repo or not, you just do
```bash
# if the file is under git
git mv cv.html index.html

# otherwise
mv cv.html index.html
```
````

````{admonition} MacOS / linux only

```bash
ln -s cv.html index.html
```

this will create what is called a *symbolic link*, in plain words an alias, so that `index.html` is seen with the same contents as `cv.html`
````

+++

## conclusion

this can be a nice alternative to uploading your site on Github Pages
