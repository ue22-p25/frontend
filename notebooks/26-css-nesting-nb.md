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
nbhosting:
  title: CSS nesting
---

Licence CC BY-NC-ND, Thierry Parmentelat

+++

# CSS nesting

a very useful tool to keep - at least to try and keep - your CSS code from ending up as a bowl of  spaguettis

```{code-cell}
tools = require('../js/tools'); tools.init()
```

## why

* mostly CSS nesting is about writing less, and more structured, code

+++

## example: without nesting

let's consider this very small code

```{code-cell}
:tags: [remove-input]

html = `
<div class="first">
<p class="one"> a first div element</p>
<p class="two"> with two paragraphs</p>
</div>

<div class="second">
<p> a second div element with,</p>
<p> again, two paragraphs</p>
</div>
`

css = `
div {
    padding: 10px 20px;
    margin: 20px;
}

div.first {
    background-color: aliceblue;
}
div.first p.one {
    color: black;
}
div.first p.one:hover {
    color: green;
    font-size: larger;
}
div.first>p.two {
    color: red;
}

div.second {
    background-color: bisque;
}
div.second>p:first-child {
    color: white;
}
div.second>*:nth-child(2) {
    color: navy;
}
`

tools.sample_from_strings({html, css}, {id: 'without-nesting', separate_show: false, start_with: 'html'})
```

## example with nesting

with nesting, we can simply keep the rules in the same logical structure as the HTML tree  
that is to say, we could rewrite the above like so

```{code-cell}
:tags: [remove-input]

html = `
<div class="first">
<p class="one"> a first div element</p>
<p class="two"> with two paragraphs</p>
</div>

<div class="second">
<p> a second div element with,</p>
<p> again, two paragraphs</p>
</div>
`

css = `
div {
    padding: 10px 20px;
    margin: 20px;
}

div.first {
    background-color: aliceblue;

    & p.one {
        color: black;

        &:hover {
            color: green;
            font-size: larger;
        }
    }
    & >p.two {
        color: red;
    }
}

div.second {
    background-color: bisque;

    & >p:first-child {
        color: white;
    }
    & >*:nth-child(2) {
        color: navy;
    }
}
`

tools.sample_from_strings({html, css}, {id: 'with_nesting', separate_show: false, start_with: 'css', height: '35em'})
```

## how does it work ?

the 2 examples are written so as to be exactly equivalent

as you can see:

- you can rather naturally group all the rules that apply to a given subtree
- and avoid the repetition of that path

so for example on line 9 we have `& p.one {`  
since this is **nested** inside a rule (line 6) with selector `div.first`  
the corresponding properties (`color: black`) will apply to selector  
`div.first p.one`

and as you can see on line 12, this can be nested as deeply as you need..

+++

## why is it cool ?

as mentioned in the intro, this feature is **very useful** as it helps keep some sense in the flow of css, which otherwise quickly becomes a very challenging task
