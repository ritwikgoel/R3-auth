
URL = window.URL || window.webkitURL;

var gumStream; 					
var rec; 							
var input; 							

var AudioContext = window.AudioContext || window.webkitAudioContext;


var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);

function startRecording() {
	console.log("recordButton clicked");

	
    
    var constraints = { audio: true, video:false }

 	

	recordButton.disabled = true;
	stopButton.disabled = false;
	pauseButton.disabled = false

	

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		
		audioContext = new AudioContext();
		gumStream = stream;
		
		input = audioContext.createMediaStreamSource(stream);
		rec = new Recorder(input,{numChannels:1})
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
    	recordButton.disabled = false;
    	stopButton.disabled = true;
    	pauseButton.disabled = true
	});
}

function pauseRecording(){
	console.log("pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		pauseButton.innerHTML="Resume";
	}else{
		//resume
		rec.record()
		pauseButton.innerHTML="Pause";

	}
}

function stopRecording() {
	
	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML="Pause";
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	//alert(url)
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');
	link.setAttribute("id", "linkofaudio");


	//name of .wav file to use during upload and download (without extendion)
	var filename = "audio";

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Process furthur";
    //run the script here
    //wait 1 sec
    //run script to cli 

	//add the new audio element to li
	li.appendChild(au);
	
	//add the filename to the li
	li.appendChild(document.createTextNode(filename+".wav "))
	//button click here automatically 
	

	//add the save to disk link to li
	li.appendChild(link);
	


	//add the li element to the ol
	recordingsList.appendChild(li);
	document.getElementById("linkofaudio").click();
}

