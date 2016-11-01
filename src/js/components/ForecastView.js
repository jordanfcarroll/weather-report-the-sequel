// Individual Forecast View prototype
(function () {

	function ForecastView (	) {
		View.apply(this, arguments);
	}

	ForecastView.prototype = Object.create(View.prototype);
	ForecastView.prototype.render = function () {

		// Get appropriate variables from the weather data object
		var desc = this.data.weather[0].description;

		// Get weekday of date
		var date = new Date(this.data.dt * 1000);
		var day = date.getUTCDay();
		var weekday = 
			["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];


		// Get min and max temperatures
		var min = kToF(this.data.temp.min);
		var max = kToF(this.data.temp.max);
		
		// Get wind info
		var wind = {
			speed: Math.round(this.data.speed) + " mph",
			direction: windDirection(this.data.deg)
		};

		// Create and insert html string with data variables
		$(this.element).html(`
			<div class="weather-item">
				<div class="block cf">
					<div class="icon-block">
						<div class="icon"></div>
						<div class="day">${weekday}</div>
					</div>
					<div class="info-block">
						<div class="desc">${desc}</div>
						<div class="hi">${max}</div>
						<div class="lo">${min}</div>
						<div class="wind">${wind.speed} ${wind.direction}</div>
					</div>
					<button class="expand">+</button>
				</div>
			</div>
			`);

		// Modify class to insert icon
		var icon = this.element.querySelector(".icon");
		if (desc.indexOf("cloud") >= 0) {
			$(icon).addClass("cloud-icon");
		} else if (desc.indexOf("rain") >= 0) {
			$(icon).addClass("rain-icon");
		} else if (desc.indexOf("clear") >= 0) {
			$(icon).addClass("clear-icon");
		} else if (desc.indexOf("snow") >= 0 ) {
			$(icon).addClass("snow-icon");
		}


		// Bind events to this ForecastView
		this.bindEvents();
	}


	ForecastView.prototype.bindEvents = function () {

		var _this = this;

		var expandButton = this.element.querySelector("button");

		$(expandButton).on("click", function (e) {

			e.stopPropagation();
			// Toggle expanded class of element to expand information
			$(_this.element).addClass("expanded");
			$(expandButton).html("");

		});

		$(this.element).on("click", function (e) {

			if ($(_this.element).hasClass("expanded")) {
				$(_this.element).removeClass("expanded");
				$(expandButton).html("+");
			}
		})
	}

	window.ForecastView = ForecastView;
	
})()




