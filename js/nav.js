const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
	if (menu.classList.contains("active")) {
		menu.classList.remove("active");
		toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
	} else {
		menu.classList.add("active");
		toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
	}
}

function closeMenu() {
	if (menu.classList.contains("active")) {
		menu.classList.remove("active");
		toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
	}
}

/* Activate Submenu */
function toggleItem(e) {
	if (e.currentTarget.classList.contains("submenu-active")) {
		e.currentTarget.classList.remove("submenu-active");
	} else if (menu.querySelector(".submenu-active")) {
		menu.querySelector(".submenu-active").classList.remove("submenu-active");
		e.currentTarget.classList.add("submenu-active");
	} else {
		e.currentTarget.classList.add("submenu-active");
	}
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
	if (menu.querySelector(".submenu-active")) {
		let isClickInside = menu
			.querySelector(".submenu-active")
			.contains(e.target);
		
		if (!isClickInside && menu.querySelector(".submenu-active")) {
			menu.querySelector(".submenu-active").classList.remove("submenu-active");
		}
	}
}
/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
	if (item.querySelector(".submenu")) {
		item.addEventListener("click", toggleItem, false);
	}
	item.addEventListener("keydown", (e) => {
		if(e.key == "Space" || e.key == "Enter") {
			item.blur();
			toggleItem(e);
		}
	}, false);
}
document.addEventListener("click", closeSubmenu, false);


function add_keyboard_events_for_buttons() {
	for (let item of document.getElementsByTagName("btn")) {
		if(item.getAttribute("keyboard_enabled") == "1") {
			continue;
		}
		item.setAttribute("keyboard_enabled", "1");
		item.setAttribute("tabindex", "0");
		item.addEventListener("keydown", (e) => {
			if(e.key == "Space" || e.key == "Enter") {
				item.click();
			}
		});
		item.addEventListener("click", (e) => {
			item.blur();
		});
	}
}

document.addEventListener("page-content-loaded", (e) => {
	for (let item of document.getElementsByTagName("a")) {
		if(item.parentNode.classList.contains("has-submenu") || item.getAttribute("keyboard_enabled") == "1") {
			continue;
		}
		item.setAttribute("keyboard_enabled", "1");
		item.setAttribute("tabindex", "0");
		item.addEventListener("keydown", (e) => {
			if(!isPageLoading && (e.key == "Space" || e.key == "Enter")) {
				//e.preventDefault();
				item.click();
				//item.blur();
				closeSubmenu(e);
			}
		});
	}
	add_keyboard_events_for_buttons();
	let splash = document.getElementById("splash");
	splash.setAttribute("tabindex", "0");
	splash.addEventListener("keydown", (e) => {
		if(e.key == "Space" || e.key == "Enter") {
			splash.click();
		}
	});
});
