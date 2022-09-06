function loadHome() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/home.txt")
    xhttp.send();
}

// Programming category
function loadShows() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/shows.txt")
    xhttp.send();
}

function loadVariety() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/variety.txt")
    xhttp.send();
}

function loadJoin() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/join.txt")
    xhttp.send();
}

// Events  category

function loadUpcoming() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/upcoming.txt")
    xhttp.send();
}

function loadPast() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/past.txt")
    xhttp.send();
}

function loadSoundRequest() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/soundrequest.txt")
    xhttp.send();
}

function loadGallery() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/gallery.txt")
    xhttp.send();
}

// About category

function loadStaff() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/staff.txt");
    xhttp.send();
}
function loadHistory() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/history.txt")
    xhttp.send();
}

function loadContact() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/contact.txt");
    xhttp.send();
}


function loadShowRequest() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("output").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./pages/showrequest.txt");
    xhttp.send();
}