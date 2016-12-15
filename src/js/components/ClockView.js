(function () {
	function ClockView () {
		View.apply(this, arguments);
		this.elapsedSinceUpdate = 0;
	}

	ClockView.prototype = Object.create(View.prototype);
	ClockView.prototype.render = function () {
		$(".clock").remove();
		$(this.element).addClass("clock");

		$

		var _this = this;

		// convert unix to ms
		var unix = (this.data + this.elapsedSinceUpdate)* 1000;
		console.log("unix = " + unix)

		// Get a date object
		var date = new Date(unix);

		// Account for timezone offset
		var offset = date.getTimezoneOffset();
		offset = offset * 60 * 1000;
		var date = new Date((unix) + offset);

		// Build clock with date
		var currentMinutes = date.getMinutes();
		var currentHours = date.getHours();
		var amString = "AM";

		if (currentHours >= 12) {
			amString = "PM";
		}
		if (currentHours > 12) {
			currentHours -= 12;
		}	
		if (currentHours === 0) {
			currentHours = 12;
		}
		if (currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}

		var builtClock = currentHours + ":" + currentMinutes + " " + amString;
		
		$(this.element).html(builtClock);
		console.log(date);
		this.elapsedSinceUpdate++;

		$("header").append(this.element);

	}


	window.ClockView = ClockView;

})()



