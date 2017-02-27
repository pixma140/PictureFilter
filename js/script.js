// current filter vars
var lastFilter;
var currentFilter;
var currentFilterPos;

//TODO: add more filters
//array containing the filters
var filters = new Array("none","hue-rotate(90deg)","hue-rotate(180deg)","hue-rotate(270deg)","invert(100%)",
						"contrast(50%)","brightness(50%)","grayscale(50%)","opacity(50%)","sepia(50%)",
						"blur(3px)","blur(5px)","saturate(8)","saturate(250%)","brightness(200%)",
						"contrast(200%)","grayscale(100%)","sepia(100%)","contrast(200%) brightness(150%)");

var inTakePicture = false;

// initialize method
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
	
	// set current filter
	currentFilterPos = lastFilter;
	currentFilter = filters[lastFilter];
	
	// apply style from last filter to video
	document.getElementById("myVideo").setAttribute("style", "filter:" + currentFilter);
	//document.getElementById("myCanvas").setAttribute("style", "filter:" + currentFilter);
	
	// make unused buttons invisible
	document.getElementById('buttonBack').style.display = "none";
	document.getElementById('buttonSave').style.display = "none";
	
	// debug texts
	// alert((currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter);
	document.getElementById('filterDebugLabel').innerHTML = (currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter;
	
	// add event listener to button save send
	document.getElementById('myDownloadLink').addEventListener('click', buttonSavePressed, false);
	
	// get video and add shake listener
	start(0);
	shakeIt();
}

// function that handles back button
function buttonBackPressed() {
	
	inTakePicture = false;
		
	document.getElementById('buttonNewPicture').style.display = "block";
	document.getElementById('buttonSwitchCamera').style.display = "block";
	document.getElementById('buttonBack').style.display = "none";
	document.getElementById('buttonSave').style.display = "none";
	
	//TODO button back pressed routine, put canvas away and show stream again
}

// function that switches filters
function switchFilter() {		
	//update last used filter to cookie
	createCookie('lastFilter',currentFilterPos, 20);	
	
	// make vibration work everywhere
	window.navigator.vibrate = window.navigator.vibrate || window.navigator.webkitVibrate || window.navigator.mozVibrate || window.navigator.msVibrate;
	
	if ("vibrate" in window.navigator) {		
		window.navigator.vibrate(50);		
	} else {
		alert("Vibration not supported");
	}

	document.getElementById("myVideo").setAttribute("style", "filter:" + currentFilter);
	document.querySelector('canvas').setAttribute("style", "filter:" + currentFilter);	
	
	/*
	if (!inTakePicture) {
		document.getElementById('myCanvas').style.display = "none";
		document.getElementById('myVideo').style.display = "center";
	} else {
		document.getElementById('myVideo').style.display = "none";
		document.getElementById('myCanvas').style.display = "center";
	} */
		
	//TODO: Make toast for which filter is set instead of alert
	//alert((currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter);
	document.getElementById('filterDebugLabel').innerHTML = (currentFilterPos) + "/" + (filters.length - 1) + " " + currentFilter;
}

// function to handle camera switch
function buttonSwitchKameraPressed() {			
	//alert("buttonSwitchKameraPressed");		
	
	currentSource++;
	
	if (currentSource == videoSources.length) {
		currentSource = 0;	
	}
	
	start(currentSource);
}

// function to take snapshot from video
function buttonNewPicturePressed() {
	//alert("buttonNewPicturePressed");
	inTakePicture = true;
	
	//button handling
	document.getElementById('buttonNewPicture').style.display = "none";
	document.getElementById('buttonSwitchCamera').style.display = "none";
	document.getElementById('buttonBack').style.display = "block";
	document.getElementById('buttonSave').style.display = "block";
	
	// get stuff
	var myVideo = document.querySelector('video');
	var canvas = document.querySelector('canvas');	
        
	// set canvas stuff
	canvas.width = myVideo.clientWidth;
	canvas.height = myVideo.clientHeight;
	
	// get context
	var c = canvas.getContext("2d");
	c.drawImage(myVideo, 0, 0, canvas.width, canvas.height);	
}

// function to handdle save pressed
function buttonSavePressed() {
	//alert("buttonSavePressed");
	inTakePicture = false;	
	
	//button handling
	document.getElementById('buttonNewPicture').style.display = "block";
	document.getElementById('buttonSwitchCamera').style.display = "block";
	document.getElementById('buttonBack').style.display = "none";
	document.getElementById('buttonSave').style.display = "none";
	
	// variable declaration
	var canvas = document.getElementById("myCanvas");
	var myDownloadLink = document.getElementById("myDownloadLink");
	var filename = getDate() + "-" + currentFilter;
		
	// takes screenshot from canvas and writes into canvas
	html2canvas(document.querySelector("#myCanvas"), {canvas: canvas}).then(function(canvas) {            		
		//console.log('Drew on the existing canvas the following filter' + currentFilter);
	});
	
	// download process	
	var dt = canvas.toDataURL("image/jpeg");
	//var dt = canvas.toDataURL("image/png"); alt
	
	myDownloadLink.download = filename;
    this.href = dt; //this may not work in the future..
}

// variables for video
var videoSources = new Array();
var videoSoureCounter = 0;
var currentSource = 0;

// enumerating devices and writing into device list
function gotDevices(deviceInfos) {
	videoSources = [];
	videoSoureCounter = 0;
	
	for (var i = 0; i !== deviceInfos.length; ++i) {
		var deviceInfo = deviceInfos[i];
		
		if (deviceInfo.kind === 'videoinput') {  
			videoSources.push(deviceInfo.deviceId);
			videoSoureCounter++;
		}
	}
}

// error handing
function handleError(error) {
  alert("An error occured while reading devices");
}

// initial enumerate devices
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// function i have a stream
function gotStream(stream) {
  window.stream = stream; // make stream available to console
  document.querySelector('video').srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

//function to start the stream
function start(nbr) {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  
  //alert("try to set camera:" + nbr);
  
  //select video source
  var videoSource = videoSources[nbr];  
  
  var constraints = {
    audio: false,
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

// device motion handling for filter change
var lastAction = new Date();
function shakeIt() {
	window.ondevicemotion = function(coords) {
		var sensibility = 5;
		var minTime = 500;
		var accX = coords.acceleration.x;
		var time = new Date();
		if ((time - lastAction) < minTime) return;
		if (accX >= sensibility || accX <= -sensibility) {
			//alert("button switch");
			accX > 0 ? buttonForwardPressed() : buttonBackwardPressed();
			
			lastAction = time;
		}
	}
}

// function to get date
function getDate() {
	var date = new Date();

	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;

	var today = year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec;
	
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