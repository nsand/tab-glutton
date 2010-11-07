// Delay filtering for typing speed
var TYPING_DELAY = 350;
// Typing timeout reference
var typing = null;
// Keep track of the current tab item
var current = null;

function showActions(tab, details) {
	$(tab).toggleClass("hover");
	if (details)
		$(tab).find(".description").css("display", "block");
}
function hideActions(tab, details) {
	$(tab).toggleClass("hover");
	if (details)
		$(tab).find(".description").css("display", "none");
}
/* Refresh the tab list after the delay */
function refresh() {
	typing = null;
	var value = $(".tg_field").val();
	var exp = null;
	if (value != null && value.replace(/^\s*/,"").length > 0)
		exp = value;
	var re = exp != null ? new RegExp(exp, "i") : null;

	$("#list > li > .label").each(function(idx) {
		if (re != null && !re.test($.data(this, "url")) && !re.test($(this).find("span").text())) {
			$(this).parent().hide();
		}
		else {
			$(this).parent().show();
		}
	});
}
/* TODO Will need to escape the string for regular expressions */
function escapeString(str) {
}

function createLink(icon, title, url) {
	var d = $("<div>").addClass("label");
	$("<img>").appendTo(d).addClass("favicon").attr("src", icon || (url == "chrome://newtab/" ? "img/chromium_logo.png" : "img/defaultIcon.png"));
	$("<span>").text(title || url).attr("title", title || url).appendTo(d);
	$.data(d[0], "url", url);
	return d;
}

function createDescription(desc) {
	return $("<span>").addClass("description" + ((localStorage["showURL"] == "true" && localStorage["hoverURL"] != "true") ? " detail" : "")).text(desc);
}

/*
Create actions for tab items. [item] is the item in the tab list
to create the action for.
*/
function createActions(item) {
	var actionContainer = $("<ul>").addClass("actions");
	var action = $("<div>").appendTo("<li>").addClass("close").click(function(e) {
		chrome.tabs.remove($.data(item[0], "tabId"), function() {
			item.remove();
		});
		e.stopPropagation();
	});
	action.parent().appendTo(actionContainer);
	return actionContainer;
}