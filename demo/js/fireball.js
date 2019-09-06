var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height;

ctx.globalCompositeOperation = "source-over";
ctx.fillStyle = "hsla(0,0%,0%,1)";

class Ball {
	constructor(x, y) {
		this.r = 10;
		this.x = x;
		this.y = y;
		this.vx = 3;
		this.vy = 3;
		this.points = [];
		this.angle = 0;
		this.l = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
		for (var i = 0; i < 100; i++) {
			this.points.push(new Particle(this.l - 1));
		}
	}
	update() {
		if (this.x > W - this.r || this.x < this.r) {
			this.vx = -this.vx;
		}
		this.x += this.vx;
		if (this.y > H - this.r || this.y < this.r) {
			this.vy = -this.vy;
		}
		this.y += this.vy;
		this.angle = -Math.atan2(this.vx, this.vy);
	}
	draw(ctx) {
		var that = this;
		ctx.save();
		ctx.globalCompositeOperation = "lighter";
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		for (var i = 0; i < that.points.length; i++) {
			var p = that.points[i];
			var op = Math.round((p.dead / p.life) * 100) / 100;
			var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
			gradient.addColorStop(0, `hsla(${p.color},90%,75%,${op})`);
			gradient.addColorStop(0.5, `hsla(${p.color},90%,50%,${op})`);
			gradient.addColorStop(1, `hsla(${p.color},90%,30%,0)`);
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
			ctx.fill();
			p.x += p.vx;
			p.y += p.vy;

			p.dead--; //尾焰残留程度
			p.r -= 0.3; //尾焰收缩或扩大的程度
			if (p.dead <= 0 || p.r <= 0) {
				that.points[i] = new Particle(that.l - 1);
			}
		}
		ctx.restore();
	}
}

class Particle {
	constructor(l) {
		this.l = l;
		this.x = 0;
		this.y = 0;
		this.vx = Math.random() * 0.8 - 0.4; //尾焰收缩或扩大的程度
		this.vy = -Math.random() * l - l; //尾焰长度，负数
		this.r = Math.random() * 8 + 8;
		this.life = Math.random() * 15 + 15; //尾焰残留程度
		this.dead = this.life;
		this.color = 30;
	}
}

function drawBG() {
	ctx.fillRect(0, 0, W, H);
}

var ball = new Ball(100, 100);
function animate() {
	drawBG();
	ball.update();
	ball.draw(ctx);
	requestAnimationFrame(animate);
}
animate();