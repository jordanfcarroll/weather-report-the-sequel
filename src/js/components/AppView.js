(function () {
	function AppView () {
		View.apply(this, arguments);
	}
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.render = function () {
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


	AppView.prototype.bindEvents = function () {
		console.log("Binding big events");
	}

	window.AppView = AppView;
})()