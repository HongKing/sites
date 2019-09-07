var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	mouse = captureMouse(canvas);
(balls = []), (nums = 50), (fl = 300); //z轴深度
// ctx.globalCompositeOperation = "source-over";
// ctx.fillStyle='hsla(0,0%,30%,0.5)'
ctx.strokeStyle = "#fff";
ctx.lineWidth = 1;
// ctx.translate(2/W,2/H);
for (var i = 0; i < nums; i++) {
	var r = random(5, 10),
		color = randomColor(),
		ball = new Ball3d(r, color);
	ball.xpos = random(-300, 300);
	ball.ypos = random(-300, 300);
	ball.zpos = random(-300, 300);
	balls.push(ball);
}
function RotateX(ball, angle) {
	var pos = rotateX({ y: ball.ypos, z: ball.zpos }, angle);
	ball.ypos = pos.y;
	ball.zpos = pos.z;
}
function RotateY(ball, angle) {
	var pos = rotateY({ x: ball.xpos, z: ball.zpos }, angle);
	ball.xpos = pos.x;
	ball.zpos = pos.z;
}

function rotateZ(ball, angle) {
	var pos = rotateZ({ x: ball.xpos, y: ball.ypos }, angle);
	ball.xpos = pos.x;
	ball.ypos = pos.y;
}

function update(ball, i) {
	var angleX = (mouse.x - W / 2) * 0.0001;
	var angleY = (mouse.y - H / 2) * 0.0001;
	RotateX(ball, angleY);
	RotateY(ball, angleX);
	// rotateZ(ball);
}
function draw(ball, i) {
	if (ball.zpos > -fl) {
		var scale = (fl + ball.zpos) / fl;
		ball.scaleX = scale;
		ball.scaleY = scale;
		ball.x = W / 2 + ball.xpos;
		ball.y = H / 2 + ball.ypos;
		ball.visible = true;
	} else {
		ball.visible = false;
	}
	if (ball.visible) {
		ball.draw(ctx);
	}
}

(function animate() {
	ctx.clearRect(0, 0, W, H);
	balls.forEach(update);
	balls.sort((a, b) => a.zpos - b.zpos);
	balls.forEach(draw);
	requestAnimationFrame(animate);
})();
