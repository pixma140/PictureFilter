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

	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		console.log("enumerateDevices() not supported.");	
	}
	
	var videoSource = null;

	/*
	//list cameras and microphones.
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
		devices.forEach(function(device) {
			
			if (device.kind === 'videoinput') {				
				videoSource = device.deviceId;
				sources.push(device.deviceId);
				alert(device.kind + ": " + device.label + " id = " + device.deviceId);				
			}			
		});
	}).catch(function(err) {
		alert(err.name + ": " + err.message);		
	});
	
	sourceSelected(sources[1]); */
	
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
	
	//alert(sources.length);

	function sourceSelected(videoSource) {
		var constraints = {
			audio: false,
			video: {optional: [{sourceId: videoSource}]}
		};
		navigator.getUserMedia(constraints, functionStream, errorCallback);
	} 
}

var pos = 0;
var lastAction=new Date();
var myField = ["1","2","3","4","5","6"];
var lastGamma=0;

function turnIt(event){
	var minGamma = 25;
	var resetGamma = 15;
	var gamma = event.gamma;
	if (gamma>=-resetGamma && gamma <= resetGamma) lastGamma=0;
	if (lastGamma<=-minGamma && gamma <=-minGamma) return;
	if (lastGamma>=minGamma && gamma >=minGamma) return;
	if (gamma>=minGamma || gamma<=-minGamma) {
	pos += gamma > 0 ? 1 : -1;
	pos = pos > images.length-1 ? 0 : pos < 0 ? images.length-1 : pos;
	alert("i am here");
	document.getElementById('buttonSwitchCamera').value = myField[pos];
	lastGamma=gamma;
	}
}

window.addEventListener("deviceorientation", turnIt, true);

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
