(function () {
	function SetView () {
		View.apply(this, arguments);
	}

	SetView.prototype = Object.create(View.prototype);
	SetView.prototype.render = function (value) {

		var _this = this;

		this.data.forEach(function (value) {
			var forecastView = new ForecastView(value, "div")
			forecastView.render();

			// Append new ForecastView to the SetView
			$(_this.element).append(forecastView.element);

		})

	}
	SetView.prototype.bindEvents = function () {};


	window.SetView = SetView;

})()




