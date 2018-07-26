/**
*	Variables declaration
**/
const inputWidth = document.getElementById('inputWidth');
const inputHeight = document.getElementById('inputHeight');
const colorPicker = document.getElementById('colorPicker');
const canvas = document.getElementById('canvas');
const newGrid = document.getElementById('sizePicker');

/**
*	At loading a standard grid is built, initial values are defined in the markup.
**/
window.onload = () => {
	makeGrid(inputHeight.value, inputWidth.value);
};

/**
*	A new grid is requested, this means a reset of the current grid but
*		at same sizes or a reset with new sizes.
*	The canvas is cleaned, the grid is re-built at choosen sizes.
**/
newGrid.onsubmit = function(e) {
	e.preventDefault(); /* to prevent default behaviour of submit */
	while(canvas.firstChild) { /* this cleans the table */
		canvas.removeChild(canvas.firstChild);
	}
	let selectedHeight = inputHeight.value;
	let selectedWidth = inputWidth.value;
	makeGrid(selectedHeight, selectedWidth);
};

/**
*	The function that builds the grid.
**/
function makeGrid(x, y) {
	for (let i = 0; i < x; i++) {
		let tr = document.createElement('tr');
		canvas.appendChild(tr);
		for (let j = 0; j < y; j++) {
			let td = document.createElement('td');
			document.querySelector('tr:last-child').appendChild(td);
		}
	}
}

/**
*	Function that paints a cell checking that e.target is a td element
**/
function paintCell(e) {
	if (e.target.nodeName === 'TD') {
		let selectedColor = colorPicker.value;
		e.target.style.backgroundColor = selectedColor;
	}
}

/**
*	Function that resets a cell checking that e.target is a td element
**/
function resetCell(e) {
	if (e.target.nodeName === 'TD') {
		e.preventDefault();
		e.target.style.backgroundColor = '#fff';
	}
}

/**
*	Event listeners set on the canvas.
* This way ensures to have 2 only event listeners instead 2 for every cell
*		in the canvas to improve performances. When a click (right or left) is
*		detected, the linked function is called. The function verifies if the
*		click comes from the wanted element, if true the cell is painted or cleared.
**/
canvas.addEventListener('click', paintCell);
canvas.addEventListener('contextmenu', resetCell);
