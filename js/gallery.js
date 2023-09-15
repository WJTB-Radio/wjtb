document.addEventListener("page-content-loaded", (e) => {
	let gallery = document.getElementById("gallery");
	let gallery_top = document.getElementById("gallery-top");
	if(gallery) {
		make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/gallery.json", got_gallery);
	}
	if(gallery_top) {
		make_request_nocache("https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/gallery_top.json", got_gallery);
	}
});

function got_gallery() {
	let gallery = document.getElementById("gallery");
	if(!gallery) {
		gallery = document.getElementById("gallery-top");
		if(!gallery) {
			return;
		}
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
