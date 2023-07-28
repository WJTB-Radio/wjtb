document.addEventListener("page-content-loaded", (e) => {
	let staff_box = document.getElementById("staff-box");
	if(!staff_box) {
		return;
	}
	console.log("staff box found");
	make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/staff.json", got_staff);
});

function got_staff() {
	console.log("got staff");
	let staff_box = document.getElementById("staff-box");
	if(!staff_box) {
		return;
	}
	let staff_list = JSON.parse(this.responseText)["staff"];
	let text = "";
	for(let s of staff_list) {
		text += `
			<div class="staffCard">
				<div class="image">
					<img src="${s["image"]}" alt="Photo of ${s["name"]}" />
				</div>
				<div class="card_contents">
					<h2>${s["name"]}</h2>
					<p class="title">${s["position"]}</p>
					<p class="flavor">${s["flavor"]}</p>
				</div>
			</div>
		`;
	}
	staff_box.innerHTML = text;
}
