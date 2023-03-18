function supports_history_api() {
	return !!(window.history && history.pushState);
}

// when the website is refreshed/loaded for the first time
window.addEventListener("load", function() {
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
// replace the contents of the page using ajax
function loadPage(page, pushHistory=true) {
	if(page == "") {
		page = "home"
	}
	closeMenu();
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		document.getElementById("output").innerHTML = this.responseText;
		postLoad(page);
	}
	xhttp.open("GET", "/pages/"+page+".html");
	xhttp.send();
	window.scrollTo(0, 0);
	if(supports_history_api()) {
		// set the url bar to a different url
		if(pushHistory) {
			history.pushState({"page":page}, null, "/"+page);
		}
	}
}

function postLoad(page) {
	if(page == "home") {
		randomizeSplash();
	}
	document.dispatchEvent(pageContentLoadedEvent);
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
	loadPage("sound-request");
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

