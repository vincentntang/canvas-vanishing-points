// for reference https://codepen.io/AshKyd/pen/JYXEpL, html5 canvas isometric cube

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.width = 1600;
canvas.height = 800;

var ct = canvas.getContext("2d");

// TODO
// 1. Make a center point
// 2. Draw lines jutting from center
// 3. Draw a line parallel to canvas bottom
// 4. Draw an adjoining item upward

// x, y
// right, down

// Nomenclature
// x0a
// coordinate type, vanishingPt#, endPtName

// Vanishing point 0
var x0 = 400;
var y0 = 400;

// Vanishing point end 0a
var x0a = 0;
var y0a = 2 * y0;

// Vanishing point end 0b
var x0b = 2 * x0;
var y0b = 2 * y0;
var slope_b = x0b / y0b;

// Define delta
var delta = 100;

function init() {
  console.log(delta, "delta");
  console.log(x0b, "x0b");
  console.log(y0b, "y0b");
  console.log(x0, "x0");
  console.log(y0, "y0");
  // First Line
  ct.beginPath();
  ct.moveTo(x0, y0);
  ct.lineTo(x0a, y0a);
  ct.strokeStyle = 'red';
  ct.stroke();

  // // Second Line
  ct.beginPath();
  ct.moveTo(x0, y0);
  ct.lineTo(x0b, x0b);
  ct.strokeStyle = 'green';
  ct.stroke();

  // Draw a bunch of houses
  drawHouse(x0b, y0b);
}

function drawHouse(startX, startY) {
  // House based on second Line

  // Formula slopes
  // m = (y1 - y0)/(x1 - x0)

  // Line distance Formula
  // d = sqrt((x1-x0)^2 + (y1-y0)^2)

  // Go here "\"
  // Nomenclature
  // a1,b1 = one coordinate pair
  // a2,b2 = another coordinate pair
  // go counter clockwise on the points

  // calculate same sized lined box
  let a1 = startX - 100;
  let b1 = slope_b * (a1 - x0) + y0
  ct.beginPath();
  ct.moveTo(startX, startY);
  ct.lineTo(a1, b1);
  ct.lineTo(a1, b1 - delta);
  ct.lineTo(startX, startY - delta);
  ct.lineTo(startX, startY);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'red';
  ct.stroke();
  ct.fill();

  // ct.moveTo(startX, startY); // starting point
  // ct.lineTo(startX + delta, startY); // right x+100
  // ct.lineTo(startX + delta, startY - delta); // up y-100
  // ct.lineTo(startX, startY - delta); // left x-100
  // ct.lineTo(startX, startY); // down y+100
  // ct.lineTo(startX, startY - delta); // back up y-100
  // //calculate
  // ct.lineTo(x0, y0);
  // ct.lineTo(x0b + delta, y0b - delta);
  // ct.strokeStyle = 'blue';
  // ct.fillStyle
  // ct.stroke();

  // // Test
  // ct.fillRect(x0b, y0b, 500, 500);
}


init();

var slider = document.getElementById("myRange");

slider.oninput = function () {
  ct.clearRect(0, 0, canvas.width, canvas.height); // reset lines
  delta = +this.value; // convert the slider value to a number for type coersion (see stackoverflow)
  requestAnimationFrame(init()); // redraw everything
}