const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
console.log(ctx);

//images
const images = {
  background: new Image(),
  ball: new Image(),
  score: new Image(),
  lives: new Image(),
  level: new Image(),
};

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

createBricks();
/****************************************************************************/

//DRAW BRICKS ON CANVAS
function drawBricks() {
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

// IMAGES OF COMPONENTS
images.background.src = "./img/background.jpeg";
images.score.src = "./img/score.png";
images.lives.src = "./img/life.png";
images.level.src = "./img/level.png";

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
}

/****************************************************************************/

// ANIMATION FOR GAME
function animation() {
  paint();
  requestAnimationFrame(animation);
}
animation();

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

/******************************************************** */
