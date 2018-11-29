// var sliders = document.querySelectorAll("input");
// sliders.forEach(item => {
//   item.addEventListener('input', (e) => {
//     item.nextElementSibling.textContent = e.target.value;
//     console.log(item.getAttribute("data-tag"));
//     window[item.getAttribute("data-tag")] = Number(e.target.value); // target variable by data-tag of input var name
//     redraw = true; // uses semaphore (a state variable) to indicate when to redraw
//   });
// })

// Init
requestAnimationFrame(update);

// Sliders
var canvas: any = document.getElementById("canvas");
var sliderSize = document.getElementById("sliderSize");
var sliderOriginY = document.getElementById("sliderOriginY");
var sliderOriginX = document.getElementById("sliderOriginX");
var sliderToggleFill = document.getElementById("sliderToggleFill");
sliderSize.addEventListener("input", (e) => {
  delta = Number((e.target.value);
  sliderSize.nextElementSibling.textContent = e.target.value;
  redraw = true; // uses semaphore (a state variable) to indicate when to redraw
})
sliderOriginY.addEventListener("input", (e) => {
  p1.y = Number((e.target.value);
  sliderOriginY.nextElementSibling.textContent = e.target.value;
  redraw = true; // uses semaphore (a state variable) to indicate when to redraw
})
sliderOriginX.addEventListener("input", (e) => {
  p1.x = Number((e.target.value);
  sliderOriginX.nextElementSibling.textContent = e.target.value;
  redraw = true; // uses semaphore (a state variable) to indicate when to redraw
})
sliderToggleFill.addEventListener("input", (e) => {
  toggleFill = Number((e.target.value);
  sliderToggleFill.nextElementSibling.textContent = e.target.value;
  redraw = true; // uses semaphore (a state variable) to indicate when to redraw
})



const ct = canvas.getContext("2d");
const width = 1600;
const height = 800;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Scales 2D context to always show ideal resolution area
const scaleToFit = () => {
  var scale = Math.min(canvas.width / width, canvas.height / height);
  ct.setTransform(scale, 0, 0, scale, 0, 0); // makes canvas fit to screen
}

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
var p1 = point(400, 400);;
var pA = point(p1.x, p1.y * 2);
var pB = point(p1.x * 2, p1.y * 2);

var delta = 50;
var toggleFill = 0;

function update() { // render loop redraws only if true
  if (redraw) { // monitor semaphore / state
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
  drawVBox(pB, delta, p1, "blue", 1);
}

function drawVBox(p, size, vp, col, width) { // p is bottom left,  vp is vanish point
  ct.strokeStyle = col;
  ct.lineWidth = width; 0

  const frontFace = [
    pointCalc(p),
    pointCalc(p, size, 0),
    pointCalc(p, size, -size),
    pointCalc(p, 0, -size)
  ]
  console.log(frontFace, "frontFace");
  const scale = 1 - size / (800 * 2); // Inverse scalar
  console.log(scale);

  //https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
  const backFace = frontFace.map(({ x, y }) => ({
    x: vp.x - scale * (vp.x - x),
    y: vp.y - scale * (vp.y - y)
  }));
  // bottomleft, bottomright, topright, topleft
  drawPoly(col, width, ...backFace); // back
  drawPoly(col, width, backFace[0], backFace[3], frontFace[3], frontFace[0]); // left
  drawPoly(col, width, backFace[1], backFace[2], frontFace[2], frontFace[1]); // right
  drawPoly(col, width, ...frontFace); // front
}

// sideface
function makeFaceYZ(p, vp) {
}
// front / backface
function makeFaceXZ(p, vp) {

}
// topface / bottomface
function makeFaceXY(p, vp) {

}

function calculateSlope(p, vp) {
  return (p.y - vp.y) / (p.x - vp.x);
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
    ct.fillStyle = 'lightgreen';
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
