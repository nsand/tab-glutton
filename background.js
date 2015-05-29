/*chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);*/


(function init() {

	// set up the initial tab count
	chrome.windows.getAll({'populate': true}, function (windows) {
		var count = 0;
		windows.forEach(function (win) {
			count += win.tabs.length;
		});
		chrome.browserAction.setBadgeText({text: '' + count});
	});

	// listen for new tabs
	chrome.tabs.onCreated.addListener(updateCount);

	// listen for closed tabs
	chrome.tabs.onRemoved.addListener(updateCount);

	function updateCount() {
		chrome.tabs.query({}, function (tabs) {
			chrome.browserAction.setBadgeText({text: '' + tabs.length});
		});
	}

	var popupWindow;

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.action == 'popup') {
			if (popupWindow) {
				popupWindow.close();
			}

			popupWindow = window.open(chrome.extension.getURL('popup.html'), 'Tab Glutton', 'width=400,height=530');
			sendResponse({response: 'open'});
		}
		else {
			sendResponse({});
		}
	});
})();
