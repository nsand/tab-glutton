(function() {
	var showUrlCtrl = document.getElementById('showURL');
	var showUrl = window.localStorage.showURL;
	if (showUrl === 'true') {
		showUrlCtrl.setAttribute('checked', 'checked');
	}
	showUrlCtrl.addEventListener('click', function(e) {
		window.localStorage.showURL = showUrlCtrl.checked ? 'true' : 'false';
	}, false);
})();
