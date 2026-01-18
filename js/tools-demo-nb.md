---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.18.1
kernelspec:
  name: deno
  display_name: Deno
  language: typescript
---

# displaying code samples

## init() with deno-jupyter

the regular way to import this - for regular book notebooks is as follows  
tools.init will evaluate all cells, and inject the global css style

```js
import * as tools from "../js/tools.js"
await tools.init()
```

```{code-cell} typescript
// the code to force a reload - using let because we keep on doing that
let tools = await import(`../js/tools.js?ts=${Date.now()}`)
await tools.init()
```

just checking the notebook gets evaluated properly

```{code-cell} typescript
/* customized look for output cells */
20 * 300
```

---

## sample_from_strings()

the signature is

```
sample_from_strings(
  // code(s) - html/css/js
    {html: 'le html', ...},
  // and options
    { ... }
)
```

by default, the `id` option is computed from `html` - be wary to specify different `id`s if you display the same html code several times

---

### setting global options

```{code-cell} typescript
tools.set_options({
    debug: true,
})

undefined
```

---

### select which source to display (html, css, js)

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
```

```{code-cell} typescript
// by default, all 3 even if void

await tools.sample_from_strings({'html': 'HELLO'}, {id: 'hello'})
```

```{code-cell} typescript
// use the options to remove one of the 3
// btw here the html is off so nothing shows up at all

await tools.sample_from_strings({html: 'HELLO'}, {id: 'empty', html_show: false})
```

---

### remove the cell input

```{code-cell} typescript
:tags: [remove-input]
await tools.sample_from_strings( {
    html: `use
    <br>
    &lt;code&gt;:tags: [remove-input]&lt;/code&gt;
    <br>
    to hide the input`
    },
    {id: 'remove-input'}
)
```

---

### start with another view

```{code-cell} typescript
// we can start on something else than html
await tools.sample_from_strings(
    {html: 'HELLO', js: 'console.log("Hi")'},
// one could also say css_show: false to hide the css tab,
// but it's inferred here
    {id: 'id3', start_with: 'js'})
```

---

### high left (1)

```{code-cell} typescript
await tools.sample_from_strings(
    {html: 'HELLO\n'.repeat(20)},
    {id: 'high-input'})
```

---

### high left with height (11)

```{code-cell} typescript
await tools.sample_from_strings(
    {html: 'HELLO\n'.repeat(20)},
    {id: 'high-input-height', height: '15cap'})
```

---

### high right (2)

```{code-cell} typescript
await tools.sample_from_strings(
    {html: '<p>HELLO</p>'.repeat(20)},
    {id: 'high-output', width: '69%'}
)
```

---

### specifying sizes

```{code-cell} typescript
// can set: width - min_width - height - min_height - font_size
// or     : output_min_width
await tools.sample_from_strings(
    {html: 'HELLO'},
    {id: 'font_size', 'font_size': '30px'})
```

---

## from files

### without the separate button

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
// in general, no need to worry about sizes, provided that the sources
// take a reasonable space
await tools.sample_from_stem(
    "../samples/30-js-intro-01-on-off",
    {id: 'separate_off', start_with: 'css', separate_show: false})
```

---

### with the separate button

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
// here the autosizing mode would pick a very high window
// because the JS script is very large
// so we keep this under control
await tools.sample_from_stem(
    "../samples/30-js-intro-02-svgcircles",
    {id: 'separate_on',
     separate_label: 'In new window', separate_show: true,
     start_with: 'js',
     height: '22em'})
```

---

## no code, just the result - with separate

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
// the default is separate_show = true

await tools.sample_from_stem(
    "../samples/44-spinning-wheel/spinning-wheel",
    {id: 'spinning-wheel',
     sources_show: false,
//     height: '300px',  // not really needed
     separate_label: 'In new window',
})
```

---

## no code, just the result - truly basic, no separate

**beware** because we re-use the same stem twice, we need to provide our own id

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
// here because we use the same code exactly
// we need to provide a unique id
// otherwise we mess with the previous sample

await tools.sample_from_stem(
    "../samples/44-spinning-wheel/spinning-wheel",
    {id: 'duplicate', height: '20em', sources_show: false, separate_show: false})
```

---

## the calculator

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
await tools.sample_from_stem(
    "../samples/46-calculator",
    {sources_show: false, separate_show: false, height: '500px'})
```

---

## escaping

```{code-cell} typescript
// clean up and reload
tools = await import(`../js/tools.js?ts=${Date.now()}`)
undefined
```

```{code-cell} typescript
// NOT WORKING

let html_with_tags = `<b>NOT WORKING</b>
<p> a paragraph with a &lt;tag&gt; tag inside </p>

there is a need to escape even more than that, see next attempt
`

await tools.sample_from_strings(
    {html: html_with_tags},
    {css_show: false, js_show: false}
)
```

```{code-cell} typescript
:tags: [raises-exception]

html_with_tags = `<b> YES ! - need to double escape like this:</b>
<p> a paragraph with a &amp;lt;tag&amp;gt; tag inside </p>
`

await tools.sample_from_strings(
    {html: html_with_tags},
    {css_show: false, js_show: false, id: 'escaped'}
)
```

---

## setting options globally

this function allows to set default options globally

```{code-cell} typescript
tools.set_options({
    font_size: '6px',
    min_width: '200px',
    min_height: '0px',
    height: '400px',
})
```

and then the defaults will be used in subsequent calls

```{code-cell} typescript
await tools.sample_from_strings(
    {html: '<p> this sample uses the global options set previously </p>'},
    {id: 'global-options-sample'})
```
