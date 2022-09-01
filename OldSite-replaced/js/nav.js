var navtab_active = null;
var anchor_queued = null;
var click_enabled = true;

const ANCHOR_HIDE_DELAY = 75;
const ANCHOR_FADE_IN = 300;
const ANCHOR_SLIDE_TIME = 385;


function navtab_id(e) {
    if (click_enabled) {
        var anchor_id = e.toString();
        anchor_queued = anchor_id.replace("a_", "#nt_");
    };
};

$(document).ready(function() {
    $("html").click(function(e) {
        if (click_enabled) {
            click_enabled = false;
            if (navtab_active == null && anchor_queued != null) {
                $(anchor_queued + " a").hide().delay(ANCHOR_HIDE_DELAY).fadeIn(ANCHOR_FADE_IN);
                $(anchor_queued).slideDown(ANCHOR_SLIDE_TIME, function() {
                    navtab_active = anchor_queued;
                    anchor_queued = null;
                    click_enabled = true;
                });
            } else if (navtab_active != null &&
                anchor_queued == null &&
                !(e.target.nodeName == "A" ||
                    e.target.nodeName == "IMG")) {
                $(navtab_active + " a").show().fadeOut(ANCHOR_FADE_IN);
                $(navtab_active).slideUp(ANCHOR_SLIDE_TIME, function() {
                    navtab_active = null;
                    click_enabled = true;
                });
            } else if (anchor_queued != null &&
                anchor_queued != navtab_active) {
                $(navtab_active + " a").show().fadeOut(ANCHOR_FADE_IN);
                $(navtab_active).slideUp(ANCHOR_SLIDE_TIME, function() {
                    navtab_active = null;
                    $(anchor_queued + " a").hide().delay(ANCHOR_HIDE_DELAY).fadeIn(ANCHOR_FADE_IN);
                    $(anchor_queued).slideDown(ANCHOR_SLIDE_TIME, function() {
                        navtab_active = anchor_queued;
                        anchor_queued = null;
                        click_enabled = true;
                    });
                });
            } else {
                anchor_queued = null;
                click_enabled = true;
            };
        };
    });
});