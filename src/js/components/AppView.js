(function () {
	function AppView () {
		View.apply(this, arguments);

		// Set initial 4-set to display in desktop view
		this.displayedSet = 1;
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
				$(setView.element).addClass("set");
				setView.render();

				if (!isFirst) {
					$(setView.element).addClass("hidden");
				}

				$(_this.element).append(setView.element);
				isFirst = false;
				i = 0;
				set = [];
			}
		})


		// Create arrows for swapping between SetViews

		var forwardArrow = document.createElement("button");
		$(forwardArrow).addClass("arrow fa fa-angle-right");
		$(forwardArrow).attr("id","forward-arrow");
		$(_this.element).append(forwardArrow);

		var backArrow = document.createElement("button");
		$(backArrow).addClass("arrow hidden fa fa-angle-left");
		$(backArrow).attr("id","back-arrow");
		$(_this.element).prepend(backArrow);


		// Append the appview to the document
		$("body").append(this.element);

		// Bind events to the appview
		this.bindEvents();
	}


	AppView.prototype.bindEvents = function () {
		var _this = this;
		$("#forward-arrow").click(function (e) {
			var sets = _this.element.querySelectorAll(".set");
			if (_this.displayedSet < 4) {
				$(sets[_this.displayedSet - 1]).toggleClass("hidden");
				_this.displayedSet++;
				$(sets[_this.displayedSet - 1]).toggleClass("hidden");
			}
			updateButtons(_this);
		})
		$("#back-arrow").click(function (e) {
			var sets = _this.element.querySelectorAll(".set");
			if (_this.displayedSet > 1) {
				$(sets[_this.displayedSet - 1]).toggleClass("hidden");
				_this.displayedSet--;
				$(sets[_this.displayedSet - 1]).toggleClass("hidden");
			}
			updateButtons(_this);
		})

	}

	window.AppView = AppView;
})()