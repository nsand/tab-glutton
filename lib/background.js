/*chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);*/


(function init() {

	// Keep track of the window ids and when they were last activated
	var mru = {};

	function updateCount() {
		chrome.tabs.query({}, function (tabs) {
			chrome.browserAction.setBadgeText({text: '' + tabs.length});
		});
	}

	// listen for new tabs
	chrome.tabs.onCreated.addListener(updateCount);

	// listen for closed tabs
	chrome.tabs.onRemoved.addListener(updateCount);

	chrome.windows.getLastFocused(function(win) {
		mru[win.id] = Date.now();
	});

	chrome.windows.onFocusChanged.addListener(function(id) {
		if (id !== chrome.windows.WINDOW_ID_NONE) {
			// Update the list of windows
			mru[id] = Date.now();
		}
	});

	updateCount();

	var popupWindow;

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.action === 'popup') {
			if (popupWindow) {
				popupWindow.close();
			}

			popupWindow = window.open(chrome.extension.getURL('popup.html'), 'Tab Glutton', 'width=400,height=530');
			sendResponse({response: 'open'});
		}
		else if (request.action === 'mru') {
			// Sends the most-recently used window list
			sendResponse(mru);
		}
		else {
			sendResponse({});
		}
	});
})();
