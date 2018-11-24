var canvas = document.querySelector("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = 1000;
canvas.height = 1000;

var ct = canvas.getContext("2d");

ct.beginPath();
ct.moveTo(500, 500);
ct.lineTo(500, 1000);
ct.stroke();