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

		var isFirst = true;
		for (var i = 0 ; i < this.data.list.length ;  ) {
			var set = [];
			for (var j = 0 ; j < 4 ; j++, i++ ) {
				set.push(_this.data.list[i]);
			}
			var setView = new SetView(set, "div");
			$(setView.element).addClass("set");
			setView.render();	

			if (!isFirst) {
				$(setView.element).addClass("hidden");
			}

			$(_this.element).append(setView.element);
			isFirst = false;
		}

		// var i = 0;
		// var set = [];
		// var isFirst = true;
		// this.data.list.forEach(function (value) {
		// 	set.push(value);
		// 	i++;


		// 	if (i === 4) {
		// 		var setView = new SetView(set, "div");
		// 		$(setView.element).addClass("set");
		// 		setView.render();

		// 		if (!isFirst) {
		// 			$(setView.element).addClass("hidden");
		// 		}

		// 		$(_this.element).append(setView.element);
		// 		isFirst = false;
		// 		i = 0;
		// 		set = [];
		// 	}
		// })


		// Create arrows for swapping between SetViews

		var arrowWrapper = document.createElement("div");
		$(arrowWrapper).addClass("arrow-wrapper");
		$(arrowWrapper).html(`
			<div class="arrow-wrapper">
				<button class="arrow fa fa-angle-right" id="forward-arrow"></button>
				<button class="arrow hidden fa fa-angle-left" id="back-arrow"></button>
			</div>
			`);

		this.element.append(arrowWrapper)

		// $(this.element).html(`
		// 	${$(this.element).html()}
		// 	<div class="arrow-wrapper">
		// 		<button class="arrow fa fa-angle-right" id="forward-arrow"></button>
		// 		<button class="arrow hidden fa fa-angle-left" id="back-arrow"></button>
		// 	</div>
		// 	`)

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