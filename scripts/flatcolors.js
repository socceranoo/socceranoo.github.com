//Grays
//-------------------------
var __black = "#000";
var __grayDarker = "#222";
var __grayDark = "#333";
var __gray = "#555";
var __grayLight = "#999";
var __grayLighter = "#eee";
var __white = "#fff";


//Accentcolors
//-------------------------
var __blue = "#049cdb";
var __blueDark = "#0064cd";
var __green = "#46a546";
var __red = "#9d261d";
var __yellow = "#ffc40d";
var __orange = "#f89406";
var __pink = "#c3325f";
var __purple = "#7a43b6";

//FLATUIColors
var __turquoise = "#1abc9c";
var __greenSea = "#16a085";
var __emerald = "#2ecc71";
var __nephritis = "#27ae60";
var __peterRiver = "#3498db";
var __belizeHole = "#2980b9";
var __amethyst = "#9b59b6";
var __wisteria = "#8e44ad";
var __wetAsphalt = "#34495e";
var __midnightBlue = "#2c3e50";
var __sunFlower = "#f1c40f";
var __carrot = "#e67e22";
var __pumpkin = "#d35400";
var __alizarin = "#e74c3c";
var __pomegranate = "#c0392b";
var __clouds = "#ecf0f1";
var __silver = "#bdc3c7";
var __concrete = "#95a5a6";
var __asbestos = "#7f8c8d";

var master_color_array = [
	/*
	__black,
	__white,
	__grayLight,
	__grayLighter,
	__gray,
	__purple,
	__clouds,
	__midnightBlue,
	__nephritis,
	__wisteria,
	__belizeHole,
	__pomegranate,
   */
	__wetAsphalt,
	__grayDarker,
	__grayDark,
	__silver,
	__blue,
	__blueDark,
	__green,
	__red,
	__yellow,
	__orange,
	__pink,
	__turquoise,
	__greenSea,
	__emerald,
	__peterRiver,
	__amethyst,
	__sunFlower,
	__carrot,
	__pumpkin,
	__alizarin,
	__concrete,
	__asbestos
];

var dark_flat_colors = [
	__blueDark,
	__green,
	__red,
	__wetAsphalt,
	__grayDarker,
	__grayDark,
	__turquoise,
	__peterRiver,
	__amethyst,
	__pumpkin,
	__alizarin,
	__asbestos
];

var seven_colors = [
	__greenSea,
	__pumpkin,
	__amethyst,
	__peterRiver,
	__alizarin,
	__blueDark,
	__wetAsphalt,
];

var websafe_color_array =[];
function color_subset(arr, size){
	var shuffled = arr.slice(0), i = arr.length, temp, index;
	while (i--) {
		index = Math.floor(i * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(0, size);
}
function get_random_colors(size, option){
	var arr = (option === 0)?master_color_array:websafe_color_array;
	var shuffled = arr.slice(0), i = arr.length, temp, index;
	while (i--) {
		index = Math.floor(i * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	if (size > arr.length)
		return shuffled.concat(shuffled.slice(index)).slice(0, size);
	else
		return shuffled.slice(0, size);
}

(function websafe_colors() {
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	var i, j, k, val_r, val_g, val_b, val;
	var upper = 12;
	var lower = 3;
	var step = 3;
	for(i = upper; i >= lower ; i-= step) {
		//for($j = 0; $j <= upper ; $j+= step) {
		for(j = upper; j >= lower ; j-= step) {
			//for($k = 0; $k <= upper ; $k+= step) {
			for(k = upper; k >= lower ; k-= step) {
				val_r = i*16 + i;
				val_g = j*16 + j;
				val_b = k*16 + k;
				val = rgbToHex(val_r, val_g, val_b);
				websafe_color_array.push(val);
				//console.log(val);
			}
		}
	}
})();

