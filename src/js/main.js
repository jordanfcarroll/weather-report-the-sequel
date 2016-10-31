// TODO 
//   1. Clean up AppView Setview loop
//   2. Consolidate Timezone ajax call into a function (intervalId should not be global)
//   3. Integrate aux functions into AppView


function init() {
	renderLoading();
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Nagasaki,392&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85",
		success: function (results) {
			var _results = results;
			var long = results.city.coord.lon;
			var lat = results.city.coord.lat;
			$.ajax({
				url : `http://api.timezonedb.com/v2/get-time-zone?key=FZZNAIMR77WX&format=json&by=position&lng=${long}&lat=${lat}`,
				success : function (results) {
					console.log(results);
					renderClock(results.timestamp);
					intervalId = setInterval(renderClock.bind(null, results.timestamp), 1000);
					buildApp(_results);
					removeLoading();
				}
			})
		}
	})
}

function buildApp (results) {
	// Add city name to page
	$("#city-name").html(results.city.name);
	
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
		search($(this).val());
	}
})








