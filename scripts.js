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


// gameeeeeeeeeeeeeee
// // game
// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset");
// let modeBtn = document.querySelector("#mode");
// let turnO = true;
// // let newGameBtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");
// let isManVsComputer = false;

// const winPatterns = [
// 	[0, 1, 2],
// 	[0, 3, 6],
// 	[0, 4, 8],
// 	[1, 4, 7],
// 	[2, 5, 8],
// 	[2, 4, 6],
// 	[3, 4, 5],
// 	[6, 7, 8],
// ];

// const computerMove = () => {
// 	let availableBoxes = [...boxes].filter((box) => box.innerText === "");
// 	if (availableBoxes.length > 0) {
// 		let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
// 		randomBox.innerText = "X";
// 		randomBox.style.color = "black";
// 		randomBox.disabled = true;
// 		turnO = true;
// 		checkWinner();
// 	}
// };

// boxes.forEach((box) => {
// 	box.addEventListener("click", function () {
// 		if (turnO) {
// 			box.innerText = "O";
// 			box.style.color = "green";
// 			turnO = false;
// 			box.disabled = true;
// 			checkWinner();
// 			if (isManVsComputer && !turnO) {
// 				setTimeout(computerMove, 500);
// 			}
// 		} else if (!isManVsComputer) {
// 			box.innerText = "X";
// 			box.style.color = "black";
// 			turnO = true;
// 			box.disabled = true;
// 			checkWinner();
// 		}
// 	});
// });

// const enableBoxes = () => {
// 	for (let box of boxes) {
// 		box.disabled = false;
// 		box.innerText = "";
// 	}
// };

// const disableBoxes = () => {
// 	for (let box of boxes) {
// 		box.disabled = true;
// 	}
// };

// const showWinner = (winner) => {
// 	msg.innerText = `Congratulations, Winner is ${winner}`;
// 	disableBoxes();
// };

// const checkWinner = () => {
// 	let hasWin = false;
// 	for (let pattern of winPatterns) {
// 		let pos1Val = boxes[pattern[0]].innerText;
// 		let pos2Val = boxes[pattern[1]].innerText;
// 		let pos3Val = boxes[pattern[2]].innerText;

// 		if (
// 			pos1Val !== "" &&
// 			pos2Val !== "" &&
// 			pos3Val !== "" &&
// 			pos1Val === pos2Val &&
// 			pos2Val === pos3Val
// 		) {
// 			showWinner(pos1Val);
// 			hasWin = true;
// 			return;
// 		}
// 	}

// 	if (!hasWin) {
// 		const allBoxes = [...boxes].every((box) => box.innerText !== "");
// 		if (allBoxes) {
// 			msg.innerText = "Match Drawn";
// 		}
// 	}
// };

// const resetGame = () => {
// 	turnO = true;
// 	enableBoxes();
// 	msg.innerText = "TIC TAK TOE";
// };

// const toggleMode = () => {
// 	isManVsComputer = !isManVsComputer;
// 	modeBtn.innerText = isManVsComputer ? "Switch to Man vs Man" : "Switch to Man vs Computer";
// 	resetGame();
// };

// resetBtn.addEventListener("click", resetGame);
// modeBtn.addEventListener("click", toggleMode);

// gameeee endddd

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


// Animaton for sections

// document.addEventListener("DOMContentLoaded", (event) => {
// 	gsap.registerPlugin(Flip);
// 	const state = Flip.getState("#profile, #about");
// 	Flip.from(state, {
// 		duration: 0.5,
// 		ease: "power1.inOut",
// 		stagger: 0.1,
// 		absolute: true,
// 		onEnter: (el) =>
// 			gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }),
// 		onLeave: (el) => gsap.to(el, { opacity: 0, y: -20, duration: 0.5 }),
// 	});
// });
