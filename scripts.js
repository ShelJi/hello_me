gsap.registerPlugin(
	ScrollToPlugin,
	ScrollTrigger,
	SplitText
	// Game
);

document.querySelector(".sidebar").addEventListener("click", function (event) {
	const event_clicked = event.target;
	const active = document.querySelector(".active");

	if (event_clicked.classList.contains("sidebar_list")) {
		if (!event_clicked.classList.contains("active")) {
			event.preventDefault();

			const targetElement = document.querySelector(event_clicked.getAttribute("href"));

			gsap.to(window, {
				duration: 1.2,
				scrollTo: {
					y: targetElement,
					offsetY: 100,
				},
				ease: "power2.out",
			});

			active?.classList.remove("active");
			event_clicked.classList.add("active");
		} else {
			event.preventDefault();
			active?.classList.remove("active");

			gsap.to(window, {
				duration: 1.2,
				scrollTo: {
					y: "#profile-wrapper",
					offsetY: 100,
				},
				ease: "power2.out",
			});
		}
	} else {
		event.preventDefault();
		active?.classList.remove("active");

		gsap.to(window, {
			duration: 1.2,
			scrollTo: {
				y: "#profile-wrapper",
				offsetY: 100,
			},
			ease: "power2.out",
		});
	}
});

window.addEventListener("load", async () => {
	await document.fonts.ready;

	const split = new SplitText("#profile", { type: "words" });

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: "#profile",
			start: "top 0%",
			end: "bottom top+=300",
			scrub: true,
			toggleActions: "play reverse play reverse",
			// markers: true,
		},
	});

	tl.to(split.words, {
		y: 80,
		opacity: 0,
		stagger: {
			amount: 1.2,
			from: "end",
			ease: "power3.out",
		},
		ease: "power4.out",
	});
	tl.to(
		".icon",
		{
			y: 100,
			opacity: 0,
			ease: "power3.out",
		},
		0
	);

	ScrollTrigger.create({
		trigger: "#profile",
		start: "top top",
		endTrigger: "#about",
		end: "bottom bottom",
		snap: {
			snapTo: (progress) => {
				return progress < 0.3 ? 0 : 1;
			},
			duration: 0.2,
			ease: "power2.inOut",
		},
	});

	// Project

	// const images = document.querySelectorAll(".carousel-image");
	// const radius = 242;
	// const progress = {
	// 	value: 0,
	// };
	// const carousel = document.querySelector(".carousel");

	// Observer.create({
	// 	target: carousel,
	// 	type: "wheel,pointer",
	// 	onPress: (self) => {
	// 		carousel.style.cursor = "grabbing";
	// 	},
	// 	onRelease: (self) => {
	// 		carousel.style.cursor = "grab";
	// 	},
	// 	onChange: (self) => {
	// 		gsap.killTweensOf(progress);
	// 		const p = self.event.type === "wheel" ? self.deltaY * -0.0005 : self.deltaX * 0.05;
	// 		gsap.to(progress, {
	// 			duration: 2,
	// 			ease: "power4.out",
	// 			value: `+=${p}`,
	// 		});
	// 	},
	// });

	// const animate = () => {
	// 	images.forEach((image, index) => {
	// 		const theta = index / images.length - progress.value;
	// 		const x = -Math.sin(theta * Math.PI * 2) * radius;
	// 		const y = Math.cos(theta * Math.PI * 2) * radius;
	// 		image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta}deg)`;
	// 		const c = Math.floor((index / images.length) * 360);
	// 		image.style.background = `hsla(${c}, 90%, 50%, .5)`;
	// 	});
	// };
	// gsap.ticker.add(animate);

	// Project

	// Game
	const friction = -0.5;

	const ball = document.querySelector(".ball");
	const ballProps = gsap.getProperty(ball);
	const radius_game = ball.getBoundingClientRect().width / 2;
	const tracker = InertiaPlugin.track(ball, "x,y")[0];

	let vw = 500;
	let vh = 500;

	gsap.defaults({
		overwrite: true,
	});

	gsap.set(ball, {
		xPercent: -50,
		yPercent: -50,
		x: vw / 2,
		y: vh / 2,
	});

	const draggable = new Draggable(ball, {
		bounds: window,
		onPress() {
			gsap.killTweensOf(ball);
			this.update();
		},
		onDragEnd: animateBounce,
		onDragEndParams: [],
	});

	// window.addEventListener("resize", () => {
	// 	vw = window.innerWidth;
	// 	vh = window.innerHeight;
	// });

	function animateBounce(x = "+=0", y = "+=0", vx = "auto", vy = "auto") {
		gsap.fromTo(
			ball,
			{ x, y },
			{
				inertia: {
					x: vx,
					y: vy,
				},
				onUpdate: checkBounds,
			}
		);
	}

	function checkBounds() {
		let r = radius_game;
		let x = ballProps("x");
		let y = ballProps("y");
		let vx = tracker.get("x");
		let vy = tracker.get("y");
		let xPos = x;
		let yPos = y;

		let hitting = false;

		if (x + r > vw) {
			xPos = vw - r;
			vx *= friction;
			hitting = true;
		} else if (x - r < 0) {
			xPos = r;
			vx *= friction;
			hitting = true;
		}

		if (y + r > vh) {
			yPos = vh - r;
			vy *= friction;
			hitting = true;
		} else if (y - r < 0) {
			yPos = r;
			vy *= friction;
			hitting = true;
		}

		if (hitting) {
			animateBounce(xPos, yPos, vx, vy);
		}
	}
});
