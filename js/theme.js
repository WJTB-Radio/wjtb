const themes = [
	{
		"name": "dark",
		"desc": "Easy on the eyes.",
		"lightmode":false,
		"style": `
			--bg-color: #0d0d0d;
			--bg2-color: #181818;
			--bg3-color: #242424;
			--text-color: #cfcfcf;
			--text-shadow-color: #696969;
			--text-light-color: #888888;
			--accent-color: #ce2328;
			--accent-shadow-color: #721114;
			--accent2-color: #eded50;
			--iframe-bg-color: #eeeeee;	
		`,
	},
	{
		"name":"light",
		"desc": "Just like paper.",
		"lightmode":true,
		"style":`
			--bg-color: #ffffff;
			--bg2-color: #f5f5f5;
			--bg3-color: #f0f0f0;
			--text-color: #111111;
			--text-shadow-color: #18181878;
			--text-light-color: #444444;
			--accent-color: #ce2328;
			--accent-shadow-color: #721114;
			--accent2-color: #ce2328;
			--iframe-bg-color: #eeeeee00;	
		`,
	},
	{
		"name":"pink",
		"desc":"It looks pretty cool.",
		"lightmode":true,
		"style":`
			--bg-color: #ffefef;
			--bg2-color: #ffebeb;
			--bg3-color: #ffe0e0;
			--text-color: #111111;
			--text-shadow-color: #18181878;
			--text-light-color: #444444;
			--accent-color: #ce2328;
			--accent-shadow-color: #721114;
			--accent2-color: #f9262d;
			--iframe-bg-color: #eeeeee00;	
		`,
	},
	{
		"name":"red",
		"desc":"What if it was like dark, but more?",
		"lightmode":false,
		"style":`
			--bg-color: #1c0000;
			--bg2-color: #260000;
			--bg3-color: #300;
			--text-color: #cfcfcf;
			--text-shadow-color: #696969;
			--text-light-color: #888888;
			--accent-color: #ce2328;
			--accent-shadow-color: #721114;
			--accent2-color: #ed5050;
			--iframe-bg-color: #eeeeee;
		`,
	},
];

function selectTheme(id) {
	let theme = themes[id];
	document.body.setAttribute("class", theme["lightmode"]?"lightmode":"");
	document.body.setAttribute("style", theme["style"]);
	setCookie("theme", id.toString());
}

let currentTheme = parseInt(getCookie("theme", "0"));
function nextTheme() {
	currentTheme = (currentTheme + 1) % themes.length;
	selectTheme(currentTheme);
}

selectTheme(currentTheme);

document.addEventListener("page-content-loaded", (e) => {
	let themebox = document.getElementById("theme-list");
	if(!themebox) {
		return;
	}
	let elements = "";
	let i = 0;
	for(const theme of themes) {
		elements += `
			<div class="theme-selector">
				<btn onclick="selectTheme(${i})" class="theme-button" style="${theme["style"]}" title="Apply ${theme["name"]} theme."></btn>
				<div class="theme-info">
					<h2 class="theme-name">${theme["name"]}</h2>
					<p class="theme-desc">${theme["desc"]}</p>
				</div>
			</div>
		`;
		i++;
	}
	themebox.innerHTML = elements;
	add_keyboard_events_for_buttons();
});
