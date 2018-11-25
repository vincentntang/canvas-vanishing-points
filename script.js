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
var size = 100;

function init() {
  console.log(size, "size");
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
  drawHouse(x0b, y0b, size, 'red');
}

function shadeColor() {

}

function drawHouse(startX, startY, size, color) {
  // House based on second Line

  // Formula slopes
  // m = (y1 - y0)/(x1 - x0)
  // y1 = mx1 - mx0 + y0

  // Line distance Formula
  // d = sqrt((x1-x0)^2 + (y1-y0)^2)

  // Pythagoreans Theorm
  // c^2 = a^2 + b^2

  // Height of a 45* triangle
  // Area = 1/2*base*height
  // height = size variable

  // Go here "\"
  // Nomenclature
  // a1,b1 = one coordinate pair
  // a2,b2 = another coordinate pair
  // go counter clockwise on the points

  // calculate same sized lined box

  // Calculate the 2nd point on vanishing line
  let a1 = startX - size / 1.9; // ~45* angle approximation to make sure all lengths of square are same size. Use line distance / pythagoreans theorm for accuracy
  let b1 = slope_b * (a1 - x0) + y0

  // Side Face
  ct.beginPath();
  ct.moveTo(startX, startY);
  ct.lineTo(a1, b1);
  ct.lineTo(a1, b1 - size);
  ct.lineTo(startX, startY - size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'red';
  ct.stroke();
  ct.fill();

  // Front Face
  ct.beginPath();
  ct.moveTo(startX, startY);
  ct.lineTo(startX + size, startY);
  ct.lineTo(startX + size, startY - size);
  ct.lineTo(startX, startY - size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'lightblue';
  ct.stroke();
  ct.fill();

  // Top Face - Not necessary but whatever
  ct.beginPath();
  ct.moveTo(startX, startY - size);
  ct.lineTo(a1, b1 - size);
  ct.lineTo(a1 + size, b1 - size);
  ct.lineTo(startX + size, startY - size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'lightgreen';
  ct.stroke();
  ct.fill();

  // Draw Roof Back Face - Not necessary but whatever
  ct.beginPath();
  ct.moveTo(a1, b1 - size);
  ct.lineTo(a1 + size / 2, b1 - 2 * size);
  ct.lineTo(a1 + size, b1 - size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'pink';
  ct.stroke();
  ct.fill();

  // Draw a Roof Front Face
  ct.beginPath();
  ct.moveTo(startX, startY - size);
  ct.lineTo(startX + size / 2, startY - 2 * size);
  ct.lineTo(startX + size, startY - size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'pink';
  ct.stroke();
  ct.fill();

  // Shade frontside
  ct.beginPath();
  ct.moveTo(startX, startY - size);
  ct.lineTo(a1, b1 - size);
  ct.lineTo(a1 + size / 2, b1 - 2 * size);
  ct.lineTo(startX + size / 2, startY - 2 * size);
  ct.closePath();
  ct.strokeStyle = 'purple';
  ct.fillStyle = 'lightblue';
  ct.stroke();
  ct.fill();

}


init();

var slider = document.getElementById("myRange");

slider.oninput = function () {
  ct.clearRect(0, 0, canvas.width, canvas.height); // reset lines
  size = +this.value; // convert the slider value to a number for type coersion (see stackoverflow)
  requestAnimationFrame(init()); // redraw everything
}