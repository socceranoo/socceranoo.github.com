function increment_init(jqelem, startval, interval) {
	var origval = jqelem.html();
	var endval = 1 + parseInt(origval, 10);
	var step = 1  + parseInt(endval/100, 10);
	var curval = startval;
	var timer = self.setInterval(function () {
		increment();
	}, interval);
	function increment () {
		jqelem.html(curval);
		curval += step;
		if (curval >= endval) {
			jqelem.html(origval);
			window.clearInterval(timer);
		}
	}
}
