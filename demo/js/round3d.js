var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	Nums = 150,
	mouse = captureMouse(canvas),
	Z = 400,
	R = 200,
	Balls = [],
	W = canvas.width,
	H = canvas.height;

ctx.fillStyle = "hsla(0,100%,5%,1)";
ctx.translate(W / 2, H / 2);

for (var i = 0; i < Nums; i++) {
	var k = -1 + (2 * (i + 1) - 1) / Nums;
	var a = Math.acos(k);
	var b = a * Math.sqrt(Nums * Math.PI);
	// var a = Math.random()*2*Math.PI;
	// var b = Math.random()*2*Math.PI;
	var ball = new Ball3d(5, randomColor());
	ball.xpos = R * Math.sin(a) * Math.cos(b);
	ball.ypos = R * Math.sin(a) * Math.sin(b);
	ball.zpos = R * Math.cos(a);
	Balls.push(ball);
}
function update(b, i) {
	var angleX = (mouse.y - H / 2) * 0.0001;
	var angleY = (mouse.x - W / 2) * 0.0001;

	var posX = rotateX({ y: b.ypos, z: b.zpos }, angleX);
	b.ypos = posX.y;
	b.zpos = posX.z;
	var posY = rotateY({ x: b.xpos, z: b.zpos }, angleY);
	b.xpos = posY.x;
	b.zpos = posY.z;
	var scale = Z / (b.zpos + Z);
	b.scaleX = b.scaleY = scale;
	b.x = b.xpos * scale;
	b.y = b.ypos * scale;
}

function draw(b, i) {
	b.draw(ctx);
}

(function animate() {
	ctx.fillRect(-W / 2, -H / 2, W, H);
	Balls.forEach(update);
	Balls.sort((a, b) => b.zpos - a.zpos);
	ctx.save();
	// ctx.globalCompositeOperation='lighter';
	Balls.forEach(draw);
	ctx.restore();
	requestAnimationFrame(animate);
})();
