// Delay filtering for typing speed
var TYPING_DELAY = 350;
// Typing timeout reference
var typing = null;
// Keep track of the current tab item
var current = null;

var _windId = chrome.windows.WINDOW_ID_NONE;

/* Seems hacky, but window.selected seems to return false always for browser actions */
chrome.windows.getLastFocused(function (_wind) {
	_windId = _wind.id;
});

chrome.windows.getAll({populate: true}, function (windows) {
	var i = 0;
	for (; i < windows.length; i++) {
		addTabs(windows[i], _windId);
	}
});

$(ready);

function ready() {
	$(".tg_field").bind("keyup", function() {
		if (typing === null) {
			typing = setTimeout(refresh, TYPING_DELAY);
		}
		else {
			clearTimeout(typing);
			typing = setTimeout(refresh, TYPING_DELAY);
		}
	});

	$(".tg_field")[0].focus();
}

function addTabs(wind, windId) {
	var i = 0;
	var tabs = wind.tabs;
	if (tabs.length === 0)
		return;

	if (tabs[0].url && tabs[0].url.startsWith('chrome-extension://')) {
		return;
	}

	var list = $("<ul class='tg_tab_list'>");
	var groupTitle = $('<div class="tg-group-title">' + tabs.length + ' tabs</div>');

	for (; i < tabs.length ; i++) {
		var li = $("<li>");
		$.data(li[0], "tabId", tabs[i].id);
		li.append(createActions(li));
		li.append(createLink(tabs[i].favIconUrl, tabs[i].title, tabs[i].url));
		li.append(createDescription(tabs[i].url));

		if (windId == wind.id && tabs[i].selected) {
			current = li;
			current.addClass("current");
		}

		li.click(function(e) {
			if (e.which === 2) {
				chrome.tabs.remove($.data(this, "tabId"), function() {
					$(this).remove();
				});
				e.stopPropagation();
				return;
			}
			chrome.tabs.update($.data(this, "tabId"), { active : true }, function (tab) {
				chrome.windows.update(tab.windowId, {focused: true});
			});
			current.removeClass("current");
			current = $(this).addClass("current");
		});

		//if (localStorage["showURL"] == "true" && localStorage["hoverURL"] == "true")
		var details = localStorage.showURL === 'true' && localStorage.hoverURL === 'true';
		li.hover(function() {
			showActions(this, details);
			},
			function() {
				hideActions(this, details);
		});

		list.append(li);
	}

	if (windId == wind.id) {
		$(".scrollable").prepend(groupTitle, list);
		if (localStorage.highlightWindow === 'true')
			list.addClass("tg_focused_window");
	}
	else {
		$(".scrollable").append(groupTitle, list);
	}

}

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

	$(".tg_tab_list > li > .label").each(function(idx) {
		if (re != null && !re.test($.data(this, "url")) && !re.test($(this).find("span").text())) {
			$(this).parent().hide();

		}
		else {
			$(this).parent().show();
		}
	});
	$(".tg_tab_list").show();
	$(".tg_tab_list").each(function(idx) {
		if ($(this).find("li:visible").size() > 0) {
			$(this).show();
		}
		else {
			$(this).hide();
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
	var action = $("<div>&times;</div>").appendTo("<li>").addClass("close").click(function(e) {
		chrome.tabs.remove($.data(item[0], "tabId"), function() {
			item.remove();
		});
		e.stopPropagation();
	});
	action.parent().appendTo(actionContainer);
	return actionContainer;
}
