// TODO 
//   2. Consolidate Timezone ajax call into a function (intervalId should not be global)
//   3. Integrate aux functions into AppView
//   4. Get current location?
//   5. Add date to timestamp

function callData (city) {
	$(".app").empty();
	renderLoading();
	$.ajax({
		url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85`,
		success: function (results) {
			var _results = results;
			var long = results.city.coord.lon;
			var lat = results.city.coord.lat;
			$.ajax({
				url : `http://api.timezonedb.com/v2/get-time-zone?key=FZZNAIMR77WX&format=json&by=position&lng=${long}&lat=${lat}`,
				success : function (results) {

					var clockview = new ClockView(results.timestamp, "div");

					clockview.render();
					var clock = document.querySelector(".clock");
					// animateIn(clock);
					intervalId = setInterval(clockview.render.bind(clockview), 1000);

					buildApp(_results);
					removeLoading();
				}
			})
		}
	})
}

function init() {
	callData("Columbia");
}

function buildApp (results) {
	// Add city name to page
	// animateIn(cityname);
	$("#city-name").val(results.city.name);
	
	// Generate and render the AppView
	var report = new AppView(results, "div");
	report.render();

	// Append the AppView to the body
	$(document.body).append(report.element);
}

var intervalId;
init();

$(".search").keydown(function (e) {
	if (e.which === 13) {
		callData($(this).val());
		this.value = "";
		clearInterval(intervalId);
	}
})








