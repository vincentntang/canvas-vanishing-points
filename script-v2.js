(function () {
    requestAnimationFrame(update);
    var canvas = document.getElementById("canvas");
    var slider = document.getElementById("slider");
    var ct = canvas.getContext("2d");
    var width = 1600;
    var height = 800;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Scales 2D context to always show ideal resolution area
    var scaleToFit = function () {
        var scale = Math.min(canvas.width / width, canvas.height / height);
        ct.setTransform(scale, 0, 0, scale, 0, 0); // makes canvas fit to screen
    };
    var redraw = true; // When true, scene is redrawn ready for the next display refresh
    // Constructor Function to initialize objects
    var point = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return ({ x: x, y: y });
    };
    var pointCalc = function (p, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return ({ x: p.x + x, y: p.y + y });
    };
    // y = mx + b slope formula for other points
    var scalePoint = function (origin, point, scale) {
        point.x = (point.x - origin.x) * scale + origin.x;
        point.y = (point.y - origin.y) * scale + origin.y;
    };
    // Objects Cartesion Points
    var p1 = point(400, 400);
    ;
    var pA = point(p1.x, p1.y * 2);
    var pB = point(p1.x * 2, p1.y * 2);
    var delta = 50;
    // The slider input event should not directly trigger a render
    slider.addEventListener("input", function (e) {
        delta = Number(e.target.value);
        redraw = true; // uses semaphore (a state variable) to indicate when to redraw
    });
    function update() {
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
    function drawVBox(p, size, vp, col, width) {
        ct.strokeStyle = col;
        ct.lineWidth = width;
        var p0 = pointCalc(p); // get corners
        var p1 = pointCalc(p, size, 0); // bottom right
        var p2 = pointCalc(p, size, -size); // topright
        var p3 = pointCalc(p, 0, -size); // topleft
        drawPoly(col, width, p0, p1, p2, p3); // create frontface from values
        ct.beginPath(); // draw vanish lines
        pathLine(p0, vp); // bottom left
        pathLine(p1, vp); // bottom right
        pathLine(p2, vp); // top right
        pathLine(p3, vp); // top left
        ct.stroke();
        var scale = 1 - size / (800 * 2);
        scalePoint(vp, p0, scale); // uses slope formula to calculate backface points
        scalePoint(vp, p1, scale);
        scalePoint(vp, p2, scale);
        scalePoint(vp, p3, scale);
        drawPoly(col, width, p0, p1, p2, p3); // create backface from values
    }
    // Use function to do common tasks and save yourself lots of typing
    function drawLine(p1, p2, col, width) {
        if (width === void 0) { width = 1; }
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
    function drawPoly(col, width) {
        var points = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            points[_i - 2] = arguments[_i];
        }
        ct.strokeStyle = col;
        ct.lineWidth = width;
        ct.beginPath();
        for (var _a = 0, points_1 = points; _a < points_1.length; _a++) {
            var p = points_1[_a];
            ct.lineTo(p.x, p.y); // lineTo every point
        }
        ct.closePath(); // draw closing line
        ct.stroke();
    }
})();
