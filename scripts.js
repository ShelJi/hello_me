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

// // Initialize Lenis
// const lenis = new Lenis({
//   autoRaf: true,
// });

// // Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   console.log(e);
// });

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//////////////////////////////////////////// 

// content handling to view
const content_profile = document.getElementById("profile").classList;

function active_remove() {
	if (document.querySelector(".active")) {
		document.querySelector(".active").classList.remove("active");

		Array.from(document.getElementById("content").children).forEach((element) => {
			if (!element.classList.contains("display_none")) {
				element.classList.add("display_none");
			}
		});

		if (content_profile.contains("display_none")) {
			content_profile.remove("display_none");
		}
	}
}

document.querySelector(".sidebar").addEventListener("click", function (event) {
	if (mediaQuery.matches) {
		navClose();
	}
	const event_clicked = event.target;

	if (event_clicked.classList.contains("sidebar_list")) {
		if (!event_clicked.classList.contains("active")) {
			active_remove();
			event_clicked.classList.add("active");
			content_profile.add("display_none");

			const targetId = event_clicked.getAttribute("data-target");

			if (targetId) {
				const targetContent = document.querySelector(targetId);

				if (targetContent) {
					targetContent.classList.remove("display_none");
				}
			}
		} else {
			active_remove();
		}
	} else {
		active_remove();
	}
});

// Responsive content
document.getElementById("navIcoContainer").addEventListener("click", () => navOpen());

function navOpen() {
	document.getElementsByClassName("sidebar")[0].style.display = "block";
	document.getElementsByClassName("nav-ico-container")[0].style.display = "none";
	// document.getElementById("switch").style.display = "block";
}

function navClose() {
	document.getElementsByClassName("sidebar")[0].style.display = "none";
	document.getElementsByClassName("nav-ico-container")[0].style.display = "block";
	// document.getElementById("switch").style.display = "none";
}

