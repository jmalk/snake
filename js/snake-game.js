var snake;

var canvasWidth = 640;
var canvasHeight = 480;

var blockWidth = 10;
var blockHeight = 10;

var maxXCoord = Math.floor(canvasWidth / blockWidth);
var maxYCoord = Math.floor(canvasHeight / blockHeight);

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(10);
  snake = new Snake(blockWidth, blockHeight);
  food = new Food()
}

function draw () {
  background(50);

  food.show();

  snake.move();
  snake.show();
}

function Snake (x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = 1;
  this.ySpeed = 0;

  this.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  this.show = function () {
    fill(255);
    rect(this.x * blockWidth, this.y * blockHeight, blockWidth, blockHeight);
  }
}

function Food () {
  this.x = randomInteger(maxXCoord);
  this.y = randomInteger(maxYCoord);

  this.show = function () {
    fill(100);
    rect(this.x * blockWidth, this.y * blockHeight, blockWidth, blockHeight);
  }
}

function keyPressed () {
  if (keyCode === LEFT_ARROW) {
    snake.xSpeed = -1;
    snake.ySpeed = 0;
  } else if (keyCode === RIGHT_ARROW) {
    snake.xSpeed = 1;
    snake.ySpeed = 0;
  } else if (keyCode === UP_ARROW) {
    snake.xSpeed = 0;
    snake.ySpeed = -1;
  } else if (keyCode === DOWN_ARROW) {
    snake.xSpeed = 0;
    snake.ySpeed = 1;
  } else {
    console.log('Use arrow keys to control the snake');
  }
}

function randomInteger(max) {
  return Math.floor(Math.random() * max);
}
