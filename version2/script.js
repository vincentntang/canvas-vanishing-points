requestAnimationFrame(update); // start anim loop

const ctx = canvas.getContext("2d");
const width = 1600;  // The ideal resolution
const height = 800;  // used to scale content
canvas.width = innerWidth;
canvas.height = innerHeight;


//Scales 2D context to always show the ideal resolution area
const scaleToFit = () => {  // sets canvas scale to fit content
  var scale = Math.min(canvas.width / width, canvas.height / height);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

var redraw = true;   // when true scene is redrawn ready for the next display refresh

// Working with points is easier
const point = (x = 0, y = 0) => ({ x, y });
const pointCpy = (p, x = 0, y = 0) => ({ x: p.x + x, y: p.y + y });
const scalePoint = (origin, point, scale) => {
  point.x = (point.x - origin.x) * scale + origin.x;
  point.y = (point.y - origin.y) * scale + origin.y;
};

const p1 = point(400, 400);
const pA = point(p1.x, p1.y * 2);
const pB = point(p1.x * 2, p1.y * 2);

var delta = 50;

// the slider input event should not directly trigger a render
slider.addEventListener("input", (e) => {
  delta = Number(e.target.value);
  redraw = true;               // use a semaphore to indicate content needs to redraw.
});

function update() {  // this is the render loop it only draws when redraw is true
  if (redraw) {        // monitor semaphore
    redraw = false;  // clear semaphore
    ctx.setTransform(1, 0, 0, 1, 0, 0);  // resets transform
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    scaleToFit();
    draw();
  }
  requestAnimationFrame(update);
}

// this was your function init()
function draw() {
  drawLine(p1, pA, "red");
  drawLine(p1, pB, "green");
  drawVBox(pB, delta, p1, "blue");
}


function drawVBox(p, size, vp, col, width) { // p is bottom left vp is vanish point
  ctx.strokeStyle = col;
  ctx.lineWidth = width;
  const p0 = pointCpy(p);           // get corners
  const p1 = pointCpy(p, size);
  const p2 = pointCpy(p, size, -size);
  const p3 = pointCpy(p, 0, -size);
  drawPoly(col, width, p0, p1, p2, p3)

  ctx.beginPath();    // draw vanish lines 
  pathLine(p0, vp);
  pathLine(p1, vp);
  pathLine(p2, vp);
  pathLine(p3, vp);
  ctx.stroke();

  const scale = 1 - size / (800 * 2);
  scalePoint(vp, p0, scale);
  scalePoint(vp, p1, scale);
  scalePoint(vp, p2, scale);
  scalePoint(vp, p3, scale);
  drawPoly(col, width, p0, p1, p2, p3);
}

// Use function to do common tasks and save your self a lot of typing
function drawLine(p1, p2, col, width = 1) {
  ctx.strokeStyle = col;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.lineTo(p1.x, p1.y);  // First point after beginPath can be lineTo
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
function drawPoly(col, width, ...points) {
  ctx.strokeStyle = col;
  ctx.lineWidth = width;
  ctx.beginPath();
  for (const p of points) {
    ctx.lineTo(p.x, p.y);  // First point after beginPath can be lineTo
  }
  ctx.closePath(); // draw closing line
  ctx.stroke();
}
function pathLine(p1, p2) {
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
}