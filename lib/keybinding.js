(function() {
	window.addEventListener("keyup", function(event) {
		if (event.ctrlKey && event.keyCode == 74) {
			chrome.runtime.sendMessage({action: "popup"});
		}
	}, false);
})();