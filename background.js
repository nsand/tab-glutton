/*chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);*/


(function init() {
	var count = 0;
	// set up the initial tab count
	chrome.windows.getAll({"populate": true}, function(windows) {
		for( var i in windows ) {
			count += windows[i].tabs.length;
		}
		chrome.browserAction.setBadgeText({text: "" + count});
	});

	// listen for new tabs
	chrome.tabs.onCreated.addListener(function(tab) {
		chrome.browserAction.setBadgeText({text: "" + (++count)});
	});

	// listen for closed tabs
	chrome.tabs.onRemoved.addListener(function(tab) {
		chrome.browserAction.setBadgeText({text: "" + (--count)});
	});
})();
