// Individual Forecast View prototype
(function () {

	function ForecastView (	) {
		View.apply(this, arguments);
	}

	ForecastView.prototype = Object.create(View.prototype);
	ForecastView.prototype.render = function (value) {
		// console.log(value);

		// Get appropriate variables from the weather data object
		var description = this.data.weather[0].description || null;
		var min = kToF(this.data.temp.min) || null;
		var max = kToF(this.data.temp.max) || null;
		var wind = {
			speed: this.data.speed + "mph",
			direction: windDirection(this.data.deg)
		}

		// Create and insert html string with data variables
		$(this.element).html(`
			<div class="weather-item">
				<ul class="block">
					<div class="icon-block">
						<li class="icon"></li>
						<li class="day">${"Monday"}</li>
						<button class="expand">+<button>
					</div>
					<div class="info-block">
						<li class="desc">${description}</li>
						<li class="hi">${max}</li>
						<li class="lo">${min}</li>
						<li class="wind">${wind.speed} ${wind.direction}</li>
					</div>
				</ul>
			</div>
			`);

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


	window.ForecastView = ForecastView;
	
})()




