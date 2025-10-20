const mediaQuery = window.matchMedia("(max-width: 992px)");

const button = document.getElementById("toggleThemeButton");
function toggleTheme() {
	button.toggleAttribute("checked");

	if (document.body.getAttribute("data-theme") === "dark") {
		document.body.removeAttribute("data-theme");
	} else {
		document.body.setAttribute("data-theme", "dark");
	}
}

////////////////////////////////////////////

const lenis = new Lenis();

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelector(".sidebar").addEventListener("click", function (event) {
	// if (mediaQuery.matches) {
	// 	navClose();
	// }
	const event_clicked = event.target;
	const active = document.querySelector(".active");

	if (event_clicked.classList.contains("sidebar_list")) {
		if (!event_clicked.classList.contains("active")) {
			event.preventDefault();
			lenis.scrollTo(document.querySelector(event_clicked.getAttribute("href")), {offset: -100});
			active?.classList.remove("active");
			event_clicked.classList.add("active");
		} else {
			event.preventDefault();
			active?.classList.remove("active");
			lenis.scrollTo("#profile");
		}
	} else {
		event.preventDefault();
		active?.classList.remove("active");
		lenis.scrollTo("#profile");
	}
});

// Responsive content
// document.getElementById("navIcoContainer").addEventListener("click", () => navOpen());

// function navOpen() {
// 	document.getElementsByClassName("sidebar")[0].style.display = "block";
// 	document.getElementsByClassName("nav-ico-container")[0].style.display = "none";
// 	// document.getElementById("switch").style.display = "block";
// }

// function navClose() {
// 	document.getElementsByClassName("sidebar")[0].style.display = "none";
// 	document.getElementsByClassName("nav-ico-container")[0].style.display = "block";
// 	// document.getElementById("switch").style.display = "none";
// }
