
function kToF (a) {
	return Math.round((a*1.8) - 459.67);
}

// // function renderClock () {
// // 	var currentTime = new Date();
// 	var currentMinutes = currentTime.getMinutes();
// 	var currentHours = currentTime.getHours();
// 	var amString = "AM";

// 	if (currentHours >= 12) {
// 		amString = "PM";
// 	}
// 	if (currentHours > 12) {
// 		currentHours -= 12;
// 	}	
// 	if (currentMinutes < 10) {
// 		currentMinutes = "0" + currentMinutes;
// 	}

// 	var builtClock = currentHours + ":" + currentMinutes + " " + amString;
	
// 	var clockEl = $(".clock");
// 	clockEl.html(builtClock);
// }

function renderClock (unix) {
	// convert unix to ms
	var unix = unix * 1000;

	// Get a date object
	var date = new Date(unix);

	// Account for timezone offset
	var offset = date.getTimezoneOffset();
	offset = offset * 60 * 1000;
	var date = new Date((unix) + offset);

	// Build clock with date
	var currentMinutes = date.getMinutes();
	var currentHours = date.getHours();
	var amString = "AM";

	if (currentHours >= 12) {
		amString = "PM";
	}
	if (currentHours > 12) {
		currentHours -= 12;
	}	
	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}

	var builtClock = currentHours + ":" + currentMinutes + " " + amString;
	
	var clockEl = $(".clock");
	clockEl.html(builtClock);
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



function search (city) {
	var updatedUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85";
	renderLoading();
	$.ajax({
		url : updatedUrl,
		success : function(results) {
			var _results = results;
			var long = results.city.coord.lon;
			var lat = results.city.coord.lat;
			$.ajax({
				url : `http://api.timezonedb.com/v2/get-time-zone?key=FZZNAIMR77WX&format=json&by=position&lng=${long}&lat=${lat}`,
				success : function (results) {
					removeLoading();
					clearInterval(intervalId);
					renderClock(results.timestamp);
					intervalId = setInterval(renderClock.bind(null, results.timestamp), 1000);
					buildApp(_results);
				}
			})
		}
	})
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