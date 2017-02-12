// current filter vars
var lastFilter;
var currentFilter;
var currentFilterPos;

//TODO: add more filters
//array containing the filters
var filters = new Array("none","hue-rotate(90deg)","hue-rotate(180deg)","hue-rotate(270deg)","invert(100%)","contrast(50%)","brightness(50%)","grayscale(50%)","opacity(50%)","sepia(50%)","blur(3px)","blur(5px)","saturate(8)","saturate(250%)","brightness(200%)","contrast(200%)","grayscale(100%)","sepia(100%)","contrast(200%) brightness(150%)"); //"drop-shadow(5px 5px 5px rgba(0,0,0,0.5))");

// current source
var currentSource = 0;
var sourceCounter = 0;
var numberOfSources = 0;

var inTakePicture = false;

function initialize() {	
	
	// check if cookie favorite filter is set
	if(getCookie("lastFilter") == ""){
		// set last filter to no filter
		
		createCookie('lastFilter','0', 20);
		//document.cookie="lastFilter=0";
		
		lastFilter = 0;		
		
	} else {
		// get last filter
		lastFilter = getCookie("lastFilter");			
	}
	
	currentFilterPos = lastFilter;
	currentFilter = filters[lastFilter];
		
	//document.getElementById("myPic").setAttribute("style", "filter:" + currentFilter);
	document.getElementById("myVideo").setAttribute("style", "filter:" + currentFilter);
	
	//alert((currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter);
	
	document.getElementById('filterDebugLabel').innerHTML = (currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter;
	
	// TODO always update last filter
}

// function that handles back button
function buttonBackPressed() {
	
	inTakePicture = false;
	
	document.getElementById('myVideo').style.display = "center";
	document.getElementById('buttonNewPicture').style.display = "block";
	document.getElementById('buttonSwitchCamera').style.display = "block";
	document.getElementById('myCanvas').style.display = "none";
	document.getElementById('buttonBack').style.display = "none";
	document.getElementById('buttonSave').style.display = "none";
	
	//TODO button back pressed routine, put canvas away and show stream again
}

// function that switches filters
function switchFilter() {		
	//update last used filter to cookie
	//document.cookie="lastFilter=" + currentFilterPos;
	createCookie('lastFilter',currentFilterPos, 20);	
	
	//TODO: make vibration work everywhere
	window.navigator.vibrate = window.navigator.vibrate || window.navigator.webkitVibrate || window.navigator.mozVibrate || window.navigator.msVibrate;
	
	if ("vibrate" in window.navigator) {		
		window.navigator.vibrate(30);		
	} else {
		alert("Vibration not supported");
	}

	document.getElementById("myVideo").setAttribute("style", "filter:" + currentFilter);
	document.querySelector('canvas').setAttribute("style", "filter:" + currentFilter);	
	//document.getElementById("myFramePicture").setAttribute("style", "filter:" + currentFilter);	
	//document.getElementById("myPic").setAttribute("style", "filter:" + currentFilter);
	
	if (!inTakePicture) {
		document.getElementById('myCanvas').style.display = "none";
		document.getElementById('myVideo').style.display = "center";
	} else {
		document.getElementById('myVideo').style.display = "none";
		document.getElementById('myCanvas').style.display = "center";
	}
		
	//TODO: Make toast for which filter is set instead of alert
	//alert((currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter);
	document.getElementById('filterDebugLabel').innerHTML = (currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter;
}

// function to handle camera switch
function buttonSwitchKameraPressed() {			
	alert("buttonSwitchKameraPressed");	
	
	/*
	alert(currentSource + "/" + numberOfSources);
	
	currentSource++;
	
	if (currentSource > numberOfSources) {
		currentSource = 0;		
	}
	
	alert(currentSource + "/" + numberOfSources);
	
	location.reload(true);
	//showStream();	
	doStuff(); */
}

// function to take snapshot from video
function buttonNewPicturePressed() {
	//alert("buttonNewPicturePressed");
	inTakePicture = true;
	
	//button handling
	document.getElementById('myVideo').style.display = "none";
	document.getElementById('buttonNewPicture').style.display = "none";
	document.getElementById('buttonSwitchCamera').style.display = "none";
	document.getElementById('buttonBack').style.display = "block";
	document.getElementById('buttonSave').style.display = "block";
	document.getElementById('myCanvas').style.display = "center";
	
	// get stuff
	var myVideo = document.querySelector('video');
	var canvas = document.querySelector('canvas');	
	var myPic = document.getElementById('myFramePicture');
        
	// set canvas stuff
	canvas.width = myVideo.clientWidth;
	canvas.height = myVideo.clientHeight;
	
	// get context
	var c = canvas.getContext("2d");
	c.drawImage(myVideo, 0, 0, canvas.width, canvas.height);
			
	//myPic.src = canvas.toDataURL("image/png");
			
	//alert("ich komme bis hier");
	//document.getElementById('myFramePicture').src = "img\pokemon.jpg";	
}

// function to handdle save pressed
function buttonSavePressed() {
	//alert("buttonSavePressed");
	inTakePicture = false;	
	
	document.getElementById('myVideo').style.display = "center";
	document.getElementById('myVideo').poster = "img\\pokemon.jpg";
	
	document.getElementById('buttonNewPicture').style.display = "block";
	document.getElementById('buttonSwitchCamera').style.display = "block";
	document.getElementById('buttonBack').style.display = "none";
	document.getElementById('buttonSave').style.display = "none";
	document.getElementById('myCanvas').style.display = "none";
   
   // save images with date
}

function setFavoriteFilter() {
	// set current filter to favorite filter cookie
}

function loadSources() {	
	//alert(sources.length);
}

//loads last camera to video
function showStream() {

	//getting the video element
	var video = document.querySelector('video');
	sourceCounter = 0;
	numberOfSources = 0;
	
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
	
	//zurückkommentieren wenn fail
	//var videoSource = null;
	
	/*	
	
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		console.log("enumerateDevices() not supported.");	
	}
	
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
				
				sourceCounter++;
				numberOfSources++;
				
				alert(currentSource + "/" + numberOfSources);	
				
				//if (currentSource == sourceCounter) {
					//alert("i am here");
					videoSource = sourceInfo.id;
					//break;
				//}
				
				//console.log(sourceInfo.id, sourceInfo.label || 'camera');
			} else {
				// Handle other source
			}		
			
		}
		sourceSelected(videoSource);
	}); 

	function sourceSelected(videoSource) {
		var constraints = {
			audio: false,
			video: {optional: [{sourceId: videoSource}]}
		};
		navigator.getUserMedia(constraints, functionStream, errorCallback);
	} 	
}

// device motion handling for filter change
var pos = 0;
var lastGamma = 0;
//var lastAction = new Date();
window.addEventListener("deviceorientation", turnIt, true);

function turnIt(event){
	var minGamma = 25;
	var resetGamma = 15;
	var gamma = event.gamma;
	if (gamma>=-resetGamma && gamma <= resetGamma) lastGamma=0;
	if (lastGamma<=-minGamma && gamma <=-minGamma) return;
	if (lastGamma>=minGamma && gamma >=minGamma) return;
	if (gamma>=minGamma || gamma<=-minGamma) {
		
		gamma > 0 ? buttonForwardPressed() : buttonBackwardPressed();
		
		/*
		pos += gamma > 0 ? 1 : -1;
		if (pos == 1) {
			buttonForwardPressed();
			alert("forward");
		} else {
			buttonBackwardPressed();
			alert("backward");
		} */
		
		lastGamma = gamma;
	}
}

// function to get date
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

// function to create cookie
function createCookie(name,value,days) {
     if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
     }
     else var expires = "";
     document.cookie = name+"="+value+expires+";";
}

// function to get cookie
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

// function that handles backward button
function buttonBackwardPressed() {
	//alert("buttonBackwardPressed");
	
	currentFilterPos--;		
	
	if (currentFilterPos == -1) {
		currentFilterPos = filters.length-1;
		currentFilter = filters[currentFilterPos];
	} else {
		currentFilter = filters[currentFilterPos];
	}
	
	switchFilter();
}


// function that handles forward button
function buttonForwardPressed() {
	//alert("buttonBackwardPressed");
	
	currentFilterPos++;
	
	if (currentFilterPos == filters.length) {
		currentFilterPos = 0;
		currentFilter = filters[currentFilterPos];
	} else {
		currentFilter = filters[currentFilterPos];
	}	
	
	switchFilter();
}

// do stuff
function doStuff() {
	
	//getting the video element
	var video = document.querySelector('video');
	sourceCounter = 0;
	numberOfSources = 0;
	
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
		var videoSourcee = null;

		for (var i = 0; i != sourceInfos.length; ++i) {
			
			var sourceInfo = sourceInfos[i];
			
			if (sourceInfo.kind === 'audio') {
				//handle audio source				
			} else if (sourceInfo.kind === 'video') {
				alert("Video source " + sourceInfo.id + "" +  sourceInfo.label || 'camera' + " found");
				
				sourceCounter++;
				numberOfSources++;
								
				
				videoSourcee = sourceInfo.id;
				//break;
				
				if (sourceCounter == 1) {
					//alert("i am hereee");
					alert(videoSourcee + "/");
					sourcesSelected(videoSourcee);
				}
				
				
				//console.log(sourceInfo.id, sourceInfo.label || 'camera');
			} else {
				// Handle other source
			}		
			
		}
		//sourcesSelected(videoSourcee);
	}); 

	function sourcesSelected(videoSourcee) {
		var constraints = {
			audio: false,
			video: {optional: [{sourceId: videoSourcee}]}
		};
		navigator.getUserMedia(constraints, functionStream, errorCallback);
	} 
}
