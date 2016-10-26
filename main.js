// Base View prototype
function View (data, tagName) {
	this.data = data || null;
	this.element = document.createElement(tagName);
}
View.prototype.render = function() {};
View.prototype.bindEvents = function() {};



// Outer View prototype
function ReportView () {
	View.apply(this, arguments);
}
ReportView.prototype = Object.create(View.prototype);
ReportView.prototype.render = function () {
	var _this = this;

	// MAKE UL

	this.data.list.forEach(function (value) {
		var forecastView = new ForecastView(value, "div")
		forecastView.render();


		$(_this.element).append(forecastView.element);
	})

	$("body").append(this.element);
	this.bindEvents();
	console.log(this);
}


ReportView.prototype.bindEvents = function () {
	console.log("Binding big events");
}



// Individual Forecast View prototype
function ForecastView (	) {
	View.apply(this, arguments);
}
ForecastView.prototype = Object.create(View.prototype);
ForecastView.prototype.render = function (value) {
	// console.log(value);
	var description = this.data.weather[0].description;
	var min = kToF(this.data.temp.min);
	var max = kToF(this.data.temp.max);
	var wind = {
		speed: this.data.speed + "mph",
		direction: windDirection(this.data.deg)
	}

	$(this.element).html(`
		<div class="weather-item">
			<ul class="block">
				<li class="icon"></li>
				<li class="day">${"Monday"}</li>
				<li class="desc">${description}</li>
				<li class="hi">${max}</li>
				<li class="lo">${min}</li>
				<li class="wind">${wind.speed} ${wind.direction}</li>
				<li class="expand"></li>
			</ul>
		</div>
		`);
	this.bindEvents();
}
ForecastView.prototype.bindEvents = function () {
	console.log("Binding small events");
}







// Initialization -- HTML Request --> feed data object to report
function init() {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=Nagasaki,392&mode=json&cnt=16&APPID=f6e829e9fecf2ba3637d0eed96a2ce85",
		success: function (results) {
			buildApp(results);
		}
	})
}

function buildApp (results) {
	var report = new ReportView(results, "div");
	report.render();
	$(document.body).append(report.element);
}

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

	var builtClock = currentHours + ":" + currentMinutes + amString;
	console.log(builtClock);
}

function windDirection(a) {
	var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	return directions[Math.round((a/45) % 8)];
}

init();
setInterval(renderClock, 1000);







