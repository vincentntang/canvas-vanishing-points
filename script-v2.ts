(() => {

  requestAnimationFrame(update);

  var canvas = document.querySelector("canvas");
  var slider = document.querySelector("slider");
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
  // slider1.addEventListener("input", (e) => {

  // })

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
    ct.lineWidth = width;
    const p0 = pointCalc(p); // get corners
    const p1 = pointCalc(p, size, 0); // bottom right
    const p2 = pointCalc(p, size, -size); // topright
    const p3 = pointCalc(p, 0, -size); // topleft
    drawPoly(col, width, p0, p1, p2, p3); // create frontface from values

    ct.beginPath(); // draw vanish lines
    pathLine(p0, vp); // bottom left
    pathLine(p1, vp); // bottom right
    pathLine(p2, vp); // top right
    pathLine(p3, vp); // top left
    ct.stroke();

    const scale = 1 - size / (800 * 2);
    scalePoint(vp, p0, scale); // uses slope formula to calculate backface points
    scalePoint(vp, p1, scale);
    scalePoint(vp, p2, scale);
    scalePoint(vp, p3, scale);
    drawPoly(col, width, p0, p1, p2, p3); // create backface from values
  }

  // Use function to do common tasks and save yourself lots of typing
  function drawLine(p1, p2, col, width = 1) {
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
    ct.beginPath();
    for (const p of points) {
      ct.lineTo(p.x, p.y); // lineTo every point
    }
    ct.closePath(); // draw closing line
    ct.stroke();
  }
  /* */
})()