(function () {
	function AppView () {
		View.apply(this, arguments);
	}
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.render = function () {
		$(".app").empty();
		$(this.element).addClass("app");


		var _this = this;

		// Create and render each SetView containing set of four ForecastViews
		var i = 0;
		var set = [];
		var isFirst = true;
		this.data.list.forEach(function (value) {
			set.push(value);
			i++;


			if (i === 4) {
				var setView = new SetView(set, "div");
				setView.render();

				if (!isFirst) {
					setView.element.addClass("hidden");
				}

				$(_this.element).append(setView.element);
				isFirst = false;
				i = 0;
				set = [];
			}
		})


		// Create and render ForecastView for each day data element in the appview's data


		// Append the appview to the document
		$("body").append(this.element);

		// Bind events to the appview
		this.bindEvents();
		console.log(this);
	}


	AppView.prototype.bindEvents = function () {
		
	}

	window.AppView = AppView;
})()