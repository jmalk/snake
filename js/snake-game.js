var snake;
var food;
var points = 0;

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

  if (snake.checkForCrash()) {
    endGame();
  };

  snake.show();

  if (snake.body[0][0] === food.x && snake.body[0][1] === food.y) {
    console.log('EAT!');
    snake.body.push([food.x, food.y]);
    points += 1;
    var score = document.getElementById('score');
    score.innerHTML = 'Score = ' + points;
    food = null;
    food = new Food();
  }
}

function endGame () {
  clear();
  noLoop();
}

function Snake (x, y) {
  this.body = [[x, y]];
  this.xSpeed = 1;
  this.ySpeed = 0;

  this.move = function () {
    var newX = (this.body[0][0] + this.xSpeed) % maxXCoord;
    var newY = (this.body[0][1] + this.ySpeed) % maxYCoord;

    if (newX < 0) {
      newX = maxXCoord;
    }

    if (newY < 0) {
      newY = maxYCoord;
    }

    this.body.unshift([newX, newY]);
    this.body.pop();
  }

  this.checkForCrash = function () {
    var returnValue = false;

    for (var i = 1; i < this.body.length; i++) {
      if (this.body[0][0] === this.body[i][0] && this.body[0][1] === this.body[i][1]) {
        returnValue = true;
      }
    }

    return returnValue;
  }

  this.show = function () {
    fill(255);
    for (var i = 0; i < this.body.length; i++) {
      rect(this.body[i][0] * blockWidth, this.body[i][1] * blockHeight, blockWidth, blockHeight);
    }
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
  // Key codes 72, 74, 75, 76 are h, j, k, l, respectively.
  // Vim keys for left, down, up, right.
  if (keyCode === LEFT_ARROW || keyCode === 72) {
    snake.xSpeed = -1;
    snake.ySpeed = 0;
  } else if (keyCode === RIGHT_ARROW || keyCode === 76) {
    snake.xSpeed = 1;
    snake.ySpeed = 0;
  } else if (keyCode === UP_ARROW || keyCode === 75) {
    snake.xSpeed = 0;
    snake.ySpeed = -1;
  } else if (keyCode === DOWN_ARROW || keyCode === 74) {
    snake.xSpeed = 0;
    snake.ySpeed = 1;
  } else {
    console.log('Use arrow keys to control the snake');
  }
}

function mouseDragged () {
  var deltaX = mouseX - pmouseX;
  var deltaY = mouseY - pmouseY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
    snake.xSpeed = -1;
    snake.ySpeed = 0;
  } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
    snake.xSpeed = 1;
    snake.ySpeed = 0;
  } else if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY < 0) {
    snake.xSpeed = 0;
    snake.ySpeed = -1;
  } else if (Math.abs(deltaX) < Math.abs(deltaY) && deltaY > 0) {
    snake.xSpeed = 0;
    snake.ySpeed = 1;
  }
}

function randomInteger(max) {
  return Math.floor(Math.random() * max);
}
