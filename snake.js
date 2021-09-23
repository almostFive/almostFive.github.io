'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//Size of the canvas variables, d is dependent on window, and arr_x and arr_y are dependent on d
let d;
let arr_x;
let arr_y;

//Should find a way to make it so I can assign 0 to all of these, -1 just shows poor implementation.
let score = -1;
let cheat = 0;
let bool = -1;


//Make the gameboard array (arr) and then assign random numbers for player start and fruit
let arr = Array.from({length: 16}, () => Array.from({length: 8}, () => 0));
let head_x = x();
let head_y = y();
arr[head_x][head_y] = 1;

let tail_x = head_x;
let tail_y = head_y;

let fruit_x = 0;
let fruit_y = 0;


//place fruit
fruit()

if (window.innerHeight < (2 * window.innerWidth)) {
	//dimension size of each block
	d = Math.floor(window.innerHeight/8);
} else {
	d = Math.floor(window.innerWidth/16);
}

//Keep these in a reasonable amount :)
arr_x = d*16;
arr_y = d*8;

console.log(d);
console.log(arr_x)
console.log(arr_y)

ctx.fillStyle = '#EEEEEE';
ctx.fillRect(0, 0, arr_x, arr_y);
ctx.fillStyle = 'black';
ctx.fillRect(head_x*d,head_y*d,d,d);
ctx.fillStyle = 'purple';
ctx.fillRect(fruit_x*d,fruit_y*d,d,d);


initialize();

function initialize() {
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
}

function resizeCanvas() {

	//Checks to guarantee that the window is at least 2x as wide as it is tall
	//If 2x width is less than height than we base the size off of the width rather
	// than the height.
	if ((window.innerHeight*2) < (window.innerWidth)) {
		//dimension size of each block
		d = Math.floor(window.innerHeight/8);
	} else {
		d = Math.floor(window.innerWidth/16);
		console.log('got here i guess')
	}

	//Keep these in a reasonable amount :)
	arr_x = d*16;
	arr_y = d*8;

	canvas.width = arr_x;
	canvas.height = arr_y;

	redraw();
}

function redraw() {
	ctx.fillStyle = '#EEEEEE';
	ctx.fillRect(0, 0, arr_x, arr_y);
	ctx.fillStyle = 'black';
	ctx.fillRect(head_x*d,head_y*d,d,d);
	if (arr[fruit_x][fruit_y] === 2) {
		ctx.fillStyle = 'purple';
		ctx.fillRect(fruit_x*d,fruit_y*d,d,d);
	}
	for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 8; j++) {
			if (arr[i][j] === -1) {
				ctx.fillStyle = 'red';
				ctx.fillRect(i*d,j*d,d,d);
			}
		}
	}
}

document.addEventListener('keydown', event => {
	const charList = 'adesw';
	// movement keys only
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

	if (key === 'arrowleft' || key === 'a') {
		if (head_x != 0) {
			head_x--;
			arr[head_x][head_y]++;
		} else {
			head_x = (15);
			arr[head_x][head_y]++;
		}
	} else if (key === 'arrowup' || key === 'w') {
		if (head_y != 0) {
			head_y--;
			arr[head_x][head_y]++;
		} else {
			head_y = (7);
			arr[head_x][head_y]++;
		}
	} else if (key === 'arrowright' || key === 'd') {
		if (head_x != 15) {
			head_x++;
			arr[head_x][head_y]++;
		} else {
			head_x = 0;
			arr[head_x][head_y]++;
		}
	} else if (key === 'arrowdown' || key === 's') {
		if (head_y != 7) {
			head_y++;
			arr[head_x][head_y]++;
		} else {
			head_y = 0;
			arr[head_x][head_y]++;
		}
	} else if (key === 'e') {
		alert('Current points: ' + score + '\n Destroyable red boxes: ' + (Math.floor(score/10) - cheat));
		return;
	}

	if (bool === 1) {
		bool--
		if (arr[head_x][head_y] === 3) {
			fruit()
		} else if (arr[head_x][head_y] === 0) {
			zero()
		}
		tail(-1,'red');
	} else if (bool === 0) {
		if (arr[head_x][head_y] === 0) {
			zero()
		} else if (arr[head_x][head_y] === 1) {
			tail(0,'#EEEEEE');
		} else if (arr[head_x][head_y] === 3) {
			tail(0,'#EEEEEE');
			fruit()
		}
	}
	ctx.fillStyle = 'black';
	ctx.fillRect(head_x*d,head_y*d,d,d);
});

function reset () {
	score = -1;
	cheat = 0;
	bool = -1;

	arr = arr.map(a => a.map(() => 0))

	head_x = x()
	head_y = y()
	tail_x = head_x
	tail_y = head_y
	arr[head_x][head_y] = 1;
	arr[fruit_x][fruit_y] = 0;
	resizeCanvas();
	fruit()
}

function fruit () {
	do {
		fruit_x = x()
		fruit_y = y()
	} while (arr[fruit_x][fruit_y] !== 0);
	arr[fruit_x][fruit_y] = 2;

	ctx.fillStyle = 'purple';
	ctx.fillRect(fruit_x*d,fruit_y*d,d,d);

	score++;
	bool++;
}

function tail (a, b) {
	arr[tail_x][tail_y] = a;
	ctx.fillStyle = b;
	ctx.fillRect(tail_x*d,tail_y*d,d,d);
	tail_x = head_x
	tail_y = head_y
}

function zero () {
	if (Math.floor(score/10) - cheat === 0) {
		alert('You lost! Your score was ' + score + '!')
		reset();
	} else {
		cheat++;
		tail(0,'#EEEEEE');
	}
}

function x () {
	return Math.floor(Math.random() * 16);
}

function y () {
	return Math.floor(Math.random() * 8);
}
