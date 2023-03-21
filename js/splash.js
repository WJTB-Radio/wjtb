const splashes = [
	"Watching Jerma Twitch Broadcasts",
	"worms jorms torms borms",
	"We've Juiced The Boys",
	"We Just Take B's",
	"We enJoy The Boys",
	"What? Just The Bshow",
	"WJTBrian David Gilbert",
	"What Jesus Tried Being",
	"I <3 WJTB Radio",
	"What Just Took Blace",
	"Wingle Jingle Tingle Boop!",
	"Jersey Tech Broadcasting",
	"Wow! Jacob's Trying Bananas?",
	"Watch, Jeffrey's Taking the Bait",
	"Wow! Jungle Trap Break",
	"We Just TRYIN Bro",
	"Welcome John to Boston",
	"Whoops! Just The Berries",
	"Wjesse! James! Team Brocket",
	"Wonky, Jungle, Trap, Breakcore",
	"Wow, Jello Tastes Bad",
	"We Just Taste Burgers",
	"We Just Tread Beaches",
	"White Jeep Travel Bug",
	"With Jersey Twink Boys!",
	"wham jbam thankya bma'am",
	"WJTBottom Text",
	"Wow! Jungle Trance Breakbeat!",
	"Wmusic Jis TGood Blisten",
]

function getRandomInt(max) {
	max = Math.floor(max);
	return Math.floor(Math.random() * (max)); // The maximum is exclusive
}


function randomizeSplash() {
	let splash = document.getElementById("splash");
	splash.textContent = splashes[getRandomInt(splashes.length)];
}

function setCookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue;
}

function getCookie(cname, failure="") {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return failure;
}

document.addEventListener("page-content-loaded", (e) => {
	let splash = document.getElementById("splash");
	if(!splash) {
		return;
	}
	if(getCookie("splash-animation", "true") == "true") {
		splash.classList.add("splash-animation");
	} else {
		splash.classList.remove("splash-animation");
	}
	splash.addEventListener("click", (e) => {
		splash.classList.toggle("splash-animation");
		let c = "false";
		if(splash.classList.contains("splash-animation")) {
			c = "true";
		}
		setCookie("splash-animation", c);
	});
});

