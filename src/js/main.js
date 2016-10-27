function init() {
	renderClock();
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Nagasaki,392&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85",
		success: function (results) {
			buildApp(results);
		}
	})
}

function buildApp (results) {
	var report = new AppView(results, "div");
report.render();
	$(document.body).append(report.element);
}


init();
setInterval(renderClock, 1000);







