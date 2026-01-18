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
short_title: CSS nesting
---

# CSS nesting

```{code-cell}
:tags: [remove-cell]
tools = require('../js/tools'); tools.init()
```

## purpose

* mostly CSS nesting is about writing less, and more structured, code
* a very useful tool to keep your CSS code from ending up as a bowl of spaghettis  
  (or at leat try to)

---

## example: without nesting

let's consider this very small code

```{code-cell}
:tags: [remove-input]

let flat_html = `
<div class="first">
<p class="one"> a first div element</p>
<p class="two"> with two paragraphs</p>
</div>

<div class="second">
<p> a second div element with,</p>
<p> again, two paragraphs</p>
</div>
`

let flat_css = `
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

/*await*/ tools.sample_from_strings({html: flat_html, css: flat_css}, {
    id: 'without-nesting', separate_show: false, start_with: 'css'})
```

---

## same with nesting

with nesting, we can simply keep the rules in the same logical structure as the HTML tree  
that is to say, we could rewrite the above like so

```{code-cell}
:tags: [remove-input]

let nested_html = `
<div class="first">
<p class="one"> a first div element</p>
<p class="two"> with two paragraphs</p>
</div>

<div class="second">
<p> a second div element with,</p>
<p> again, two paragraphs</p>
</div>
`

let nested_css = `
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

/*await*/ tools.sample_from_strings({html: nested_html, css: nested_css}, {
    id: 'with_nesting', separate_show: false, start_with: 'css', height: '35em'})
```

---

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

---

## what with the `&` ?

the `&` character is a placeholder for the **full selector** of the parent rule  
so it's helpful if you need to distinguish between ambiguous cases

consider for example the following snippet:
```css
.card {
  &.active { ... } /* means .card.active */
  & .highlight { ... } /* means .card .highlight */
  .title { ... }  /* means .card .title */
}
```

so as you can see here, the `&` is sometimes optional, however it's often
clearer to use it explicitly so as to avoid confusion

---

## why is it cool ?

as mentioned in the intro, this feature is **very useful** as it helps keep some
sense in the flow of css, which otherwise quickly becomes a very challenging
task, as the css code grows in size and complexity (that is to say, very
quickly..)
