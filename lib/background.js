/*chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);*/


(function init() {

	function updateCount() {
		chrome.tabs.query({}, function (tabs) {
			chrome.browserAction.setBadgeText({text: '' + tabs.length});
		});
	}

	// listen for new tabs
	chrome.tabs.onCreated.addListener(updateCount);

	// listen for closed tabs
	chrome.tabs.onRemoved.addListener(updateCount);

	updateCount();

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
