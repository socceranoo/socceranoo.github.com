function jqPlotChart(div, renderer, data) {
	this.chartDiv = div;
	this.chartRenderer = renderer;
	this.chartData = data;
	this.chartOptions = {};
	this.drawChart  = function () {
		var plot1 =  $.jqplot(this.chartDiv, this.chartData, this.chartOptions);
	};
	this.rePlot  = function () {
		$.jqplot(this.chartDiv, this.chartData, this.chartOptions).replot();
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

/*
 Pass a javascript object to this function with the following members
 object = {
	divid: //Where the graph needs to appear
	horizontal:// true for horizontal graphs false for vertical graphs
	title://What is the title of the graph
	xaxis: values
	yaxis: values
	upperlimit://upperlimit to limit the data
	numberformat://format how axis values should appear like %d for decimal %.2f for two point floats etc
*/	
function init_bar_graph(div_object) {
	//alert(JSON.stringify(div_object));
	var upperlimit = div_object.upperlimit;
	var limit = (div_object.yaxis.value.length > upperlimit)?upperlimit:div_object.yaxis.value.length;
	var chart_values = {"xaxis": div_object.xaxis.value.slice(0, limit), "yaxis":div_object.yaxis.value.slice(0, limit)};
	if (div_object.horizontal) {
		chart_values.xaxis = [];
		chart_values.yaxis = [];
		for (var i = 0; i < limit; i++) {
			chart_values.xaxis.unshift(div_object.xaxis.value[i]);
			chart_values.yaxis.unshift(div_object.yaxis.value[i]);
		}
	}
	var numpoints = 5;
	var max = Math.max.apply(Math, chart_values.yaxis);
	var min = Math.min.apply(Math, chart_values.yaxis);
	var min_y = 0;
	var step = max/numpoints;
	var max_y = step * (numpoints + 1);
	var color_arr = get_random_colors(limit, 0);
	var values = {divid:div_object.divid, horizontal:div_object.horizontal, xaxis_values:chart_values.xaxis, yaxis_values:chart_values.yaxis, graph_title:div_object.title, color_arr:color_arr, numberformat:div_object.numberformat, xlabel:div_object.xaxis.label, ylabel:div_object.yaxis.label, axis_min:min_y, axis_max:max_y};
	//alert(JSON.stringify(values));
	$("#"+values.divid).html("");
	$.jqplot.config.enablePlugins = true;
	var general = new jqPlotChart(values.divid, $.jqplot.BarRenderer, [values.yaxis_values]);
	var legend = { show:true, placement: 'outside', rendererOptions: { numberRows: 1, animate:{show:true}}, location:'s', marginTop: '7px' };
	general.setChartOptions("title", values.graph_title);
	if (values.horizontal) {
		general.setChartOptions("axes", {yaxis: {renderer: $.jqplot.CategoryAxisRenderer, ticks: values.xaxis_values}});
		general.setChartLevel2Options("axes", "xaxis", {min:values.axis_min, max:values.axis_max, label:values.ylabel, labelRenderer: $.jqplot.CanvasAxisLabelRenderer, labelOptions:{fontSize:'14pt'}});
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barDirection", "horizontal");
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barMargin", 20);
	} else {
		general.setChartOptions("axes", {xaxis: {renderer: $.jqplot.CategoryAxisRenderer, ticks: values.xaxis_values, tickRenderer: $.jqplot.CanvasAxisTickRenderer, tickOptions:{textColor:"#0088cc", angle:-20, fontSize:'14pt'}, label:values.xlabel}});
		general.setChartLevel2Options("axes", "yaxis", {min:values.axis_min, max:values.axis_max, label:values.ylabel, labelRenderer: $.jqplot.CanvasAxisLabelRenderer, labelOptions:{fontSize:'14pt'}});
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barMargin", 30);
	}
	general.setChartOptions("highlighter", {show:false, sizeAdjust:7, showtooltip:true, tooltipAxes:'both'});
	general.setChartOptions("cursor", {show:false});
	general.setChartOptions("axesDefaults", { min: values.axis_min, tickOptions: { formatString: values.numberformat}});
	general.setChartOptions("animate", !$.jqplot.use_excanvas);
	general.setChartOptions("seriesColors", color_arr);
	if (div_object.y2axis.value.length) {
		//general.setChartOptions("series", [{pointLabels:{show:true, labels:div_object.y2axis.value}}]);
	}
	general.setChartLevel3Options("seriesDefaults", "rendererOptions", "varyBarColor", false);

	general.setChartLevel2Options("grid", "borderWidth", 1.0);
	general.setChartLevel2Options("grid", "gridLineColor", "#ccc");
	general.drawChart();
}

function init_pie_donut_chart(div_object) {
	$.jqplot.config.enablePlugins = true;
	var spie = [['C/C++', 30], ['PHP', 30], ['PYTHON', 10], ['PERL', 20], ['MYSQL', 5], ['SHELL', 5]];
	//var limit = (div_object.data.value.length > div_object.upperlimit)?div_object.upperlimit:div_object.data.value.length;
	//var data = div_object.data.value.slice(0, limit);
	var limit = div_object.upperlimit;
	var data = div_object.data.value;
	var renderer = $.jqplot.PieRenderer;
	var fill = true;
	var legend = { show:true, rendererOptions: {location:'c'}};
	if (div_object.type == "donut") {
		renderer = $.jqplot.DonutRenderer;
		fill = true;
		legend = { show:true, rendererOptions: {location:'c'}};
	}
	var backEnd = new jqPlotChart(div_object.divid, renderer, data);
	//var legend = { show:true, rendererOptions: { animate:{show:true}}, location:'e', marginTop: '7px' };
	//var legend = { show:false};
	var color_arr = get_random_colors(limit, 0);
	backEnd.setChartOptions("title", div_object.title);
	backEnd.setChartOptions("legend", legend);
	backEnd.setChartOptions("highlighter", { show: false });
	backEnd.setChartOptions("animate", !$.jqplot.use_excanvas);
	var total = 0;
	backEnd.setChartOptions("seriesColors", color_arr);
	if (div_object.data.value[0].length === 7) {
		var seven_arr = [__peterRiver, __sunFlower, __emerald, __alizarin, __wisteria, __midnightBlue, __pumpkin];
		backEnd.setChartOptions("seriesColors", seven_arr);
	}
	backEnd.setChartOptions("cursor", {show:false});
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "barMargin", 20);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "fill", fill);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "lineWidth", 6);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "sliceMargin", 7);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "startAngle", 30);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "dataLabelCenterOn", true);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "dataLabelPositionFactor", 0.65);
	backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "dataLabelThreshold", 10);
	if (div_object.datalabels)
		backEnd.setChartLevel3Options("seriesDefaults", "rendererOptions", "dataLabels", div_object.datalabels);
	backEnd.setChartLevel2Options("grid", "borderWidth", 0);
	backEnd.setChartLevel2Options("grid", "shadow", false);
	backEnd.drawChart();

	//$("#"+div_object.divid).html($("#"+div_object.divid).html()+"<a id=change-colors class='btn btn-primary'>Change Colors</a>");

	/*
	 *$("#change-colors").click(function () {
	 *    backEnd.setChartOptions("seriesColors", get_random_colors(limit, 0));
	 *    backEnd.rePlot();
	 *});
	 */
}
/*
*/
function init_line_graph (div_object) {
	$("#"+div_object.divid).html("");
	//var line2 = [['2004', 42], ['2005', 56], ['2008', 39], ['2010', 81]];
	//var line3 = [['2004', 0.04], ['2005', 0.65], ['2008', 0.23], ['2010', 1.20]];
	var legend = { show:false, placement: 'inside', xoffset: 12, yoffset: 12, rendererOptions: { numberRows: 2, animate:{show:true}}, location:'nw'};
	var max = Math.max.apply(Math, div_object.line1.value);
	var step = max/5;
	var color = color_subset(dark_flat_colors, 1)[0];
	var max_y = step * (5 + 1);
	var plot2 = $.jqplot(div_object.divid, [div_object.line1.value], {
		title: div_object.title,
		animate:true,
		grid: {
			gridLineColor:"#ccc",
			background:"#FFF"
		},
		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			labelOptions:{fontSize:'14pt'}
		},
		legend: legend,
		cursor:{
			show:false,
			zoom: true,
			looseZoom: true,
			showTooltip: false
		},
		seriesDefaults: {
			rendererOptions: {
				smooth: true
			},
			fill:div_object.fill
		},
		series:[ 
			{
				// Don't show a line, just show markers.  Make the markers 7 pixels with an 'x' style
				//showLine:false,
				markerOptions: { size: 7, style:"." },
				label:div_object.line1.label,
				color:color
			}
		],
		axes: {
			xaxis: {
				renderer: $.jqplot.DateAxisRenderer,
				label: 'Timeline',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer,
				tickOptions: {
					labelPosition: 'middle',
					formatString:div_object.dateformat,
					//formatString:'%b-%Y',
					angle: -25
				},
				//tickInterval:div_object.line1.interval,
				min:div_object.line1.min
			},
			yaxis: {
				label: div_object.line1.label,
				min:0,
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickOptions: {
				}
			},
		}
	});

}
function domdatatable(table_obj) {
	/* Data set - can contain whatever information you want */
	if ($('#'+table_obj.divid+" tr").length < 2)
		return;
	$('#'+table_obj.divid).dataTable(
		{
			"fnInitComplete": function(oSettings, json) {
			},
			"bPaginate": true, "bLengthChange": true, "bFilter": true, "bSort": true, "bInfo": true, "bAutoWidth": true,"aoColumns": table_obj.column_headers,
			"iDisplayLength":table_obj.show_count, "aaSorting":[[table_obj.sort_index, table_obj.sort_order]]	
		}
	);	
	//$('#'+table_obj.divid).show();
	//$('#'+table_obj.divid).css('width', '');
}
function newdatatable(table_obj) {
	/* Data set - can contain whatever information you want */
	var rows = [
		['Misc','NetFront 3.1','Embedded devices','-','C'],
		['Other browsers','All others','-','-','U']
	];
	var column_headers = [
			{ "sTitle": "Engine" },
			{ "sTitle": "Browser" },
			{ "sTitle": "Platform" },
			{ "sTitle": "Version", "sClass": "center" },
			{ "sTitle": "Grade", "sClass": "center" }
		];
	if (table_obj.rows.length === 0)
		return;
	$('#'+table_obj.divid).dataTable( {
		"aaData": table_obj.rows,
		"aoColumns":table_obj.column_headers,
		"aaSorting":[[table_obj.sort_index, table_obj.sort_order]],
		"bDestroy":true,
		"iDisplayLength":table_obj.show_count
	});	
	$('#'+table_obj.divid).css('width', '');
}
