var canvas = document.getElementById("canvas");
(ctx = canvas.getContext("2d")),
	(W = canvas.width),
	(H = canvas.height),
	(particles = []),
	(nums = 200);

class Particle {
	constructor() {
		this.loc = { x: W / 2, y: H / 2 + 50 };
		this.speed = {
			x: Math.random() * 0.6 - 0.3,
			y: -15 + Math.random() * 10
		};
		this.radius = 10 + Math.random() * 10;
		this.life = 10 + Math.random() * 10;
		this.remaining_life = this.life;
		this.color = 30;
	}
}

for (var i = 0; i < nums; i++) {
	particles.push(new Particle());
}

function draw() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, W, H);
	ctx.globalCompositeOperation = "lighter";

	for (var i = 0; i < particles.length; i++) {
		var p = particles[i];
		ctx.beginPath();
		p.opacity = Math.round((p.remaining_life / p.life) * 100) / 100;
		var gradient = ctx.createRadialGradient(
			p.loc.x,
			p.loc.y,
			0,
			p.loc.x,
			p.loc.y,
			p.radius
		);
		gradient.addColorStop(0, `hsla(${p.color},100%,70%,${p.opacity})`);
		gradient.addColorStop(0.5, `hsla(${p.color},100%,50%,${p.opacity})`);
		gradient.addColorStop(1, `hsla(${p.color},100%,30%,0)`);

		ctx.fillStyle = gradient;
		ctx.arc(p.loc.x, p.loc.y, p.radius, 0, Math.PI * 2, false);
		ctx.fill();

		p.remaining_life--;
		p.radius -= 0.5; //尾焰变小
		// p.radius++;//尾焰变大
		p.loc.x += p.speed.x;
		p.loc.y += p.speed.y;

		if (p.remaining_life < 0 || p.radius < 0) {
			particles[i] = new Particle();
		}
	}
}

(function animate() {
	draw();
	requestAnimationFrame(animate);
})();