// TODO 
//   1. Clean up AppView Setview loop
//   2. Alter clock to correct local time.



function init() {
	renderClock();
	renderLoading();
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Nagasaki,392&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85",
		success: function (results) {
			console.log(results);
			removeLoading();
			buildApp(results);
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


init();

$(".search").keydown(function (e) {
	if (e.which === 13) {
		search($(this).val());
	}
})
setInterval(renderClock, 1000);







