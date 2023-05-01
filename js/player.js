// Possible improvements:ut sliders, reskinned
// - Change into Vue or React component
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");

const audio = new Audio(
	"https://stream.njit.edu:8000/stream1.mp3"
);
audio.setAttribute("crossorigin", "anonymous");

let using_analyser = false;
let analyser;
let audioCtx;
let analyserBars = [];
let analyser_iid = 0;
let analyserSource;
function startAnalyser() {
	if(audioCtx) {
		if(audioCtx.state === "suspended") {
			audioCtx.resume();
		}
		start_analysing();
		return;
	}
	// setup the audio stuff
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	analyser = audioCtx.createAnalyser();
	analyser.fftSize = 512;
	analyserSource = audioCtx.createMediaElementSource(audio);
	analyserSource.connect(analyser);
	analyserSource.connect(audioCtx.destination);
	
	// create the analyser bars
	const analyserContainer = document.getElementById("analyser-container");
	// the upper third is very high frequency info, we dont want to use it
	let num_bars = analyser.frequencyBinCount*(2/3);
	for(let i = 0; i < num_bars; i++) {
		let bar = document.createElement("div");
		bar.setAttribute("class", "analyser-bar");
		analyserContainer.appendChild(bar);
		analyserBars.push(bar);
	}
	start_analysing();
}

function start_analysing(){
	if(analyser_iid != 0) {
		clearInterval(analyser_iid);
	}
	// do the analysis at a regular interval
	analyser_iid = setInterval(() => {
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteFrequencyData(dataArray);
		for(let i = 0; i < analyserBars.length; i++) {
			let amplitude = dataArray[i];
			let height = (amplitude*0.2) + 'px';
			let bar = analyserBars[i];
			bar.setAttribute("style","height:"+height);
			bar.style.height = height;
		}
	}, 1000/24); //24 fps
}

function stopAnalyser() {
	if(audioCtx) {
		audioCtx.suspend();
	}
	if(analyser_iid != 0){
		clearInterval(analyser_iid);
		analyser_iid = 0;
	}
	for(let i = 0; i < analyserBars.length; i++) {
		let height = '0px';
		let bar = analyserBars[i];
		bar.setAttribute("style","height:"+height);
		bar.style.height = height;
	}	
}

audio.addEventListener(
	"loadeddata",
	() => {
		audio.volume = 0.75;
	},
	false
);

function clamp(val, min, max){
	return Math.min(max, Math.max(min, val));
}

function setVolume(x) {
	x -= volumeSlider.getBoundingClientRect().x;
	const sliderWidth = parseInt(window.getComputedStyle(volumeSlider).width);
	if(sliderWidth == 0) {
		return;
	}
	const newVolume = clamp(x / sliderWidth, 0.0, 1.0);
	audio.volume = newVolume;
	audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + "%";
}

const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");

//click volume slider to change volume
volumeSlider.addEventListener(
	"mousedown",
	(e) => {
		dragging_volume = true;
		volumeSlider.classList.add("opened");
		setVolume(e.clientX);
	},
	false
);

let dragging_volume = false;

document.body.addEventListener(
	"mousemove", (e) => {
		if(dragging_volume && (1 & e.buttons) != 0) {
			setVolume(e.clientX);
		}
	}
);

document.body.addEventListener(
	"mouseup",
	(e) => {
		if(dragging_volume) {
			dragging_volume = false;
			setVolume(e.clientX);
			volumeSlider.classList.remove("opened");
		}
	}
);

document.body.addEventListener(
	"mouseleave", (e) => {
		dragging_volume = false;
		volumeSlider.classList.remove("opened");
	}
);


// toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
	"click", () => {
		if (audio.paused) {
			if(using_analyser) {
				startAnalyser();
			}
			audio.play();
			playBtn.classList.remove("play");
			playBtn.classList.add("pause");
			playBtn.setAttribute("title", "Stop listening to WJTB");
			playBtn.setAttribute("aria-label", "Stop listening to WJTB");
		} else {
			if(using_analyser) {
				stopAnalyser();
			}
			audio.pause();
			playBtn.classList.remove("pause");
			playBtn.setAttribute("title", "Listen to WJTB");
			playBtn.setAttribute("aria-label", "Listen to WJTB");
			playBtn.classList.add("play");
		}
	},
	false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
	const volumeEl = audioPlayer.querySelector(".volume-container .volume");
	audio.muted = !audio.muted;
	if (audio.muted) {
		volumeEl.classList.remove("icono-volumeMedium");
		volumeEl.classList.add("icono-volumeMute");
		volumeEl.setAttribute("title", "Unmute");
		volumeEl.setAttribute("aria-label", "Unmute");
		volumeSlider.classList.add("muted");
	} else {
		volumeEl.classList.add("icono-volumeMedium");
		volumeEl.classList.remove("icono-volumeMute");
		volumeEl.setAttribute("title", "Mute");
		volumeEl.setAttribute("aria-label", "Mute");
		volumeSlider.classList.remove("muted");
	}
});

//click on timeline to skip around
/*
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener(
	"click",
	(e) => {
		const timelineWidth = window.getComputedStyle(timeline).width;
		const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
		audio.currentTime = timeToSeek;
	},
	false
);

// check audio percentage and update time accordingly
setInterval(() => {
	const progressBar = audioPlayer.querySelector(".progress");
	if(audio.paused){
		progressBar.style.width = "100%";
	} else {
		progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
	}
}, 500);
*/

