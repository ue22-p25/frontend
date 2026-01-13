
// Run this script imediately

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
