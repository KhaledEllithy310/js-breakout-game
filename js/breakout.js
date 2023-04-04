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
  ctx.strokeStyle = "black";
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
}

/****************************************************************************/

// THE UPDATE FUNCTIONS
function update() {
  movingPaddle();
}

/****************************************************************************/

// THE GAME LOOP FUNCTIONS
function animation() {
  paint();
  update();
  requestAnimationFrame(animation);
}
animation();
