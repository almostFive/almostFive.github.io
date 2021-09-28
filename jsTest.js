'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let dx,dy,d, arr_x, arr_y;
let snake = [{x: 16, y: 8}];
let arr = Array.from({length: 32}, () => Array.from({length: 16}, () => 0));

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

function resizeCanvas() {
  if (window.innerHeight < (2 * window.innerWidth)) {
  	d = Math.floor(window.innerHeight/16);
  } else {
  	d = Math.floor(window.innerWidth/32);
  }

  arr_x = d*16;
  arr_y = d*32;

  //arr_x = window.innerWidth;
  //arr_y = window.innerHeight;

	canvas.width = arr_x;
	canvas.height = arr_y;

	draw();
}

function clear() {
  ctx.fillStyle = '#EEEEEE';
  ctx.fillRect(0, 0, arr_x, arr_y);
}

function move() {
  /*
  let head = {snake[0].x + dx, snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
  */
}

function draw() {
  ctx.fillStyle = '#EEEEEE';
  ctx.fillRect(0, 0, arr_x, arr_y);
  ctx.fillStyle = '#000000';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y - d, snake[i].x, snake[i].y);
  }
}

function main () {
  setTimeout(function game() {
    clear();
    move();
    draw();
    console.log('looping!');
    main();
  }, 100);
}

main();

function fruit () {

}

document.addEventListener('keydown', event => {
	const charList = 'adsw';
	// movement keys only
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

	if (key === 'arrowleft' || key === 'a') {
		dx = -1;
    dy = 0;
	} else if (key === 'arrowup' || key === 'w') {
		dy = 1;
    dx = 0;
	} else if (key === 'arrowright' || key === 'd') {
		dx = 1;
    dy = 0;
	} else if (key === 'arrowdown' || key === 's') {
		dy = -1;
    dx = 0;
	}
});
