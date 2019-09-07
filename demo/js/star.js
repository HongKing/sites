var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	balls = [],
	nums = 100,
	g = 0.2,
	bounce = -0.5,
	fl = 250; //z轴深度

for (var i = 0; i < nums; i++) {
	var r = 10,
		color = randomColor(),
		ball = new Ball3d(r, color);
	ball.ypos = -100;
	ball.vx = random(-5, 5);
	ball.vy = random(-5, 5);
	ball.vz = random(-5, 5);
	balls.push(ball);
}

function update(b, i) {
	b.vy += g;
	b.xpos += b.vx;
	b.zpos += b.vz;
	b.ypos += b.vy;
	if (b.ypos > H - 100) {
		b.ypos = H - 100;
		b.vy *= bounce;
	}
	var scale = fl / (fl + b.zpos);
	b.scaleX = b.scaleY = scale;
	b.x = b.xpos * scale;
	b.y = b.ypos * scale;
	b.visible = b.zpos > -fl ? true : false;
}

function draw(b, i) {
	if (b.visible) {
		b.draw(ctx);
	}
}

ctx.translate(W / 2, 0);
(function animate() {
	ctx.clearRect(-W / 2, 0, W, H);
	balls.forEach(update);
	balls.sort((a, b) => b.zpos - a.zpos);
	balls.forEach(draw);
	requestAnimationFrame(animate);
})();