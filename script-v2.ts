
requestAnimationFrame(update);

var canvas: any = document.getElementById("canvas");
var slider: any = document.getElementById("slider");
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
const p1 = point(400, 400);;
const pA = point(p1.x, p1.y * 2);
const pB = point(p1.x * 2, p1.y * 2);

var delta = 50;

// The slider input event should not directly trigger a render
slider.addEventListener("input", (e) => {
  delta = Number((e.target as HTMLInputElement).value);
  redraw = true; // uses semaphore (a state variable) to indicate when to redraw
})

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

  /**
   * Use clockwise notation for p0, p1,p2,p3 respectively
   * bottom-left, bottomright, topright, topleft
   * pointCalc - (p,x,y) where (x,y) are changes
   */
  // Front
  // const slope = calculateSlope(p, vp);
  // const angle = Math.tanh(slope);
  // console.log(angle);
  // let frontFace = [
  //   pointCalc(p), // bl
  //   pointCalc(p, size, 0), //br
  //   pointCalc(p, size, -size), //tr
  //   pointCalc(p, 0, -size), //tl
  // ]
  // let leftFace = [
  //   pointCalc(p), //br
  //   pointCalc(p, 0, -size), //tr
  //   pointCalc(p, 0),// tl - Not really sure
  //   pointCalc(p, -size * Math.cos(angle), -size * Math.sin(angle)), //bl
  // ]
  // console.log(frontFace);
  // let leftFace = {
  //   p0: pointCalc(p),
  //   p1: pointCalc(p, size, 0),
  // }
  // let bottomFace = {
  //   p0: pointCalc(p)
  // }
  // drawPoly(col, width, ...frontFace); // create frontface from values

  //--------------------
  ct.strokeStyle = col;
  ct.lineWidth = width;

  const frontFace = [
    pointCalc(p),
    pointCalc(p, size, 0),
    pointCalc(p, size, -size),
    pointCalc(p, 0, -size)
  ]
  drawPoly(col, width, ...frontFace); // create frontface from values
  console.log(frontFace, "frontFace");
  const scale = 1 - size / (800 * 2); // Inverse scalar

  const backFace = frontFace.map(({ x, y }) => ({
    x: (x - vp.x) * scale + vp.y,
    y: (y - vp.y) * scale + vp.x,
  }));
  console.log(backFace);
  // console.log(backFace, "backFace");
  drawPoly(col, width, ...backFace);
  console.log(frontFace, "backFace");

  // const p0 = pointCalc(p); // bottomleft
  // const p1 = pointCalc(p, size, 0); // bottom right
  // const p2 = pointCalc(p, size, -size); // topright
  // const p3 = pointCalc(p, 0, -size); // topleft
  // drawPoly(col, width, p0, p1, p2, p3); // create frontface from values

  // ct.beginPath(); // draw vanish lines
  // pathLine(p0, vp); // bottom left
  // pathLine(p1, vp); // bottom right
  // pathLine(p2, vp); // top right
  // pathLine(p3, vp); // top left
  // ct.stroke();

  // scalePoint(vp, p0, scale); // uses slope formula to calculate backface points
  // scalePoint(vp, p1, scale);
  // scalePoint(vp, p2, scale);
  // scalePoint(vp, p3, scale);
  // const scalePoint = (origin, point, scale) => {
  //   point.x = (point.x - origin.x) * scale + origin.x;
  //   point.y = (point.y - origin.y) * scale + origin.y;
  // };
  // drawPoly(col, width, p0, p1, p2, p3); // create backface from values
}

/**
 * Grab the coordinate pairs
 * {p} -> {x:400,y:400} coordinate pair object
 * {type} -> callback function
 */
// function make coordinate pairs
/**
 * The base implementation of `_.property` without support for deep paths.
 */
//

// Make Coordinates
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
  ct.globalCompositeOperation = 'destination-over'; // draw behind
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
  ct.fillStyle = 'lightgreen';
  ct.lineWidth = width;
  ct.beginPath();
  for (const p of points) {
    ct.lineTo(p.x, p.y); // lineTo every point
  }
  ct.fill();
  ct.closePath(); // draw closing line
  ct.stroke();
}
