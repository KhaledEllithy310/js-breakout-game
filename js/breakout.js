let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

/****************************************************************************/

// VARIABLE DECLARATION
let padd_Width = 150;
let padd_height = 20;
let padd_margin_bottom = 40;
let leftArrow = false;
let rightArrow = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
const ballRadius = 10;
let avail_lives = 3;
let GAME_OVER = false;

/****************************************************************************/

/****************************************************************************/
// THE gameStatus FUNCTIONS
let gameStatus = document.getElementById("gameStatus");
let wonGame = document.getElementById("wonGame");
let loseGame = document.getElementById("loseGame");
let playAgain = document.getElementById("playAgain");
let img = document.getElementById("sad-img");
let cup = document.getElementById("cup-img");

playAgain.addEventListener("click", function () {
  location.reload();
});

function youWon() {
  gameStatus.style.display = "block"; // still will be added in level done func
  cup.style.display = "block";
  wonGame.style.display = "block";
  playAgain.style.display = "block";
}

function youLost() {
  gameStatus.style.display = "block";
  loseGame.style.display = "block";
  img.style.display = "block";
  playAgain.style.display = "block";
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
images.background.src = "./img/1876.jpg";
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
  rows: 1,
  cols: 5,
  height: 30,
  width: function () {
    return (myCanvas.width - (this.cols + 1) * this.offsetLeft) / this.cols;
  },
  offsetLeft: 30,
  offsetTop: 30,
  marginTop: 100,
  fillColor: "rgba(9, 10, 78)",
  strokeColor: "#FFF",
};
console.log("myCanvas.width", myCanvas.width);
console.log("brick.width()", brick.width());
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
      if (r == Math.ceil(brick.rows / 2) && c % 2 == 0) {
        brickContainer[r][c] = {
          x: c * (brick.width() + brick.offsetLeft) + brick.offsetLeft,
          y:
            r * (brick.height + brick.offsetTop) +
            brick.offsetTop +
            brick.marginTop,
          // status: false,
          breakable: false,
        };
      } else {
        brickContainer[r][c] = {
          x: c * (brick.width() + brick.offsetLeft) + brick.offsetLeft,
          y:
            r * (brick.height + brick.offsetTop) +
            brick.offsetTop +
            brick.marginTop,
          status: true,
          breakable: true,
          hitsNum: 3,
        };
      }
    }
  }
}
createBricks();
/****************************************************************************/

//DRAW BRICKS ON CANVAS
function drawBricks() {
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      const b = brickContainer[r][c];
      if (b.status == true && b.breakable == true) {
        if (b.hitsNum === 2) {
          ctx.fillStyle = "red";
          ctx.strokeStyle = brick.strokeColor;
        } else {
          ctx.fillStyle = brick.fillColor;
          ctx.strokeStyle = brick.strokeColor;
        }
        ctx.strokeRect(b.x, b.y, brick.width(), brick.height);
        ctx.fillRect(b.x, b.y, brick.width(), brick.height);
      } else if (b.breakable == false) {
        ctx.fillStyle = "white";
        ctx.fillRect(b.x, b.y, brick.width(), brick.height);
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
  dx: 3 * (Math.random() * 2 - 1),
  dy: -3,
};

/****************************************************************************/

// DRAW THE BALL
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "RED";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

/****************************************************************************/

// MOVE THE BALL
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
    game.lives--;
    resetBall();
  }
}
ballWallCollision();

/****************************************************************************/

// BALL AND PADDLE COLLISION DETECTION
function ballPaddleCollision() {
  if (
    ball.y > padd.y &&
    ball.y < padd.y + padd.height &&
    ball.x > padd.x &&
    ball.x < padd.x + padd.width
  ) {
    //WHRER THE BALL HIT THE PADDLE
    let collidePoint = ball.x - (padd.x + padd.width / 2);
    //NORMALIZE THE VALUE
    collidePoint = collidePoint / (padd.x + padd.width);
    //CALCULATE THE ANGLE OF THE BALL THE Y DIRECTION
    let angle = collidePoint * (Math.PI * 3);
    //CALCULATE THE NEW DIRECTION OF THE BALL
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}

/****************************************************************************/

// BALL AND BRICKS COLLISION DETECTION
function ballBricksCollision() {
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      let b = brickContainer[r][c];
      // c
      if (b.status && b.breakable) {
        if (
          ball.x + ball.r > b.x &&
          ball.x - ball.r < b.x + brick.width() &&
          ball.y - ball.r < b.y + brick.height &&
          ball.y + ball.r > b.y
        ) {
          b.hitsNum--;
          ctx.fillRect(b.x, b.y, brick.width(), brick.height);
          ctx.fillStyle = "red";
          ball.dy = -ball.dy;
          if (b.hitsNum === 1) {
            b.status = false;
            game.score += 10;
          }
        }
      } else if (b.breakable == false) {
        if (
          ball.x + ball.r > b.x &&
          ball.x - ball.r < b.x + brick.width() &&
          ball.y + ball.r > b.y &&
          ball.y - ball.r < b.y + brick.height
        ) {
          ball.dy = -ball.dy;
        }
      }
    }
  }
}

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

// HOME PAGE
let small = document.getElementById("small");
document.getElementById("first").addEventListener("click", function clicking() {
  small.style = "display:none";
});

/****************************************************************************/

// PAINT SHAPES ON CANVAS
function paint() {
  //CLEAR PREVIOUS FRAME
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  // DRAW BACKGROUND
  // ctx.drawImage(images.background, 0, 0, myCanvas.width, myCanvas.height);
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
  drawLives();
  drawBricks();
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
  gameOver();
  moveBall();
  movingPaddle();
  ballWallCollision();
  ballPaddleCollision();
  ballBricksCollision();
}

/****************************************************************************/

// THE GAME LOOP FUNCTIONS
function animation() {
  paint();
  update();

  if (!GAME_OVER) {
    requestAnimationFrame(animation);
  }
}
animation();
