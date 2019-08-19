requestAnimationFrame(update);

// Sliders
var canvas = document.getElementById("canvas");
var sliderSize = document.getElementById("sliderSize");
var sliderOriginY = document.getElementById("sliderOriginY");
var sliderOriginX = document.getElementById("sliderOriginX");
var sliderToggleFill = document.getElementById("sliderToggleFill");
var sliderSpacing = document.getElementById("sliderSpacing");
var sliderElongate = document.getElementById("sliderElongate");
// Size
sliderSize.addEventListener("input", e => {
  delta = Number(e.target.value);
  sliderSize.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
// OriginY
sliderOriginY.addEventListener("input", e => {
  p1.y = Number(e.target.value);
  q1.y = Number(e.target.value); // keep y value on same plane
  sliderOriginY.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
// OriginX
sliderOriginX.addEventListener("input", e => {
  p1.x = Number(e.target.value);
  q1.x = Number(e.target.value) * spacing;
  console.log(spacing, "spacing");

  sliderOriginX.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
//Toggle Fill
sliderToggleFill.addEventListener("input", e => {
  toggleFill = Number(e.target.value);
  sliderToggleFill.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
//Toggle SecondVP
sliderAddVP.addEventListener("input", e => {
  secondVP = Number(e.target.value);
  sliderAddVP.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
// Toggle Spacing Distance
sliderSpacing.addEventListener("input", e => {
  spacing = 1 + Number(e.target.value) / 100;
  p1.x = Number(e.target.value);
  q1.x = Number(e.target.value) * spacing;
  sliderSpacing.nextElementSibling.textContent = e.target.value;
  redraw = true;
});
// Toggle Rectangilness
sliderElongate.addEventListener("input", e => {
  scalar = Number(e.target.value);
  sliderElongate.nextElementSibling.textContent = e.target.value;
  redraw = true;
});

// Document Sliders

// var msgBox = document.querySelector(".checkbox");
// msgBox.addEventListener("input", e => {
//   console.log(e.target.value);
// });
// console.log(msgBox);

const ct = canvas.getContext("2d");
const width = 1600;
const height = 800;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Scales 2D context to always show ideal resolution area
const scaleToFit = () => {
  var scale = Math.min(canvas.width / width, canvas.height / height);
  ct.setTransform(scale, 0, 0, scale, 0, 0); // makes canvas fit to screen
};

var redraw = true; // When true, scene is redrawn ready for the next display refresh

// Constructor Function to initialize objects
const point = (x = 0, y = 0) => ({ x, y });
const pointCalc = (p, x = 0, y = 0) => ({ x: p.x + x, y: p.y + y });
// y = mx + b slope formula for other points
const scalePoint = (origin, point, scale) => {
  point.x = (point.x - origin.x) * scale + origin.x;
  point.y = (point.y - origin.y) * scale + origin.y;
};

// Objects Cartesion Points
var p1 = point(400, 400);
var pA = point(p1.x, p1.y * 2);
var pB = point(p1.x * 2, p1.y * 2);

// Second Vanishing Point
var q1 = point(p1.x + 800, p1.y);

// State Toggles
var delta = 50;
var toggleFill = 0;
var secondVP = 0;
var spacing = 300;
var scalar = 1600;

function update() {
  // render loop redraws only if true
  if (redraw) {
    // monitor semaphore / state
    redraw = false; // clear semaphore / state
    ct.setTransform(1, 0, 0, 1, 0, 0); // resets transform
    ct.clearRect(0, 0, ct.canvas.width, ct.canvas.height); // clear Canvas
    scaleToFit();
    draw();
  }
  requestAnimationFrame(update);
}

// was function init(), specify start and endpoint
function draw() {
  drawLine(p1, pA, "red");
  drawLine(p1, pB, "green");
  drawVBox(pB, delta, p1, "blue", 1, q1, scalar);
  if (secondVP == 1) {
    drawLine(q1, pB, "purple");
  }
}

function drawVBox(p, size, vp, col, width, vp2, scalar) {
  //https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
  // p is bottom left,  vp is vanish point
  ct.strokeStyle = col;
  ct.lineWidth = width;
  // var elongate = 1 - size / (800 * 2); // Make box more elongated
  var elongate = 1 - size / scalar; // Make box more elongated
  let frontFace = [];
  let backFace = [];

  if (secondVP == 0) {
    frontFace = [
      pointCalc(p),
      pointCalc(p, size, 0),
      pointCalc(p, size, -size),
      pointCalc(p, 0, -size)
    ];
    backFace = frontFace.map(({ x, y }) => ({
      x: vp.x - elongate * (vp.x - x),
      y: vp.y - elongate * (vp.y - y)
    }));
    console.log(backFace, "backface, 1st VP");
    console.log(frontFace, "frontface, 1st VP");
  } else if (secondVP == 1) {
    frontFace = [
      pointCalc(p),
      pointCalc(
        p,
        vp2.x - elongate * (vp2.x - p.x) - 800,
        vp2.y - elongate * (vp.y - p.y) - 800
      ),
      pointCalc(
        p,
        vp2.x - elongate * (vp2.x - p.x) - 800,
        vp2.y - elongate * (vp.y - p.y) - 800 - size
      ),
      pointCalc(p, 0, -size)
    ];
    // backFace = frontFace.map(({ x, y }) => ({
    //   x: vp.x - elongate * (vp.x - x),
    //   y: vp.y - elongate * (vp.y - y)
    // }));
    backFace = frontFace.map(({ x, y }) => ({
      x: vp.x - elongate * (vp.x - x),
      y: vp.y - elongate * (vp.y - y)
    }));
    console.log(backFace, "backface, 2nd VP");
    console.log(frontFace, "frontface, 2nd VP");
  } else {
    console.log(
      "error, can only have 1 or 2 vanishing points when establishing coordinates"
    );
  }

  // If only one VP
  if (secondVP == 0 || secondVP == 1) {
    // bottomleft, bottomright, topright, topleft
    drawPoly(col, width, ...backFace); // back
    drawPoly(col, width, backFace[0], backFace[3], frontFace[3], frontFace[0]); // left
    drawPoly(col, width, backFace[1], backFace[2], frontFace[2], frontFace[1]); // right
    drawPoly(col, width, ...frontFace); // front
  } else {
    console.log("error, can only have 1 or 2 vanishing points when drawing");
  }
}

// Use function to do common tasks and save yourself lots of typing
function drawLine(p1, p2, col, width = 1) {
  // ct.globalCompositeOperation = 'destination-over'; // draw behind
  ct.strokeStyle = col;
  ct.lineWidth = width;
  ct.beginPath();
  ct.lineTo(p1.x, p1.y); // First Point after beginPath can be lineTo (don't need moveTo)
  ct.lineTo(p2.x, p2.y);
  ct.stroke();
}

// For vanishing lines only
function pathLine(p1, p2) {
  ct.moveTo(p1.x, p1.y);
  ct.lineTo(p2.x, p2.y);
}

// Draw the square
function drawPoly(col, width, ...points) {
  ct.strokeStyle = col;
  ct.lineWidth = width;
  if (toggleFill == 1) {
    ct.fillStyle = "lightgreen";
  } else {
    ct.fillStyle = "rgba(0, 0, 200, 0)";
  }
  ct.beginPath();
  for (const p of points) {
    ct.lineTo(p.x, p.y); // lineTo every point
  }

  ct.fill();
  ct.closePath(); // draw closing line
  ct.stroke();
}
