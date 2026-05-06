
// Grid canvas

const gridcanvas = document.getElementById("gridcanvas");
const ctx = gridcanvas.getContext("2d");

gridcanvas.width = gridcanvas.offsetWidth;
gridcanvas.height = gridcanvas.offsetHeight;

const mouse = {
	x: null,
	y: null
};

window.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener("mouseleave", () => {
	mouse.x = null;
	mouse.y = null;
});

const spacing = 40;
const baseRadius = 1;
const maxRadius = 15;
const influenceRadius = 120;

function drawGrid() {
	ctx.clearRect(0, 0, gridcanvas.width, gridcanvas.height);

	for (let x = 0; x < gridcanvas.width; x += spacing) {
		for (let y = 0; y < gridcanvas.height; y += spacing) {

			let radius = baseRadius;

			if (mouse.x !== null && mouse.y !== null) {
				const dx = mouse.x - x;
				const dy = mouse.y - y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < influenceRadius) {
					const effect = 1 - (distance / influenceRadius);
					radius = baseRadius + effect * (maxRadius - baseRadius);
				}
			}

			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			// ctx.fillStyle = "#ffffff";
			// ctx.fill();
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 1;
			ctx.stroke();
		}
	}

	requestAnimationFrame(drawGrid);
}

drawGrid();

window.addEventListener("resize", () => {
	gridcanvas.width = window.innerWidth;
	gridcanvas.height = window.innerHeight;
});





// 3D card

const card = document.getElementById('card');
const inner = document.getElementById('inner');
const glare = document.getElementById('glare');
const edge = document.getElementById('edge');

let tx = 0, ty = 0;
let cx = 0, cy = 0;

card.addEventListener('mousemove', (e) => {
	const r = card.getBoundingClientRect();

	const x = (e.clientX - r.left) / r.width - 0.5;
	const y = (e.clientY - r.top) / r.height - 0.5;

	tx = x * 25;
	ty = y * 25;

	// GLARE
	glare.style.opacity = '1';
	glare.style.background = `
		radial-gradient(
			circle at ${(x + 0.5)*100}% ${(y + 0.5)*100}%,
			rgba(255,255,255,0.3),
			transparent 50%
		)
	`;

	// EDGE LIGHT
	edge.style.opacity = '1';
	edge.style.background = `
		linear-gradient(
			${x * 180}deg,
			transparent,
			rgba(255,255,255,0.25),
			transparent
		)
	`;
});

card.addEventListener('mouseleave', () => {
	tx = 0;
	ty = 0;
	glare.style.opacity = '0';
	edge.style.opacity = '0';
});

function animate() {
	cx += (tx - cx) * 0.08;
	cy += (ty - cy) * 0.08;

	inner.style.transform = `
		rotateX(${-cy}deg)
		rotateY(${cx}deg)
		scale(1.06)
	`;

	inner.style.boxShadow = `
		${-cx * 2}px ${cy * 2}px 50px rgba(0,0,0,0.6)
	`;

	requestAnimationFrame(animate);
}

animate();


// who I am
const abeWord = document.getElementById('abe_word');

abeWord.addEventListener('mouseenter', () => {
	Object.assign(card.style, {
		visibility: 'visible',
		opacity: '1'
	});
	abeWord.classList.add("active");
});
card.addEventListener('mouseleave', () => {
	Object.assign(card.style, {
		visibility: 'hidden',
		opacity: '0'
	});
	abeWord.classList.remove("active");
});
document.addEventListener('click', (event) => {
	if (!card.contains(event.target)) {
			Object.assign(card.style, {
					visibility: 'hidden',
					opacity: '0'
			});
			abeWord.classList.remove("active");
	}
});
abeWord.addEventListener('click', (event) => {
	event.stopPropagation();
	Object.assign(card.style, {
		visibility: 'visible',
		opacity: '1'
	});
	abeWord.classList.add("active");
});





// cursor
// const area = document.getElementById("area");
// const box = document.getElementById("box");

// area.addEventListener("mousemove", (e) => {
//   const rect = area.getBoundingClientRect();

//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;
 
//   // box.style.left = x + "px";
//   // box.style.top = y + "px";

// 	const sizeX = 80;
// 	const sizeY = 20;

// 	box.style.left = (x - sizeX / 2) + "px";
// 	box.style.top = (y - sizeY * 2) + "px";
// });

// area.addEventListener("mouseenter", () => {
//   box.style.display = "block";
// });

// area.addEventListener("mouseleave", () => {
//   box.style.display = "none";
// });



// infos
const areasInfo = document.querySelectorAll(".areainfo");

areasInfo.forEach((area) => {
	const info = area.querySelector(".info");

	let mouseX = 0;
	let mouseY = 0;

	let currentX = 0;
	let currentY = 0;

	const speed = 0.05;
	const sizeX = 160;
	const sizeY = 48;

	area.addEventListener("mousemove", (e) => {
		const rect = area.getBoundingClientRect();

		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	});

	function animateInfo() {
		currentX += (mouseX - currentX) * speed;
		currentY += (mouseY - currentY) * speed;

		info.style.left = (currentX - sizeX / 2) + "px";
		info.style.top = (currentY - sizeY * 1.5) + "px";

		requestAnimationFrame(animateInfo);
	}

	animateInfo();

	area.addEventListener("mouseenter", () => {
		info.style.opacity = "1";
	});

	area.addEventListener("mouseleave", () => {
		info.style.opacity = "0";
	});

});






// services

const servicecard = document.querySelectorAll(".servicecard");

servicecard.forEach((card) => {
	const inner = card.querySelector(".serviceinner");

	card.addEventListener("mousemove", (e) => {
		const rect = card.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = -(y - centerY) / 10;
		const rotateY = (x - centerX) / 10;

		inner.style.transform = `
			rotateX(${rotateX}deg)
			rotateY(${rotateY}deg)
			scale(1.05)
		`;
	});

	card.addEventListener("mouseleave", () => {
		inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
	});
});



