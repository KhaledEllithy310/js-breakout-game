let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
ctx.lineWidth = 4;


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

// MOVING THE PADDLE RIGHT & LEFT
function movingPaddle() {
if (rightArrow && padd.x + padd.width < myCanvas.width) {
    padd.x += padd.dx;
} else if (leftArrow && padd.x > 0) {
    padd.x -= padd.dx;
}
}

/****************************************************************************/

// THE PAINTING FUNCTION
function paint() {
  //CLEAR PREVIOUS FRAME
  //   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
ctx.drawImage(backG_img, 0, 0, myCanvas.width, myCanvas.height);
  // ctx.drawImage(images.ball, ball.x, ball.y, 2 * ballRadius, 2 * ballRadius);
drawingPaddle();
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
movingPaddle();
gameOver()
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
