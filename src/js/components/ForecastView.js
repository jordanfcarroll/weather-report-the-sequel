// Individual Forecast View prototype
(function () {

	function ForecastView (	) {
		View.apply(this, arguments);
	}

	ForecastView.prototype = Object.create(View.prototype);
	ForecastView.prototype.render = function (value) {
		// console.log(value);

		// Get appropriate variables from the weather data object
		var desc = this.data.weather[0].description;
		console.log(icon);

		// setIcon(desc, icon);

	

		var min = kToF(this.data.temp.min);
		var max = kToF(this.data.temp.max);
		console.log(this.data.deg);
		var wind = {
			speed: this.data.speed + "mph",
			direction: windDirection(this.data.deg)
		};
		console.log(wind);

		// Create and insert html string with data variables
		$(this.element).html(`
			<div class="weather-item">
				<ul class="block">
					<div class="icon-block">
						<li class="icon"></li>
						<li class="day">${"Monday"}</li>
						<button class="expand">+</button>
					</div>
					<div class="info-block">
						<li class="desc">${desc}</li>
						<li class="hi">${max}</li>
						<li class="lo">${min}</li>
						<li class="wind">${wind.speed} ${wind.direction}</li>
					</div>
				</ul>
			</div>
			`);

		var icon = this.element.querySelector(".icon");

		if (desc.indexOf("cloud") >= 0) {
			console.log("clouds are here");
			$(icon).addClass("cloud-icon");
		} else if (desc.indexOf("rain") >= 0) {
			console.log("rain is here");
			$(icon).addClass("rain-icon");
		} else if (desc.indexOf("clear") >= 0) {
			console.log("sky is clear");
			$(icon).addClass("clear-icon");
		}

		// Bind events to this ForecastView
		this.bindEvents();
	}


	ForecastView.prototype.bindEvents = function () {

		var _this = this;

		var expandButton = this.element.querySelector("button");

		$(expandButton).on("click", function (e) {

			// Toggle expanded class of element to expand information
			$(_this.element).toggleClass("expanded");

		});
	}

	// ForecastView.prototype.setIcon = function (desc, icon) {
	// 	if (description.indexOf("cloud") >= 0) {
	// 		console.log("clouds are here");
	// 		$(icon).addClass("cloud-icon");
	// 	} else if (description.indexOf("rain") >= 0) {
	// 		console.log("rain is here");
	// 		$(icon).addClass("rain-icon");
	// 	} else if (description.indexOf("clear") >= 0) {
	// 		console.log("rain is here");
	// 		$(icon).addClass("clear-icon");
	// 	}
	// }

	window.ForecastView = ForecastView;
	
})()




