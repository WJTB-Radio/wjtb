const themes = [
	{
		"name": "dark",
		"desc": "easy on the eyes.",
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
		"desc": "just like paper.",
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
		"desc":"it looks pretty cool.",
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
		"desc":"what if it was like dark, but more?",
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
	{
		"name":"trees and sun",
		"desc":"love from the theme.",
		"lightmode":false,
		"style":`
			--bg-color: #a2c9ea;
			--bg2-color: #8bb6de;
			--bg3-color: #beba71;
			--text-color: #ffffff;
			--text-shadow-color: #ffe5ba;
			--text-light-color: #888888;
			--accent-color: #ffe5ba;
			--accent-shadow-color: #ffb446;
			--accent2-color: #ffbe59;
			--iframe-bg-color: #eeeeee00;
		`,
	},
	{
		"name":"extra pink",
		"desc":"it's so pink!",
		"lightmode":false,
		"style":`
			--bg-color: #ffdbe8;
			--bg2-color: #ffcadd;
			--bg3-color: #ff9dcf;
			--text-color: #000;
			--text-shadow-color: #18181878;
			--text-light-color: #444444;
			--accent-color: #d32153;
			--accent-shadow-color: #721611;
			--accent2-color: #d32153;
			--iframe-bg-color: #eeeeee00;
		`,
	},
	{
		"name":"autumn",
		"desc":"it tastes like pumpkin spice.",
		"lightmode":false,
		"style":`
			--bg-color: #8e2610;
			--bg2-color: #aa3f0f;
			--bg3-color: #d55308;
			--text-color: #f0efb9;
			--text-shadow-color: #493615;
			--text-light-color: #efad26;
			--accent-color: #86b26b;
			--accent-shadow-color: #493615;
			--accent2-color: #eded50;
			--iframe-bg-color: #efad26;
`,
		"custom-css":`
			*{
				font-family:'garamond', serif;
			}
		`,
	},
	{
		"name":"spooky",
		"desc":"w boo t b",
		"lightmode":false,
		"style":`
			--bg-color: #1c1b21;
			--bg2-color: #252433;
			--bg3-color: #362c3c;
			--text-color: #ea8e19;
			--text-shadow-color: #696969;
			--text-light-color: #888888;
			--accent-color: #9731eb;
			--accent-shadow-color: #3dee24;
			--accent2-color: #3bee22;
			--iframe-bg-color: #eeeeee;
`,
		"custom-css":`
			h2{
				font-family:'creepster', cursive;
			}
			body{
				font-family: 'modern antiqua', cursive;
			}
		`,
	},
	{
		"name": "winter",
		"desc": "tastes like snow.",
		"lightmode": false,
		"style":`
			--bg-color: #9fb6e1;
			--bg2-color: #6f95dd;
			--bg3-color: #5376b9;
			--text-color: #000;
			--text-shadow-color: #717171;
			--text-light-color: #888888;
			--accent-color: #a027c1;
			--accent-shadow-color: #5b1b6c;
			--accent2-color: #1e078a;
			--iframe-bg-color: #eeeeee;
		`
	}
];

function selectTheme(id) {
	let theme = themes[id];
	document.body.setAttribute("class", theme["lightmode"]?"lightmode":"");
	document.body.setAttribute("style", theme["style"]);

	let theme_style = document.getElementById("theme-style");
	if(!theme_style) {
		theme_style = document.createElement("style");
		theme_style.id = "theme-style";
		document.head.appendChild(theme_style);
	}
	if(theme["custom-css"]) {
		theme_style.innerHTML = theme["custom-css"];
	} else {
		theme_style.innerHTML = "";
	}
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
