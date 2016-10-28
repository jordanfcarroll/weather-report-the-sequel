
function kToF (a) {
	return Math.round((a*1.8) - 459.67);
}

function renderClock () {
	var currentTime = new Date();
	var currentMinutes = currentTime.getMinutes();
	var currentHours = currentTime.getHours();
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

function search (city) {
	var updatedUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85";
	$.ajax({
			url : updatedUrl,
			success : function(results) {
				buildApp(results);
			}
		})
}

function windDirection(a) {
	var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	return directions[Math.round(a/45) % 8];
}
