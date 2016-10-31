
function kToF (a) {
	return Math.round((a*1.8) - 459.67);
}

function renderLoading() {
	var div = document.createElement("div");
	// $(div).html("LOADING");
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

function updateButtons(app) {
	if (app.displayedSet === 1) {
		$("#back-arrow").addClass("hidden");
	} else if (app.displayedSet === 4) {
		$("#forward-arrow").addClass("hidden");
	} else {
		$("#back-arrow").removeClass("hidden");
		$("#forward-arrow").removeClass("hidden");
	}
}

function animateIn (element) {
	$(element).addClass("animate-in");
}