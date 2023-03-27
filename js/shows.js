// all of the libraries to do this are very general purpose, and so have a lot of bloat for our purposes
// please keep this updated if we ever change our dst rules
// here be dragons
function get_nyc_time() {
	let d = new Date();
	let secondSundayOfMarch = new Date(d.getFullYear(), 2, 1);
	// advance by two sundays, one day at a time
	for(let i = 0; i < 2; i++) {
		while(secondSundayOfMarch.getDay() != 0) {
			secondSundayOfMarch.setDate(secondSundayOfMarch.getDate() + 1);
		}
		secondSundayOfMarch.setDate(secondSundayOfMarch.getDate() + 1);
	}
	secondSundayOfMarch.setDate(secondSundayOfMarch.getDate() - 1);
	// obv, exact times arent too important since we arent running shows at 2am, but this should be correct i think
	secondSundayOfMarch.setHours(2);
	let firstSundayOfNovember = new Date(d.getFullYear(), 10, 1);
	// advance until we reach the first sunday
	while(firstSundayOfNovember.getDay() != 0) {
		firstSundayOfNovember.setDate(firstSundayOfNovember.getDate() + 1);
	}
	firstSundayOfNovember.setHours(2);
	let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	
	let offset = -5;
	if(d > secondSundayOfMarch && d < firstSundayOfNovember) {
		offset = -4;
	}
	var nyc = new Date(utc + (3600000*offset));
	var nyc_seconds = nyc.getHours()*60*60+nyc.getMinutes()*60+nyc.getSeconds();
	return nyc_seconds;
}

function got_playing() {
	let data = JSON.parse(this.responseText);
	const now_playing = document.getElementById("nowplaying");
	if(data["error"] == "") {
		now_playing.textContent = "Now Playing: " + data["name"];
	} else {
		now_playing.textContent = "";
	}
	// schedule another request for the currently playing show
	// leave a buffer of at least 30 seconds to give the server time to update
	setTimeout(get_playing, 1000*Math.max((data["end_time"]-get_nyc_time()) + (Math.random()*30.0+30.0), 30));
}

function got_shows() {
	let data = JSON.parse(this.responseText);
}

function get_playing() {
	make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/playing.json", got_playing);
}

function get_shows(day) {
	make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/" + day + ".json", got_shows);
}

function make_request_nocache(url, callback) {
	const req = new XMLHttpRequest();
	req.addEventListener("load", callback);
	// make sure we dont cache
	url = url + (/\?/.test(url) ? "&" : "?") + new Date().getTime();
	req.open("GET", url);
	req.send();	
}

window.addEventListener("DOMContentLoaded", (e) => {
	get_playing()
});
