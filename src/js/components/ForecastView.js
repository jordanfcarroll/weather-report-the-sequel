// Individual Forecast View prototype
(function () {

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
		this.bindEvents();
		}


	ForecastView.prototype.bindEvents = function () {
		console.log("Binding small events");
	}

	window.ForecastView = ForecastView;
})()




