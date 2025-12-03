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

	gsap.registerPlugin(SplitText, ScrollTrigger);

	/* -------------------------------------
	   PROFILE SECTION (Scroll animation)
	------------------------------------- */
	const profileSplit = new SplitText("#anim-split-word", { type: "words" });

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: "#profile",
			start: "top 0%",
			end: "bottom top+=300",
			scrub: true,
		},
	});

	tl.to(profileSplit.words, {
		y: 80,
		opacity: 0,
		stagger: {
			amount: 1.2,
			from: "end",
			ease: "power3.out",
		},
		ease: "power4.out",
	})
		.to(
			".icon",
			{
				y: 100,
				opacity: 0,
				ease: "power3.out",
			},
			0
		)
		.to(".name", {
			opacity: 0,
		});

	/* -------------------------------------
	   SNAP SCROLL (Profile → About)
	------------------------------------- */
	ScrollTrigger.create({
		trigger: "#profile",
		start: "top top",
		endTrigger: "#about",
		end: "top top+=100",
		scrub: true,
		snap: {
			snapTo: (p) => (p < 0.3 ? 0 : 1),
			duration: 0.2,
			ease: "power2.inOut",
		},
	});

	/* -------------------------------------
	   SPLIT TEXT (Reveal on scroll)
	------------------------------------- */

	gsap.set(".split", { opacity: 1 });

	const revealSplit = new SplitText(".split", {
		type: "words,lines",
		linesClass: "line",
		autoSplit: true,
		mask: "lines",
	});

	gsap.from(revealSplit.lines, {
		duration: 0.6,
		yPercent: 100,
		opacity: 0,
		stagger: 0.1,
		ease: "expo.out",
		scrollTrigger: {
			trigger: ".split",
			start: "top 80%",
			once: false,
		},
	});

	/* -------------------------------------
	   OPTIONAL: PROJECT CAROUSEL (Disabled)
	   (Uncomment if needed)
	------------------------------------- */

	const images = document.querySelectorAll(".carousel-image");
	const radius = 242;
	const progress = { value: 0 };
	const carousel = document.querySelector(".carousel");

	Observer.create({
		target: carousel,
		type: "wheel,pointer",
		onPress: () => (carousel.style.cursor = "grabbing"),
		onRelease: () => (carousel.style.cursor = "grab"),
		onChange: (self) => {
			gsap.killTweensOf(progress);
			const p =
				self.event.type === "wheel"
					? self.deltaY * -0.0005
					: self.deltaX * 0.05;
			gsap.to(progress, {
				duration: 2,
				ease: "power4.out",
				value: `+=${p}`,
			});
		},
	});

	const animate = () => {
		images.forEach((image, index) => {
			const theta = index / images.length - progress.value;
			const x = -Math.sin(theta * Math.PI * 2) * radius;
			const y = Math.cos(theta * Math.PI * 2) * radius;
			image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
				360 * -theta
			}deg)`;
		});
	};

	gsap.ticker.add(animate);
});
if (window.innerWidth <= 768) {
	document.querySelectorAll("#break-span").forEach((el) => {
		el.outerHTML = "<br>";
	});
}
const game = document.querySelector("#game");
const helper = document.querySelector("#game-helper");

if (game.getBoundingClientRect().width <= 650) {
	helper.style.display = "none";
}
