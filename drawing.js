// select elements
const canvas = document.querySelector('canvas');
const clear = document.querySelector('.clear');
// set a default color
let color = '#000000';
// set a random color
let random = Math.random() * 360;
const { width, height } = canvas;

// initialize canvas drawing settings
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;
// STEP FOUR: change the color of the line
let hue = 0;
ctx.strokeStyle = color;


// STEP ONE: test out canvas
// Place cursor in the middle and make a dot
// let x = width/2;
// let y = height/2;
// ctx.beginPath();
// ctx.moveTo(x, y);
// ctx.lineTo(x, y);
// ctx.stroke();
// ctx.strokeStyle = '#000000';


// initialize variables
// for use in Step Two mouseDraw()
let lastX = 0;
let lastY = 0;
let isDrawing = false;
// for use in Step Five keyboard draw
let x = width/2;
let y = height/2;
const MOVE_AMOUNT = 10;
let keysPressed = {};


// STEP TWO: draw with the mouse
function mouseDraw(event) {
  // stop if not mouse down
  if (!isDrawing) return;

  ctx.strokeStyle = setColor();
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  // console.log(lastX, lastY);
  // console.log(event.offsetX, event.offsetY);

  ctx.lineTo(event.offsetX * 2, event.offsetY * 2);
  ctx.stroke();

  // reset lastX and lastY to be current event's offsetX and offsetY
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];
}

// add listeners for mouse movements in canvas
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX * 2, event.offsetY * 2];
});
canvas.addEventListener('mousemove', mouseDraw);
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  // reset random color
  random = Math.floor(Math.random() * 360);
});
// if we want to stop drawing if mouse leaves the canvas
// canvas.addEventListener('mouseout', () => isDrawing = false);


// STEP THREE: clear the screen
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  }, { once: true });

  // reset initial x and y positions
  x = width / 2;
  y = height / 2;
}

// see STEP SIX
// clear.addEventListener('click', clearCanvas);


// STEP FIVE: draw using keyboard's arrow keys
document.addEventListener('keydown', (event) => {

  if (event.key.includes('Arrow')) {
    event.preventDefault();
    keysPressed[event.key] = true;
    // console.log(keysPressed);

    ctx.strokeStyle = setColor();
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
      y -= MOVE_AMOUNT;
      x += MOVE_AMOUNT;
    } else if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
      y -= MOVE_AMOUNT;
      x -= MOVE_AMOUNT;
    } else if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
      y += MOVE_AMOUNT;
      x += MOVE_AMOUNT;
    } else if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
      y += MOVE_AMOUNT;
      x -= MOVE_AMOUNT;
    } else if (keysPressed.ArrowUp) {
      y -= MOVE_AMOUNT;
    } else if (keysPressed.ArrowDown) {
      y += MOVE_AMOUNT;
    } else if (keysPressed.ArrowRight) {
      x += MOVE_AMOUNT;
    } else if (keysPressed.ArrowLeft) {
      x -= MOVE_AMOUNT;
    } else { }

    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
  // reset random color
  random = Math.floor(Math.random() * 360);
})


// STEP SIX: handle buttons
function handleButton(event) {

  const action = event.target.dataset.action;
  // console.log(action);

  if (action === 'clear') {
    clearCanvas();
  } else {
    color = action;
  }
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', handleButton);
});


// STEP SEVEN: handle colors
function setColor() {
  if (color === 'rainbow') {
    hue += 2;
    return `hsl(${hue}, 100%, 50%)`;
  } else if (color === 'wild') {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (color === 'random') {
    return `hsl(${random}, 100%, 50%)`;
  }
  else {
    return '#000000';
  }
}

// STEP EIGHT: handle radio buttons
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('click', () => {
    ctx.lineWidth = parseInt(input.getAttribute('value'));
  });
});