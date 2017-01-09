// start page with last filter = 0; 0 is no filter
var lastFilter = 0;

// array with all video sources
var sources = new Array();

// current source
var currentSource;

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

function buttonNewPicturePressed() {			
	alert("buttonNewPicturePressed");
	
}

function buttonSavePressed() {
   alert("buttonSavePressed");
   
   // save images with date
}

function setFavoriteFilter() {
	// set current filter to favorite filter cookie
}

function loadSources() {
	
	alert(sources.length);
}

function showStream() {

	//getting the video element
	var video = document.querySelector('video');
	
	//callback function
	var errorCallback = function(e) {
		alert("No camera found!");
	};
	
	//stream function
	var functionStream = function(stream) {
		video.src = window.URL.createObjectURL(stream);
	}
  
	//cross browser taking user media
	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	MediaStreamTrack.getSources(function(sourceInfos) {
		//var audioSource = null;
		var videoSource = null;

		for (var i = 0; i != sourceInfos.length; ++i) {
			
			var sourceInfo = sourceInfos[i];
			
			if (sourceInfo.kind === 'audio') {
				//handle audio source				
			} else if (sourceInfo.kind === 'video') {
				alert("Video source " + sourceInfo.id + "" +  sourceInfo.label || 'camera' + " found");
				
				//console.log(sourceInfo.id, sourceInfo.label || 'camera');

				sources.push(sourceInfo.id);
				videoSource = sourceInfo.id;
			} else {
				// Handle other source
			}
		}
		sourceSelected(sources[1]);
	});
	
	alert(sources.length);

	function sourceSelected(videoSource) {
		var constraints = {
			audio: false,
			video: {optional: [{sourceId: videoSource}]}
		};
		navigator.getUserMedia(constraints, functionStream, errorCallback);
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
