
function kToF (a) {
	return Math.round((a*1.8) - 459.67);
}


function renderLoading() {
	var div = document.createElement("div");
	$(div).html(`
		<div class="dot-1"></div>
		<div class="dot-2"></div>
		`);
	$(div).addClass("loading");
	$("body").append(div);
}


function removeLoading() {
	$(".loading").remove();
}


function windDirection(a) {
	var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	return directions[Math.round(a/45) % 8];
}


function animateIn (element) {
	$(element).addClass("animate-in");
}