gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

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
			end: "bottom top",
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
		end: "bottom bottom+=100",
		snap: {
			snapTo: (progress) => {
				return progress < 0.3 ? 0 : 1;
			},
			duration: 0.47,
			ease: "power2.inOut",
		},
	});
});
