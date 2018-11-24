var canvas = document.querySelector("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = 1000;
canvas.height = 1000;

var ct = canvas.getContext("2d");

// TODO
// 1. Make a center point
// 2. Draw lines jutting from center
// 3. Draw a line parallel to canvas bottom
// 4. Draw an adjoining item upward


function init() {
  // First Line
  ct.beginPath();
  ct.moveTo(500, 0);
  ct.lineTo(1000, 1000);
  ct.stroke();

  // Second Line
  ct.beginPath();
  ct.moveTo(500, 0);
  ct.lineTo(0, 1000);
  ct.stroke();

}

init();

