(function() {
	var content = $("<div class='tabglutton'>").appendTo($("body")).append("<div class='tg_content'>");
	var search = $("<div class='tg_search'>").appendTo($(".tg_content"));
	search.append($("<input class='tg_field'>"));
	var scrollable = $("<div class='scrollable'>");
	search.append(scrollable);
	scrollable.append($("<ul class='tg_tab_list'>"));
})();

chrome.extension.sendRequest({}, function(response) {
	alert(response);
	var tabs = response.tabs;
	var list = $(".tg_tab_list");
	var i = 0;

	for (; i < tabs.length ; i++) {
		var li = $("<li>");
		$.data(li[0], "tabId", tabs[i].id);
		li.append(createActions(li));
		li.append(createLink(tabs[i].favIconUrl, tabs[i].title, tabs[i].url));
		li.append(createDescription(tabs[i].url));

		if (tabs[i].selected) {
			current = li;
			current.addClass("current");
		}

		li.click(function(e) {
			chrome.tabs.update($.data(this, "tabId"), { selected : true });
			current.removeClass("current");
			current = $(this).addClass("current");
		});

		//if (localStorage["showURL"] == "true" && localStorage["hoverURL"] == "true")
		var details = localStorage["showURL"] == "true" && localStorage["hoverURL"] == "true";
			li.hover(function() { showActions(this, details)}, function() { hideActions(this, details)});
		
		list.append(li);
	}
	$(".tg_content .tg_field").bind("keyup", function() {
		if (typing == null) {
			typing = setTimeout(refresh, TYPING_DELAY);
		}
		else {
			clearTimeout(typing);
			typing = setTimeout(refresh, TYPING_DELAY);
		}
	});
	$(".tg_field")[0].focus();
});