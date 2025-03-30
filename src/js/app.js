var menuOpen = false;
function toggleNav() {
	var menu = document.getElementById("mobile-menu");
	var lightbox = document.getElementById("header-lightbox");
	var header = document.getElementById("header");
	var height = header.offsetHeight;
	if (!menuOpen) {
		menu.classList.add("open-menu");
		menu.style.height = "calc(100vh - " + height + "px)";
		lightbox.classList.add("display-lightbox");
		lightbox.classList.add("open-lightbox");
	} else {
		menu.classList.remove("open-menu");
		lightbox.classList.remove("open-lightbox");
		setTimeout(function () {
			lightbox.classList.remove("display-lightbox");
		}, 500);
	}
	menuOpen = !menuOpen;
}
var suitesSlider;
var currentSuiteIndex = 0;
var totalSuites = 0;
document.addEventListener("DOMContentLoaded", function () {
	new Splide("#adventure-slider", {
		type: "slide",
		autoplay: false,
		perPage: 1,
		gap: "1em",
		loop: true,
		arrows: true,
	}).mount();

	suitesSlider = new Splide("#suites-slider", {
		type: "slide",
		autoplay: false,
		perPage: 1,
		gap: "1em",
		arrows: false,
		loop: true,
		pagination: false,
	}).mount();

	var elms = document.getElementsByClassName("suite-images");

	for (var i = 0; i < elms.length; i++) {
		new Splide(elms[i], {
			type: "slide",
			autoplay: false,
			perPage: 1,
			gap: "1em",
			loop: true,
			arrows: true,
		}).mount();
	}
});
function jumpToSuite(num) {
	suitesSlider.go(num);
	var btns = document.querySelectorAll(".suite-btn");
	for (var i = 0; i < btns.length; i++) {
		btns[i].classList.remove("selected");
	}
	var currentSuite = document.getElementById("suite-btn-" + num);
	currentSuite.classList.add("selected");
	currentSuiteIndex = num;
}
function prevSuite() {
	suitesSlider.go("<");
	currentSuiteIndex--;
	if (currentSuiteIndex == -1) {
		currentSuiteIndex = totalSuites - 1;
	}
	resetDots();
}
function nextSuite() {
	suitesSlider.go(">");
	currentSuiteIndex++;
	if (currentSuiteIndex == totalSuites) {
		currentSuiteIndex = 0;
	}
	resetDots();
}
function resetDots() {
	var dots = document.querySelectorAll(".suite-dot");
	for (var i = 0; i < dots.length; i++) {
		dots[i].classList.remove("selected");
	}
	var currentSuiteDot = document.getElementById(
		"suite-dot-" + currentSuiteIndex
	);
	currentSuiteDot.classList.add("selected");
}
document.addEventListener("DOMContentLoaded", function () {
	var dots_count = document.querySelectorAll(".suite-dot");
	totalSuites = dots_count.length;
	resetDots();
});
