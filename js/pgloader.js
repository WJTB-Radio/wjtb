// when the website is refreshed/loaded for the first time
window.addEventListener("load", function() {
	split = window.location.pathname.split("/");
	page = "home";
	for(i = 0; i < split.length; i++) {
		if (split[i] != "") {
			page = split[i];
			break;
		}
	}
   if(page in pageFiles) {
		loadPage(page, false);
	} else {
		loadPage("home", false);
	}
});

function supports_history_api() {
	return !!(window.history && history.pushState);
}

const pageContentLoadedEvent = new Event("page-content-loaded", {
	bubbles: true,
	cancellable: true,
	composed: false,
});

var isFirstPageLoad = true;
pageFiles = {"home":"/pages/home.html", "shows":"/pages/shows.html", "variety":"/pages/variety.html", "join":"/pages/join.html", "upcoming-events":"/pages/upcoming-events.html", "past-events":"/pages/past-events.html", "sound-request":"/pages/sound-request.html", "gallery":"/pages/gallery.html", "staff":"/pages/staff.html", "history":"/pages/history.html", "contact":"/pages/contact.html", "show-request":"/pages/show-request.html", "monday":"/pages/monday.html", "tuesday":"/pages/tuesday.html", "wednesday":"/pages/wednesday.html", "thursday":"/pages/thursday.html", "friday":"/pages/friday.html", "404":"/pages/404.html"}
// replace the contents of the page using ajax
function loadPage(page, pushHistory=true) {
	if(isFirstPageLoad) {
		// if this is the site we were linked to, we do not need to update the contents
		isFirstPageLoad = false;
		postLoad(page);
		return;
	}
	if(!(page in pageFiles)) {
		return;
	}
	closeMenu();
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		document.getElementById("output").innerHTML = this.responseText;
		postLoad(page);
	}
	xhttp.open("GET", pageFiles[page]);
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

