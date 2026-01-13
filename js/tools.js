// tools.js exports
// init()
// sample_from_strings({html: code, css:code, js:code}, options)
// sample_from_stem(stem, options)

// support for several runtimes : Jupyter + Jupyter book
//
// in the latter, a lot is missing as compared to the jupyter classic env:
// * Jupyter global is not available, and would not make much sense
// * require() is not available either, need to fetch from cdnjs
// * codemirror is not available from the server and must be cdn-fetched as well

"use strict"

const { sep } = require('path')
const { text } = require('stream/consumers')


const fs = require('fs')
const { start } = require('repl')
function render(template_name, context) {
  // find a template in the same folder as this file
  // and replace  ${key} by context[key]
  const path = require('path')
  const fullname = path.join(__dirname, template_name)
  let template = fs.readFileSync(fullname, 'utf-8')
  return template.replace(/\$\{(\w+)\}/g, (_, k) => {
    if (!(k in context)) {
      console.error(`Missing template variable: ${k}`);
    }
    return context[k];
  });
}

function hash(word) {
  const crypto = require('crypto')
  const sha1 = crypto.createHash('sha1')
  sha1.update(word)
  return `id-${sha1.digest('hex')}`
}

// helper to compute default height
function number_lines(code_s) {
  let max = 0
  for (let code of Object.values(code_s)) {
    if (code)
      max = Math.max(max, code.split(/\r\n|\r|\n/).length)
  }
  return max
}

// longer line in one code
function max_line_width(text) {
  if ( ! text) return 0
  let max = 0
  for (let line of text.split(/\r\n|\r|\n/))
    max = Math.max(max, line.length)
  return max
}
// longer line in an array of code
function max_line_width_s(code_s) {
  let max = 0
  for (let code of Object.values(code_s))
    max = Math.max(max, max_line_width(code))
  return max
}

function read_style(path) {
  const css = fs.readFileSync(path, 'utf-8')
  return `<style>${css}</style>`
}

// compute a fraction of a css length
// that may be 200px or 20em or 50%
function csslength_fraction(length, ratio) {
  try {
    let regexp = /([0-9.]+)([a-z][a-z]|%)/
    let match = regexp.exec(length)
    let [total, count, unit] = match
    let rcount = parseFloat(count) * ratio
    return `${rcount}${unit}`
  } catch(err) {
    console.log("csslength_fraction : not a 2-chars or % unit")
  }
}

function sample_from_stem(stem, options) {
  options = options || {}
  if (! ('id' in options))
    options.id = `x${hash(stem)}`

  const fs = require('fs')

	let fullname_html = `${stem}.html`
	let fullname_css  = `${stem}.css`
	let fullname_js   = `${stem}.js`

  let html, css, js
	try {html = fs.readFileSync(fullname_html, 'utf8')} catch {}
	try {css = fs.readFileSync(fullname_css, 'utf8')} catch {}
	try {js = fs.readFileSync(fullname_js, 'utf8')} catch {}

  if ( ! html && ! css && !js)
    return $$.html(`<div>no code found from stem
                      <span style='color:red;'>"${stem}"</span></div>`)
  return sample_from_strings({html:html, css: css, js: js}, options)
}

let default_options = {
  font_size: "12px",
  width: "400px",
  height: "300px",
  // these ones are maybe less useful...
  min_height: undefined,
  min_width: undefined,
  output_min_width: "300px",
}

function set_options(user_options) {
  default_options = {...default_options, ...user_options}
}

function sample_from_strings(code, options) {
  options = options || {}
  let {html, css, js} = code
  // the default for showing pieces is, are they present at all
  let html_show = (options.html_show !== undefined) ? options.html_show : (html !== undefined)
  let css_show = (options.css_show !== undefined) ? options.css_show : (css !== undefined)
  let js_show = (options.js_show !== undefined) ? options.js_show : (js !== undefined)
  html = html || "<!-- empty -->"
  css = css || "/* empty */"
  js = js || "// empty"
  options = options || {}
  let sources_show = (options.sources_show !== undefined) ? options.sources_show : true
  let separate_show = (options.separate_show !== undefined) ? options.separate_show : true
  let separate_width = options.separate_width || "400px"
  let separate_height = options.separate_height || "400px"
  let separate_label = options.separate_label || "Open in new window"
  let update_label = options.update_label || "Update →"
  let output_show = (options.output_show !== undefined) ? options.output_show : true
  let update_show = true
  if (! output_show) {
    separate_show = false
    update_show = false
  }
  // either html or css or js
  let start_with = options.start_with || "html"
  // fallback if not in allowed range
  let formats = []
  if (html_show) formats.push('html')
  if (css_show) formats.push('css')
  if (js_show) formats.push('js')
  if (formats.indexOf(start_with) < 0)
    start_with = formats[0]

  // default height:
  let code_height = code
  // setting height: 'js' means use the height of the js code only
  if (['html', 'css', 'js'].includes(options.height)) {
    code_height = [code[options.height]]
    delete options.height
  }
  // header is approx. 4 lignes
  const default_height = (sources_show ? `${number_lines(code_height)+4}ch` : default_options.height)
  let height = options.height || default_height

  // font_size is now an option
  const default_font_size = default_options.font_size
  let font_size = options.font_size || default_font_size

  // default width
  // compute from content, but cap to - arbitrarily - 55 chars
  const computed_width = Math.min(max_line_width_s(code), 55)
  // here again we need more space for the decoration
  const default_width = (sources_show ? `${computed_width+8}ch` : default_options.width)
  let width = options.width || default_width
  let min_width = options.min_width || default_options.min_width || csslength_fraction(width, 0.5)
  let min_height = options.min_height || default_options.min_height || csslength_fraction(height, 0.5)

  const output_min_width = options.output_min_width || "300px"

  let id = options.id || hash(html)

	let textareas = ''
  if (html_show) textareas += `<textarea id="html_${id}">${html}</textarea>`
  if (css_show) textareas += `<textarea id="css_${id}">${css}</textarea>`
  if (js_show) textareas += `<textarea id="js_${id}">${js}</textarea>`


	let width_style = output_show ? `width: ${width}; min-width: ${min_width};` : ``
	let height_style = `height: ${height}; min-height: ${min_height};`
  let font_size_style = `font-size: ${font_size};`
  const btns_left_style = sources_show ? 'display: flex' : 'display: none'
  const btns_right_style = sources_show ? '' : height_style
  const display_style = `display:${sources_show ? 'grid' : 'none'}`
  const start_with_html = (start_with === 'html')
  const start_with_html_display = start_with_html ? '' : 'none'
  const start_with_css = (start_with === 'css')
  const start_with_css_display = start_with_css ? '' : 'none'
  const start_with_js = (start_with === 'js')
  const start_with_js_display = start_with_js ? '' : 'none'
  const grid_template_columns = output_show ? 'auto 1fr' : '1fr'

  const context = {
    id, width, height, output_min_width,
    btns_left_style, btns_right_style,
    display_style, width_style, height_style, font_size_style,
    textareas, output_show, html_show, css_show, js_show,
    start_with, start_with_html, start_with_css, start_with_js,
    start_with_html_display, start_with_css_display, start_with_js_display,
    sources_show, update_show, separate_show, update_label, separate_label,
    separate_height, separate_width,
    grid_template_columns,
  }

  const embedded = render("embedded-template.html", context)

  // for debug purposes
  // fs.writeFileSync(`embedded_${id}.html`, embedded, 'utf-8')

	$$.html(embedded)
}


function init(options) {
  options = options || {}
  const {init_style, init_script} = options
  // the style that makes the in[] and out[] labels less conspicuous
  let embedded = ``
  // undefined means not specified, so for compat it means true
  // set to null or false in the options to disable
  if ((init_style === undefined) || init_style) {
    // this file is loaded by mystmd, but within jupyterlab we need to load it
    embedded += read_style('../notebooks/_static/style.css')
  }
  // ditto
  if ((init_script === undefined) || init_script) {
    embedded += `
<script>
// Run this script imediatly

function run_when_codemirror_is_ready(f) {
	if ('CodeMirror' in globalThis) {
		// Run immediatly
		f(globalThis.CodeMirror);
	} else {
		window.addEventListener('codemirror_is_ready', e => f(e.detail));
	}
}

function append_css(url) {
	const link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', url);
	document.getElementsByTagName('head')[0].appendChild(link);
}


function initialize_codemirror() {

	if ('Jupyter' in globalThis) {
		// Require should be available, and already setup

		// Load missing peace of codemirror from Jupyter
		require([
			'codemirror/lib/codemirror',
			'codemirror/mode/htmlmixed/htmlmixed',
			'codemirror/mode/css/css',
			'codemirror/mode/javascript/javascript'
		], (CodeMirror) => {
			// Tell waiting script that CodeMirror is ready
			const e = new CustomEvent('codemirror_is_ready', { detail: CodeMirror });
			window.dispatchEvent(e);
		});
	} else {

		// Inject css only if we are in jupyter-book that do not load codemirror
		append_css('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.css');
		append_css('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/theme/elegant.min.css');

		require.config({
		  packages: [{
			name: "codemirror",
			location: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10',
			main: "codemirror.min"
		  }],
		  map: {
			'*': { 'codemirror/lib/codemirror': 'codemirror' }
		  }
		});

		require([
			'codemirror',
			'codemirror/mode/htmlmixed/htmlmixed.min',
			'codemirror/mode/css/css.min',
			'codemirror/mode/javascript/javascript.min'
		], (CodeMirror) => {
			// Tell waiting script that CodeMirror is ready
			globalThis.CodeMirror = CodeMirror;
			const e = new CustomEvent('codemirror_is_ready', { detail: CodeMirror });
			window.dispatchEvent(e);
		});
	}

}

</script>
<script defer>
// Run this script when the entire page was loaded

// we may be in a Jupyter runtime, or not (think, jupyter book)

if ('require' in globalThis) {
	initialize_codemirror();
} else {

	const script = document.createElement('script');
	script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js');
	script.setAttribute('crossorigin', 'anonymous');
	script.setAttribute('referrerpolicy', 'no-referrer');
	script.setAttribute('integrity', 'sha512-c3Nl8+7g4LMSTdrm621y7kf9v3SDPnhxLNhcjFJbKECVnmZHTdo+IRO05sNLTH/D3vA6u1X32ehoLC7WFVdheg==');

	// when require is loaded , ensure code mirror
	script.addEventListener('load', () => {
		initialize_codemirror();
	});
	document.getElementsByTagName('head')[0].appendChild(script);
}

// Run all cells below the last selected cell, i.e. this cell
if ('Jupyter' in globalThis) {
    // if Jupyter is available, run all cells below
    const notebook = globalThis.Jupyter.notebook;
    const current_selected = notebook.get_selected_cell();
    // execute_cells_below() would execute the current cell,
    // thus going into an infinite loop
    notebook.execute_cell_range(notebook.get_selected_index()+1, notebook.ncells());
    current_selected.ensure_focused();
    console.log("all cells below - current one excluded - have been executed");
}

</script>`
  }
  $$.html(embedded)
}

exports.init = init
exports.sample_from_strings = sample_from_strings
exports.sample_from_stem = sample_from_stem
exports.set_options = set_options
