var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	points = [];

ctx.strokeStyle = "hsla(200,100%,50%,1)";
ctx.fillStyle = "hsla(200,100%,50%,1)";
for (var i = 0; i < W; i++) {
	points.push({ x: i, y: 300, ang: (i * Math.PI) / 180 });
}
function update() {
	points.forEach((p, i) => {
		p.ang += Math.PI / 40;
		p.y = 300 + Math.sin(p.ang) * 15;
	});
}
function draw() {
	ctx.beginPath();
	points.forEach((p, i) => {
		ctx[i == 0 ? "moveTo" : "lineTo"](p.x, p.y);
	});
	ctx.lineTo(W, H);
	ctx.lineTo(0, H);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}
(function animate() {
	ctx.clearRect(0, 0, W, H);
	update();
	draw();
	requestAnimationFrame(animate);
})();
