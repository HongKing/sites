var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	Radius = 100;

var gradient = ctx.createLinearGradient(-Radius, 0, Radius, 0);
gradient.addColorStop(0, "hsla(210,100%,0%,.3)");
gradient.addColorStop(0.6, "hsla(210,100%,50%,.9)");
gradient.addColorStop(1, "hsla(210,100%,100%,1)");

var rdGradient = ctx.createRadialGradient(0, 10, 0, 0, 10, 30);
rdGradient.addColorStop(0, "hsla(270,100%,50%,.25)");
rdGradient.addColorStop(1, "hsla(270,100%,80%,0)");

ctx.lineWidth = 20;
ctx.lineCap = "round";
ctx.fillStyle = "hsla(0,0%,0%,.1)";
ctx.translate(W / 2, H / 2);

function drawBg() {
	ctx.fillRect(-W / 2, -H / 2, W, H);
}

function updateCircle() {
	ctx.rotate(Math.PI / 90);
}

function drawCircle() {
	ctx.save();
	ctx.strokeStyle = gradient;
	ctx.beginPath();
	ctx.arc(0, 0, Radius, 0, Math.PI, true);
	ctx.stroke();
	ctx.restore();
}
function drawHead() {
	ctx.save();
	//使用径向渐变和阴影创建过渡靓丽特效
	ctx.globalCompositeOperation = "lighter";
	ctx.fillStyle = rdGradient;
	ctx.shadowColor = "hsla(270,100%,70%,.9)";
	ctx.shadowBlur = 20;
	ctx.translate(Radius, 0);
	ctx.beginPath();
	ctx.arc(0, 10, 30, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.restore();
}

(function animate() {
	drawBg();
	updateCircle();
	drawCircle();
	drawHead();
	requestAnimationFrame(animate);
})();
