// start page with last filter = 0; 0 is no filter
var lastFilter = 0;

function initialize() {
	
	
	// check if cookie favorite filter is set
	if(getCookie("lastFilter") == ""){
		// set last filter to no filter
		document.cookie="lastFilter=0";				
	} else {
		// get last filter
		lastFilter = getCookie("lastFilter");
	}
		
	// TODO always update last filter
}

function buttonSwitchKameraPressed() {			
	alert("buttonSwitchKameraPressed");
	
}

function buttonNewEntryPressed() {			
	alert("buttonNewEntryPressed");
	
}

function buttonSavePressed() {
   alert("buttonSavePressed");
   
   // save images with date
}

function setFavoriteFilter() {
	// set current filter to favorite filter cookie
}

function showStream() {
	// Reference to video element.
  	var video = document.querySelector('video');
	
	var errorCallback = function(e) {
		alert("No camera found!");
	};

	// Ensure cross-browser functionality.
	navigator.getUserMedia  = navigator.getUserMedia ||
							  navigator.webkitGetUserMedia ||
							  navigator.mozGetUserMedia ||
							  navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({audio: true, video: true}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
		}, errorCallback);
	} else {
		alert("Fail");
		// video.src = 'somevideo.webm'; // fallback.
	}
}

function getDate() {
	var date = new Date();

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;

	var today = day + "." + month + "." + year;
	
	return today;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {			
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
