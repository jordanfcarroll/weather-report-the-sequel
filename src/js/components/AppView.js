(function () {
	function AppView () {
		View.apply(this, arguments);
	}
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.render = function () {
		var _this = this;


		// Create and render ForecastView for each day data element in the appview's data
		this.data.list.forEach(function (value) {
			var forecastView = new ForecastView(value, "div")
			forecastView.render();

			// Append new ForecastView to the AppView
			$(_this.element).append(forecastView.element);
		})

		// Append the appview to the document
		$("body").append(this.element);

		// Bind events to the appview
		this.bindEvents();
		console.log(this);
	}


	AppView.prototype.bindEvents = function () {
		console.log("Binding big events");
	}

	window.AppView = AppView;
})()