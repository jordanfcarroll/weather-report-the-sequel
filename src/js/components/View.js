// Base View prototype
(function () {

	function View (data, tagName) {
		this.data = data || null;
		this.element = document.createElement(tagName);
	}
	View.prototype.render = function() {};
	View.prototype.bindEvents = function() {};

	window.View = View;
})()