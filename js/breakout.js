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
