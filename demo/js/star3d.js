var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	balls = [],
	nums = 300,
	ax = 0,
	ay = 0,
	az = 0,
	vx = 0,
	vy = 0,
	vz = 0.5,
	g = 0.2,
	friction = 0.98,
	fl = 200; //z轴深度

for (var i = 0; i < nums; i++) {
	var r = random(10, 20),
		color = randomHsl(),
		gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
	gradient.addColorStop(0, `hsl(${color[0]},100%,100%)`);
	gradient.addColorStop(0.4, `hsl(${color[0]},100%,90%)`);
	gradient.addColorStop(1, `hsl(${color[0]},100%,60%)`);

	var ball = new Ball3d(r, gradient);
	ball.xpos = random(-1500, 1500);
	ball.ypos = random(-500, 500);
	ball.zpos = random(0, 10000);
	balls.push(ball);
}

function update(b, i) {
	vy -= g;
	vx += ax;
	vy += ay;
	vz += az;

	b.xpos += vx;
	b.ypos += vy;
	b.zpos += vz;

	vx *= friction; //乘缓动因子，防止加速度后过快或过慢
	vy *= friction;
	vz *= friction;

	if (b.zpos < -fl) {
		//超过焦距后，再放回无限远处
		b.zpos += 10000;
	}
	if (b.zpos > 10000 - fl) {
		b.zpos -= 10000;
	}
	if (b.ypos < -500) {
		b.ypos = 500;
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

document.addEventListener(
	"keydown",
	function(e) {
		switch (e.keyCode) {
			case 38: //up
				az = -1;
				break;
			case 40: //down
				az = 1;
				break;
			case 37: //left
				ax = 1;
				break;
			case 39: //right
				ax = -1;
				break;
			case 32: //space
				ay = 1;
				break;
		}
	},
	false
);
document.addEventListener(
	"keyup",
	function(e) {
		switch (e.keyCode) {
			case 38: //up
			case 40: //down
				az = 0;
				break;
			case 37: //left
			case 39: //right
				ax = 0;
				break;
			case 32: //space
				ay = 0;
				break;
		}
	},
	false
);

ctx.translate(W / 2, H / 2);
// ctx.globalCompositeOperation = "lighter";
(function animate() {
	ctx.clearRect(-W / 2, -H / 2, W, H);
	balls.forEach(update);
	balls.sort((a, b) => b.zpos - a.zpos);
	balls.forEach(draw);
	requestAnimationFrame(animate);
})();
