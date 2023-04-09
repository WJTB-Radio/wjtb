// all of the libraries to do this are very general purpose, and so have a lot of bloat for our purposes
// please keep this updated if we ever change our dst rules
// here be dragons
function get_nyc_date() {
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
	return nyc;
}

function get_nyc_time() {
	var nyc = get_nyc_date();
	var nyc_seconds = nyc.getHours()*60*60+nyc.getMinutes()*60+nyc.getSeconds();
	return nyc_seconds;
}

function get_nyc_weekday() {
	var nyc = get_nyc_date();
	return nyc.getDay()-1;
}

function got_playing() {
	let data = JSON.parse(this.responseText);
	const now_playing = document.getElementById("nowplaying");
	const now_playing_box = document.getElementById("nowplayingbox");
	if(data["error"] == "") {
		now_playing.textContent = "Now Playing: " + data["name"];
		now_playing_box.style.display = "block";
	} else {
		now_playing.textContent = "";
		now_playing_box.style.display = "none";
	}
	// schedule another request for the currently playing show
	// leave a buffer of at least 30 seconds to give the server time to update
	setTimeout(get_playing, 1000*Math.max((data["end_time"]-get_nyc_time()) + (Math.random()*30.0+30.0), 30));
}

function format_time(time) {
	let hours = Math.floor(time / (60*60));
	let minutes = String((time/60)%60).padStart(2, '0');
	let suffix = "am";
	if(hours > 12) {
		hours -= 12;
		suffix = "pm";
	} else if(hours == 12) {
		suffix = "pm";
	}
	if(hours == 0) {
		hours = 12;
		suffix = "am";
	}
	return `${hours}:${minutes}${suffix}`
}

function format_times(start_time, end_time, day) {
	let start_time_formatted = format_time(start_time);
	let end_time_formatted = format_time(end_time);
	day = day.charAt(0).toUpperCase() + day.slice(1);
	return `${start_time_formatted} - ${end_time_formatted} Every ${day}`
}

const days_of_week = ["monday", "tuesday", "wednesday", "thursday", "friday"];
function create_show_content(show, day) {
	let cancelled = "";
	let playing = "";
	let cancelled_msg = "";
	if(show["is_running"] != 1) {
		cancelled = " cancelled";
		cancelled_msg = "<p class=\"cancelled_msg\">This week's show has been cancelled.</p>";
	} else {
		let cur_day = get_nyc_weekday();
		if(cur_day < days_of_week.length && cur_day >= 0 && day == days_of_week[cur_day]) {
			let cur_time = get_nyc_time();
			if(cur_time >= show["start_time"] && cur_time <= show["end_time"]) {
				playing = " playing";
			}
		}
	}
	return `<div class="show${cancelled}${playing}">
		<div class="showbg"></div>
		<div class="postercontainer">
		<img src="${show["poster"]}" alt="poster for ${show["name"]}" class="showposter"></img>
		</div>
		<div class="showinfo">
		<h2 class="showname">${show["name"]}</h2>
		<p class="hosts show">Hosted by ${show["hosts"]}</p>
		<p class="showtimes">${format_times(show["start_time"], show["end_time"], day)}</p>
		${cancelled_msg}
		<p class="showdesc">${show["desc"]}</p>
		</div>
		</div>`;
}

function got_shows() {
	let data = JSON.parse(this.responseText);
	let shows = data["shows"];
	let day = data["day"]
	let total_contents = `<div class="showbox">`;
	for(let i = 0; i < shows.length; i++) {
		let content = create_show_content(shows[i], day);
		total_contents += content;
	}
	total_contents += "</div>"
	let show_element = document.getElementById("shows");
	if(show_element) {
		show_element.innerHTML = total_contents;
	}
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

