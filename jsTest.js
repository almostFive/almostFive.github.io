'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// enum Direction {
//   Up = 1,
//   Down,
//   Left,
//   Right,
// }

let fruit = {x: Math.floor(Math.random() * 32), y: Math.floor(Math.random() * 16)};
let dx,dy,d,arr_x,arr_y;
let snake = [{x: +16, y: +8}];
//let arr = Array.from({length: 32}, () => Array.from({length: 16}, () => 0));

if (snake.x === fruit.x && snake.y === fruit.y) {
  fruit.unshift({x: fruit.x, y: fruit.y+1});
  fruit.pop();
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

function resizeCanvas() {
  if (window.innerHeight < (2 * window.innerWidth)) {
  	d = Math.floor(window.innerHeight/16);
  } else {
  	d = Math.floor(window.innerWidth/32);
  }

  arr_x = d*32;
  arr_y = d*16;

  //arr_x = window.innerWidth;
  //arr_y = window.innerHeight;

	canvas.height = arr_y;
	canvas.width = arr_x;

	draw();
}

function clear() {
  ctx.fillStyle = '#EEEEEE';
  ctx.fillRect(0, 0, arr_x, arr_y);
}

function move() {
  if (+snake[0].x+dx === fruit.x && +snake[0].y+dy === fruit.y) {
    fruits();
    return;
  }
  let head = {x:[+snake[0].x + dx], y:[+snake[0].y + dy]};
  snake.unshift(head);
  snake.pop();
}

function draw() {
  ctx.fillStyle = '#EEEEEE';
  ctx.fillRect(0, 0, arr_x, arr_y);
  ctx.fillStyle = '#000000';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x*d, snake[i].y*d, d, d);
  }
  ctx.fillStyle = '#222222';
  ctx.fillRect(fruit.x*d, fruit.y*d, d, d);
}

main();

function main () {

  // if(alive) {
  //   return;
  // }

  setTimeout(function game() {
    clear();
    move();
    draw();
    main();
    console.log('wtf');
  }, 200);
}

function fruits () {
  while (fruit.x === snake.x && fruit.y === snake.y) {
    fruit.unshift({x: Math.floor(Math.random() * 32), y: Math.floor(Math.random() * 16)});
    fruit.pop();
  }
  let head = {x:[+snake[0].x + dx], y:[+snake[0].y + dy]};
  snake.unshift(head);
}

// function alive() {
//   if (snake.length < 5) {
//     return false;
//   }
//   for (let i = 4; i < snake.length; i++) {
//     if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
//       return true;
//     }
//   }
// }

document.addEventListener('keydown', event => {
	const charList = 'adsw';
	// movement keys only
	const key = event.key.toLowerCase();
	if (!(charList.includes(key)) && (key !== 'arrowup') && (key !== 'arrowdown') && (key !== 'arrowright') && (key !== 'arrowleft')) { return; }

	if (key === 'arrowleft' || key === 'a') {
		dx = -1;
    dy = 0;
	} else if (key === 'arrowup' || key === 'w') {
		dy = -1;
    dx = 0;
	} else if (key === 'arrowright' || key === 'd') {
		dx = 1;
    dy = 0;
	} else if (key === 'arrowdown' || key === 's') {
		dy = 1;
    dx = 0;
	}
});
