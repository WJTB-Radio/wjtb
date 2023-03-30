//const magic_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]_-+=\\|:;\"'1234567890!@#$%^&*()/?`~";
const magic_chars = "1234567890";

function get_magic_text(len) {
	let s = "";
	for(let i = 0; i < len; i++) {
		s += magic_chars[Math.floor(Math.random()*magic_chars.length)];
	}
	return s;
}

var magic_intervals = []
document.addEventListener("page-content-loaded", (e) => {
	for(let id in magic_intervals) {
		clearInterval(id);
	}
	const magic_texts = document.getElementsByClassName("magictext");
	for (let i = 0; i < magic_texts.length; i++) {
		let element = magic_texts[i];
		const len = element.innerText.length;
		element.innerText = get_magic_text(len);
		magic_intervals.push(setInterval(()=>{
			element.innerText = get_magic_text(len);
		}, 20));
	}
});
