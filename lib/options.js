(function() {
	var showUrlCtrl = document.getElementById('showURL');
	var denseListCtrl = document.getElementById('collapse');

	var showUrl = window.localStorage.showURL;
	var isCollapsed = window.localStorage.getItem('isCollapsed') || 'true';

	if (showUrl === 'true') {
		showUrlCtrl.setAttribute('checked', 'checked');
	}
	if (isCollapsed === 'true') {
		denseListCtrl.setAttribute('checked', 'checked');
	}

	showUrlCtrl.addEventListener('click', function(e) {
		window.localStorage.showURL = showUrlCtrl.checked ? 'true' : 'false';
	}, false);

	denseListCtrl.addEventListener('click', function(e) {
		window.localStorage.setItem('isCollapsed', denseListCtrl.checked ? 'true' : 'false');
	}, false);

})();
