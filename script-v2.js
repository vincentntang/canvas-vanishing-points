requestAnimationFrame(update);

const ct = canvas.getContext("2d");
const width = 1600;
const height = 800;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Scales 2D context to always show ideal resolution area
const scaleToFit = () => {
  var scale = Math.min(canvas.width / width, canvas.height / height);
  ct.setTransform(scale, 0, 0, scale, 0, 0);
}

