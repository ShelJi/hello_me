(() => {
	const container = document.querySelector(".github-contrib-scroll");
	const image = container?.querySelector("img");
	if (!container || !image) return;

	let followLatest = true;
	const showLatest = () => {
		if (followLatest) container.scrollLeft = container.scrollWidth;
	};

	container.addEventListener("scroll", () => {
		followLatest = container.scrollWidth - container.clientWidth - container.scrollLeft < 2;
	}, { passive: true });
	image.addEventListener("load", showLatest);
	new ResizeObserver(showLatest).observe(container);
	showLatest();
})();
