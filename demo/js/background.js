var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = document.documentElement.clientWidth || document.body.clientWidth,
	H = document.documentElement.clientHeight || document.body.clientHeight,
	points = [],
	Max = 80, //点连接的距离
	Num = 200; //点的数量

canvas.width = W;
canvas.height = H;
ctx.lineWidth = 0.5;
ctx.fillStyle = "#333";
ctx.strokeStyle = "#999";
class Point {
	constructor(x, y, vx, vy) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
	}
	update() {
		if (this.x <= 0 || this.x >= W) {
			this.vx = -this.vx;
		}
		if (this.y <= 0 || this.y >= H) {
			this.vy = -this.vy;
		}
		this.x += this.vx;
		this.y += this.vy;
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
		ctx.fill();
	}
}

for (var i = 0; i < Num; i++) {
	var x = Math.round(Math.random() * W),
		y = Math.round(Math.random() * H),
		vx = Math.floor((Math.random() * 2 - 1) * 100) / 100,
		vy = Math.floor((Math.random() * 2.4 - 1.2) * 100) / 100;
	points.push(new Point(x, y, vx, vy));
	console.log(x, y, vx, vy);
}

function animate() {
	function start() {
		ctx.clearRect(0, 0, W, H);
		var point = null,
			c = 0,
			ratio = 1;
		points.forEach((item, j) => {
			item.update();
			item.draw(ctx);
			for (var i = j + 1, len = points.length; i < len; i++) {
				point = points[i];
				c = Math.sqrt(
					Math.pow(point.x - item.x, 2) +
						Math.pow(point.y - item.y, 2)
				);
				if ((ratio = c / Max) > 1) continue;
				ctx.lineWidth = ratio / 2;
				ctx.strokeStyle = "rgba(0,0,0," + (1 - ratio) * 3 + ")";
				ctx.beginPath();
				ctx.moveTo(item.x, item.y);
				ctx.lineTo(point.x, point.y);
				ctx.stroke();
			}
		});
		requestAnimationFrame(start);
	}
	start();
}
canvas.onmousemove = function(e) {
	points.length = Num;
	points.push(new Point(e.clientX, e.clientY, 0, 0));
};
animate();
