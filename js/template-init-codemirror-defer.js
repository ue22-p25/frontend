// this script must when the entire page was loaded

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
