document.addEventListener("page-content-loaded", (e) => {
	let past_events = document.getElementById("past-events");
	if(!past_events) {
		return;
	}
	make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/past_events.json", got_past_events);
});

function got_past_events() {
	let past_events = document.getElementById("past-events");
	if(!past_events) {
		return;
	}
	let events = JSON.parse(this.responseText)["events"];
	let text = "";
	for(let event of events) {
		let images = event["images"].split(" ");
		let images_text = "";
		for(let image of images) {
			images_text += `
				<div class="past-event-img"><img src="${image}" alt="Image from ${event["name"]}"></img></div>
			`;
		}
		text += `
			<div class="past-event">
				<h2 class="past-event-name">${event["name"]}</h2>
				<div class="past-event-images">
					${images_text}
				</div>
				<p class="past-event-date">${event["date"]}</p>
				<p class="past-event-desc">${event["desc"]}</p>
			</div>
		`;
	}
	past_events.innerHTML = text;
}
