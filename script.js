var canvas = document.querySelector("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = 800;
canvas.height = 800;

var ct = canvas.getContext("2d");

// TODO
// 1. Make a center point
// 2. Draw lines jutting from center
// 3. Draw a line parallel to canvas bottom
// 4. Draw an adjoining item upward


function init() {
  // First Line
  ct.beginPath();
  ct.moveTo(400, 400);
  ct.lineTo(800, 800);
  ct.stroke();

  // Second Line
  ct.beginPath();
  ct.moveTo(400, 400);
  ct.lineTo(0, 800);
  ct.stroke();

  // Make a house
  ct.beginPath();
  ct.moveTo
}

init();

