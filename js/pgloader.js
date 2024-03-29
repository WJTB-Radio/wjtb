function supports_history_api() {
	return !!(window.history && history.pushState);
}

// when the website is refreshed/loaded for the first time
window.addEventListener("DOMContentLoaded", function() {
	split = window.location.pathname.split("/");
	page = "";
	for(i = 0; i < split.length; i++) {
		if (split[i] != "") {
			page = split[i];
			break;
		}
	}
	if(supports_history_api()) {
		history.replaceState({"page":page}, null, "/"+page);
	}
	postLoad(page);
});

const pageContentLoadedEvent = new Event("page-content-loaded", {
	bubbles: true,
	cancellable: true,
	composed: false,
});

var isFirstPageLoad = true;
var isPageLoading = false;
var prev_page = "home";
// replace the contents of the page using ajax
function loadPage(page, pushHistory=true) {
	isPageLoading = true;
	if(page == "shows") {
		let date = get_nyc_date();
		switch(date.getDay()) {
			case 0:
				// sunday
				page = "monday";
				break;
			case 1:
				page = "monday";
				break;
			case 2:
				page = "tuesday";
				break;
			case 3:
				page = "wednesday";
				break;
			case 4:
				page = "thursday";
				break;
			case 5:
				page = "friday";
				break;
			case 6:
				// saturday
				page = "monday";
				break;
		}
	}
	if(page == "") {
		page = "home";
	}
	closeMenu();
	let days_of_week = ["monday", "tuesday", "wednesday", "thursday", "friday"];
	if(!(days_of_week.includes(page) && days_of_week.includes(prev_page))) {
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			document.getElementById("output").innerHTML = this.responseText;
			postLoad(page);
		}
		xhttp.open("GET", "/pages/"+page+".html");
		xhttp.send();
	} else {
		postLoad(page);
	}
	if(supports_history_api()) {
		// set the url bar to a different url
		if(pushHistory) {
			history.pushState({"page":page}, null, "/"+page);
		}
	}
}

function postLoad(page) {
	isPageLoading = false;
	if(page == "home" || page == "") {
		randomizeSplash();
	}
	if(page == "monday" || page == "tuesday" || page == "wednesday" || page == "thursday" || page == "friday") {
		get_shows(page);
	} else {
		window.scrollTo(0, 0);
	}
	document.dispatchEvent(pageContentLoadedEvent);
	prev_page = page;
}

// make the back button work properly on the site
window.addEventListener("popstate", function(e) {
	if(e.state != null) {
		loadPage(e.state.page, false);
	} else {
		loadPage("home", false);
	}
});

function loadHome() {
	loadPage("home");
}

// Programming category
function loadShows() {
	loadPage("shows");
}

function loadVariety() {
	loadPage("variety");
}

function loadJoin() {
	loadPage("join");
}

// Events  category

function loadUpcoming() {
	loadPage("upcoming-events");
}

function loadPast() {
	loadPage("past-events");
}

function loadSoundRequest() {
	loadPage("request");
}

function loadGallery() {
	loadPage("gallery");
}

// About category

function loadStaff() {
	loadPage("staff");
}
function loadHistory() {
	loadPage("history");
}

function loadContact() {
	loadPage("contact");
}

function loadShowRequest() {
	loadPage("show-request");
}

function loadTheme() {
	loadPage("themes");
}

function loadMondays() {
	loadPage("monday");
}
function loadTuesdays() {
	loadPage("tuesday");
}
function loadWednesdays() {
	loadPage("wednesday");
}
function loadThursdays() {
	loadPage("thursday");
}
function loadFridays() {
	loadPage("friday");
}

