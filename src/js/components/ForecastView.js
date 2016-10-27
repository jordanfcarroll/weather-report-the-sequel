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
			speed: this.data.speed + "mph",
			direction: windDirection(this.data.deg)
		};

		// Create and insert html string with data variables
		$(this.element).html(`
			<div class="weather-item">
				<ul class="block">
					<div class="icon-block">
						<li class="icon"></li>
						<li class="day">${weekday}</li>
					</div>
					<div class="info-block">
						<li class="desc">${desc}</li>
						<li class="hi">${max}</li>
						<li class="lo">${min}</li>
						<li class="wind">${wind.speed} ${wind.direction}</li>
					</div>
					<button class="expand">+</button>
				</ul>
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

	window.ForecastView = ForecastView;
	
})()




