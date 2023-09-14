document.addEventListener("page-content-loaded", (e) => {
	let gallery = document.getElementById("gallery");
	if(!gallery) {
		return;
	}
	make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/gallery.json", got_gallery);
});

function got_gallery() {
	let gallery = document.getElementById("gallery");
	if(!gallery) {
		return;
	}
	let photos = JSON.parse(this.responseText)["photos"];
	let text = "";
	for(let photo of photos) {
		// alt="" is best here because we have the caption underneath
		text += `
			<div class="gallery-image">
				<img src="${photo["image"]}" alt="" />
				<p class="gallery-caption">${photo["caption"]}</p>
				<p class="gallery-date">${photo["date_taken"]}</p>
			</div>
		`;
	}
	gallery.innerHTML = text;
}
