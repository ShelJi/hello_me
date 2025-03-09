particlesJS("particles-js", {
	particles: {
		number: {
			// value: 20,
			value: 70,
			density: {
				enable: true,
				// value_area: 1400,
				value_area: 500,
			},
		},
		color: {
			value: "#7556cc",
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0,
				color: "#ffffff",
			},
			polygon: {
				nb_sides: 6,
			},
			image: {
				src: "img/github.svg",
				width: 100,
				height: 100,
			},
		},
		opacity: {
			value: 0.25,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0.1,
				sync: false,
			},
		},
		size: {
			value: 25,
			random: true,
			anim: {
				enable: true,
				speed: 10,
				size_min: 0.1,
				sync: false,
			},
		},
		line_linked: {
			enable: false,
			distance: 500,
			color: "#ffffff",
			opacity: 0.4,
			width: 2,
		},
		move: {
			enable: true,
			speed: 2,
			direction: "bottom-left",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "window",
		events: {
			onhover: {
				enable: true,
				mode: "bubble",
			},
			onclick: {
				enable: false,
				mode: "push",
			},
			resize: true,
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 0.5,
				},
			},
			bubble: {
				distance: 215,
				size: 4,
				duration: 0.3,
				opacity: 1,
				speed: 3,
			},
			repulse: {
				distance: 135,
				duration: 0.4,
			},
			push: {
				particles_nb: 4,
			},
			remove: {
				particles_nb: 2,
			},
		},
	},
	retina_detect: true,
});
