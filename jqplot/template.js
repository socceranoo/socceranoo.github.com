function jqPlotChart(div, renderer, data) {
	this.chartDiv = div;
	this.chartRenderer = renderer;
	this.chartData = data;
	this.chartOptions = new Object();
	this.drawChart  = function () {
		var plot1 =  $.jqplot(this.chartDiv, this.chartData, this.chartOptions);
	};
	this.setChartOptions  = function (key, value) {
		this.chartOptions[key] = value;
	};
	this.setChartLevel2Options  = function (key1, key2, value) {
		this.chartOptions[key1][key2] = value;
	};
	this.setChartLevel3Options  = function (key1, key2, key3, value) {
		this.chartOptions[key1][key2][key3] = value;
	};

	this.init = function() {
		this.chartOptions.seriesDefaults = { renderer:this.chartRenderer, trendline:{ show:false }, pointLabels: { show: true }, rendererOptions: { padding: 8, showDataLabels: true } };
		this.chartOptions.grid = {drawGridLines: true, gridLineColor: '#cccccc', background: '#fff',borderWidth: 0};
		/*
        drawGridLines: true,        // wether to draw lines across the grid or not.
        gridLineColor: '#cccccc'    // *Color of the grid lines.
        background: '#fffdf6',      // CSS color spec for background color of grid.
        borderColor: '#999999',     // CSS color spec for border around grid.
        borderWidth: 2.0,           // pixel width of border around grid.
        shadow: true,               // draw a shadow for grid.
        shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
        shadowOffset: 1.5,          // offset from the line of the shadow.
        shadowWidth: 3,             // width of the stroke for the shadow.
        shadowDepth: 3,             // Number of strokes to make when drawing shadow.
                                    // Each stroke offset by shadowOffset from the last.
        shadowAlpha: 0.07           // Opacity of the shadow
        renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
        rendererOptions: {}         // options to pass to the renderer.  Note, the default
                                    // CanvasGridRenderer takes no additional options.
		*/
	};
	this.init();
}
