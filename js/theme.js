const themes = [
	{
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
];

function selectTheme(id) {
	let theme = themes[id];
	document.body.setAttribute("class", theme["lightmode"]?"lightmode":"");
	document.body.setAttribute("style", theme["style"]);
}

let currentTheme = parseInt(getCookie("theme", "0"));
function nextTheme() {
	currentTheme = (currentTheme + 1) % themes.length;
	selectTheme(currentTheme);
	setCookie("theme", currentTheme.toString());
}

selectTheme(currentTheme);
