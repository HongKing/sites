var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	imgCanvas,
	imgCtx,
	points = [],
	W = canvas.width,
	H = canvas.height,
	img = new Image();

ctx.fillStyle = "hsla(0,0%,0%,0.1)";
class Particle {
	constructor(x, y, color, duration) {
		this.x = x;
		this.y = y;
		this.sx = x;
		this.sy = y;
		this.dx = x;
		this.dy = y;
		this.color = `rgba(${color.r},${color.g},${color.b},${color.a})`;
		this.time = new Date();
		this.duration = duration;
		this.step = 0;
	}
	update() {
		if (new Date() - this.time > this.duration) {
			if (this.step > 0) return;
			this.step++;
			this.time = new Date();
		}
		if (this.step == 0) {
			this.x = Tween.Expo.easeInOut(
				new Date() - this.time,
				this.sx,
				this.dx - this.sx,
				this.duration
			);
			this.y = Tween.Expo.easeInOut(
				new Date() - this.time,
				this.sy,
				this.dy - this.sy,
				this.duration
			);
		} else {
			this.x = Tween.Back.easeInOut(
				new Date() - this.time,
				this.dx,
				this.sx - this.dx,
				this.duration
			);
			this.y = Tween.Back.easeInOut(
				new Date() - this.time,
				this.dy,
				this.sy - this.dy,
				this.duration
			);
		}
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
		ctx.fill();
	}
}
img.src = "../img/love.png";
img.onload = function() {
	(imgCanvas = document.createElement("canvas")),
		(imgCtx = imgCanvas.getContext("2d"));
	imgCanvas.width = 80;
	imgCanvas.height = 80;
	imgCtx.drawImage(img, 0, 0);
	// var dataUrl = imgCanvas.toDataURL('image/jpeg');
	getImgDate();
	animate();
};

function getImgDate() {
	var imgData = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
	for (var i = 0, len = imgData.data.length; i < len; i += 4) {
		if (imgData.data[i + 3] < 128) continue;
		var x = Math.floor((i / 4) % imgCanvas.width),
			y = Math.floor(i / 4 / imgCanvas.width),
			color = {
				r: imgData.data[i],
				g: imgData.data[i + 1],
				b: imgData.data[i + 2],
				a: imgData.data[i + 3]
			};

		var x1 = (W - imgCanvas.width) / 2 + x,
			y1 = (H - imgCanvas.height) / 2 + y,
			point = new Particle(x1, y1, color, 2000);

		point.dx = random(0, W);
		point.dy = random(0, H);
		points.push(point);
	}
}

function animate() {
	var lastPoint = points.slice(-1)[0];
	if (
		lastPoint.step > 0 &&
		new Date() - lastPoint.time > lastPoint.duration
	) {
		return;
	}
	ctx.fillRect(0, 0, W, H);
	ctx.save();
	// ctx.globalCompositeOperation='lighter';
	points.forEach((p, i) => {
		p.update();
		p.draw(ctx);
	});
	ctx.restore();
	requestAnimationFrame(animate);
}
document.getElementsByTagName("button")[0].onclick = function() {
	points.forEach(p => {
		p.x = p.sx;
		p.y = p.sy;
		p.time = new Date();
	});
	animate();
};
