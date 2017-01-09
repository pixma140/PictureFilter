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

/*
function doStuff() {
	
	var videoElement = document.querySelector('video');
	var switchButton = document.getElementById('buttonSwitchCamera');

	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


	// method to get all video sources
	function gotSources(sourceInfos) {
		
		alert("i am inside do stuff got sources");
		
		for (var i = 0; i !== sourceInfos.length; ++i) {
		
			alert("i am inside do stuff got sources inside loop");
		
			var sourceInfo = sourceInfos[i];
			
			if (sourceInfo.kind === 'video') {
				sources.push(sourceInfo);
				alert("i am inside do stuff got sources inside loop and true case video");
			} else {
				alert("i am inside do stuff got sources inside loop and false case video");
				console.log('Some other kind of source: ', sourceInfo);
			}
		}
	}
	
	if (sources[0] == "") {
		alert("text");
	} else {
	alert("id: "};
	}

	if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
		alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
	} else {
		MediaStreamTrack.getSources(gotSources);
	}

	function successCallback(stream) {
		window.stream = stream; // make stream available to console
		videoElement.src = window.URL.createObjectURL(stream);
		videoElement.play();
	}

	function errorCallback(error) {
		alert("Error callback");
		console.log('navigator.getUserMedia error: ', error);
	}

	function start() {
		if (window.stream) {
				videoElement.src = null;
				window.stream.stop();
		}
		
		var videoSource = sources[0].value; // videoSelect.value;
		var constraints = {audio: false, video: {optional: [{sourceId: videoSource}]}};
		navigator.getUserMedia(constraints, successCallback, errorCallback);
	}
	
	switchButton.onclick = start;

	start();
} */

function loadSources() {
	
	//cross browser taking user media
	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	
	MediaStreamTrack.getSources(function(sourceInfos) {
		//var audioSource = null;
		var videoSource = null;

		for (var i = 0; i != sourceInfos.length; ++i) {
			
			var sourceInfo = sourceInfos[i];
			
			if (sourceInfo.kind === 'audio') {
				alert("Audio source found!");
				
			} else if (sourceInfo.kind === 'video') {
				alert("Video source " + sourceInfo.id + "" +  sourceInfo.label || 'camera' + " found");
				
				console.log(sourceInfo.id, sourceInfo.label || 'camera');

				sources.push(sourceInfo.id);
				videoSource = sourceInfo.id;
			} else {
				//console.log('Some other kind of source: ', sourceInfo);
				alert("Some other source");
			}
		}		
	});
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
	
	
	var constraints = {
		audio: false,
		video: {optional: [{sourceId: sources[0]}]}
	};
	
	navigator.getUserMedia(constraints, functionStream, errorCallback);

	/*
	//stream input
	if (navigator.getUserMedia) {
		navigator.getUserMedia(constraints, functionStream, errorCallback);
	} else {
		alert("Fail");
		// video.src = 'somevideo.webm'; // fallback.
	}
	*/
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
