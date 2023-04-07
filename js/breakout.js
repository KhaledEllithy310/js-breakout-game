let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

/****************************************************************************/

// VARIABLE DECLARATION
let padd_Width = 80;
let padd_height = 20;
let padd_margin_bottom = 40;
let leftArrow = false;
let rightArrow = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
let backG_img = new Image();
// backG_img.src = "img/space.jpg";
const ballRadius = 10;
let avail_lives = 3;
let GAME_OVER = false;

/****************************************************************************/

/****************************************************************************/
// THE gameStatus FUNCTIONS
let gameStatus = document.getElementById('gameStatus');
let wonGame = document.getElementById('wonGame');
let loseGame = document.getElementById('loseGame');
let playAgain = document.getElementById('playAgain');
let img = document.getElementById('sad-img');
let cup = document.getElementById('cup-img');

playAgain.addEventListener("click",function() {
  location.reload();
})

function youWon() {
  gameStatus.style.display = 'block';  // still will be added in level done func
  cup.style.display = 'block';
  wonGame.style.display = 'block';
  playAgain.style.display = 'block';
}

function youLost() {
  gameStatus.style.display = 'block';
  loseGame.style.display = 'block';
  img.style.display = 'block';
  playAgain.style.display = 'block';
}

/****************************************************************************/
//WIN BTN
function win() {
  youWon();
}
// LOSE BTN
function lost() {
  youLost();
}
/****************************************************************************/

/****************************************************************************/

//images
const images = {
  background: new Image(),
  ball: new Image(),
  score: new Image(),
  lives: new Image(),
  level: new Image(),
};

// IMAGES OF COMPONENTS
images.background.src = "./img/background.jpeg";
images.score.src = "./img/score.png";
images.lives.src = "./img/life.png";
images.level.src = "./img/level.png";

/****************************************************************************/

const game = {
  lives: 3,
  score: 0,
  level: 1,
};

// CONTAINER TO STORE THE BRICKIS INSIDE IT
let brickContainer = [];

/****************************************************************************/

// BRICK PROPERTIES
let brick = {
  rows: 5,
  cols: 10,
  height: 30,
  width: function () {
    return myCanvas.width / this.cols;
  },
  offsetLeft: 0,
  offsetTop: 0,
  marginTop: 100,
  fillColor: "rgba(9, 10, 78)",
  strokeColor: "#FFF",
};

/****************************************************************************/

// PADDLE PEOPERTIES
const padd = {
  x: myCanvas.width / 2 - padd_Width / 2,
  y: myCanvas.height - padd_height - padd_margin_bottom,
  height: padd_height,
  width: padd_Width,
  dx: 5,
};

/****************************************************************************/

// DRAWING THE PADDLE
function drawingPaddle() {
  ctx.fillStyle = "blue";
  ctx.fillRect(padd.x, padd.y, padd.width, padd.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(padd.x, padd.y, padd.width, padd.height);
}

/****************************************************************************/

// MOVING THE PADDLE USING KEYBOARD
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 37) {
    leftArrow = true;
  } else if (e.keyCode == 39) {
    rightArrow = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 37) {
    leftArrow = false;
  } else if (e.keyCode == 39) {
    rightArrow = false;
  }
});

/****************************************************************************/

// MOVING THE PADDLE USING MOUSE

function mouseMoveHandler(e) {
  const relativeX = e.clientX - myCanvas.offsetLeft;
  if (
    relativeX - padd_Width / 2 > 0 &&
    relativeX + padd_Width / 2 < myCanvas.width
  ) {
    padd.x = relativeX - padd_Width / 2;
  }
}
/****************************************************************************/

//CREATE BRICKS ON CANVAS AT COORDINATES X & Y
function createBricks() {
  for (let r = 0; r < brick.rows; r++) {
    brickContainer[r] = [];
    for (let c = 0; c < brick.cols; c++) {
      brickContainer[r][c] = {
        x: c * (brick.width() + brick.offsetLeft) + brick.offsetLeft,
        y:
          r * (brick.height + brick.offsetTop) +
          brick.offsetTop +
          brick.marginTop,
        status: true,
      };
    }
  }
}

/****************************************************************************/

//DRAW BRICKS ON CANVAS
function drawBricks() {
  createBricks();
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      let b = brickContainer[r][c];
      // if the brick does not broken
      if (b.status) {
        ctx.beginPath();
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(b.x, b.y, brick.width(), brick.height);

        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(b.x, b.y, brick.width(), brick.height);
        ctx.closePath();
      }
    }
  }
}

/****************************************************************************/

// MOVING THE PADDLE RIGHT & LEFT
function movingPaddle() {
  if (rightArrow && padd.x + padd.width < myCanvas.width) {
    padd.x += padd.dx;
  } else if (leftArrow && padd.x > 0) {
    padd.x -= padd.dx;
  }
}

/****************************************************************************/

// BALL PROPERTIES
const ball = {
  x: myCanvas.width / 2,
  y: padd.y - ballRadius,
  r: 10, //BALL RADIUS
  speed: 3,
  dx: 3,
  dy: -3,
};

/****************************************************************************/

// DRAW THE BALL
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "RED";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

/****************************************************************************/

// MOVE THE BALL
let LIFE = 3;
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

moveBall();

/****************************************************************************/

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
  if (ball.x + ballRadius > myCanvas.width || ball.x - ballRadius < 0) {
    ball.dx = -ball.dx;
    //WALL_HIT.play();
  }

  if (ball.y - ballRadius < 0) {
    ball.dy = -ball.dy;
    //WALL_HIT.play();
  }

  if (ball.y + ballRadius > myCanvas.height) {
    LIFE--; // LOSE LIFE
    //LIFE_LOST.play();
    resetBall();
  }
}
ballWallCollision();

/****************************************************************************/

// RESET THE BALL
function resetBall() {
  ball.x = myCanvas.width / 2;
  ball.y = padd.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
  // draw text
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);
  ctx.drawImage(img, imgX, imgY, 25, 25);
}

/****************************************************************************/

//DRAW LIVES OF GAMER
function drawLives() {
  if (game.lives > 2) {
    ctx.drawImage(images.lives, myCanvas.width - 130, 12, 25, 25);
  }
  if (game.lives > 1) {
    ctx.drawImage(images.lives, myCanvas.width - 90, 12, 25, 25);
  }
  if (game.lives > 0) {
    ctx.drawImage(images.lives, myCanvas.width - 50, 12, 25, 25);
  }
}

/****************************************************************************/

// PAINT SHAPES ON CANVAS
function paint() {
  //CLEAR PREVIOUS FRAME
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  // DRAW BACKGROUND
  ctx.drawImage(images.background, 0, 0, myCanvas.width, myCanvas.height);
  // DRAW SCORE
  showGameStats(game.score, 35, 30, images.score, 5, 9);
  // DRAW LEVELS
  showGameStats(
    game.level,
    myCanvas.width / 2,
    30,
    images.level,
    myCanvas.width / 2 - 30,
    8
  );
  drawBricks();
  drawLives();
  drawingPaddle();
  drawBall();
}

/****************************************************************************/

/****************************************************************************/
// GAME OVER FUNCTION

function gameOver() {
  if (avail_lives <= 0) {
    loseGame();
    GAME_OVER = true;
  }
}
/****************************************************************************/

// THE UPDATE FUNCTIONS
function update() {
gameOver()
  moveBall();
  ballWallCollision();
  movingPaddle();
}

/****************************************************************************/

// THE GAME LOOP FUNCTIONS
function animation() {
  paint();
  update();

  if (! GAME_OVER) {
    requestAnimationFrame(animation);
  }
  
}
animation();
