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
  title: vscode extensions
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# vscode extensions

based on my experience and on this youtube video
https://www.youtube.com/watch?v=Z5RkLrSDlFA

in an opinionated order of usefulness

```{code-cell}
tools = require('../js/tools'); tools.init()
```

##  live server

see your code changes as soon as you save

* to activate, use `⌘L ⌘O` control-click in an html file and select **Open with Live Server**
* will open the file in chrome, with no need to reload

+++

## auto rename

when you rename a tag, it will rename the other (closing or opening) side

+++

## html tag wrapper

say you want to take a fragment and insert a <code>&lt;div&gt;</code> around that, just select and type `⌃I` (Control-i)

+++

## emmet

not technically an extension, a builtin tool to enter html fragments

check out the video, it's kind of like you type a css selector and the tool creates the html tag; cool really

I had never used that because I did not even know about it, but that sounds awesome for productivity

+++

## JS-CSS-HTML Formatting

control-click in the document to find tools that will format it nicely

+++

## HTML CSS support

* can't remember exactly what that brings precisely, but it has 5M downloads and I have been using it for a long time
* my environment has completion for all property names and javascript native methods, I believe all this comes from that extension, although I cannot be 100% positive

+++

## open in browser

you can control-click a file in the browser left pane, this gives you the option to open that static file in your default browser - and others as well actually

+++

## auto close tag

when you type, say <code>&lt;div&gt;</code>, it will automatically add the closing tag;
I feel like this was working for me already before I installed this extension, so it's my feeling that it is not (no longer ?) needed
