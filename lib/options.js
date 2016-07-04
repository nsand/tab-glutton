(function() {
	var showUrlCtrl = document.getElementById('showURL');
	var denseListCtrl = document.getElementById('collapse');
	var separateCtrl = document.getElementById('separate');

	var showUrl = window.localStorage.showURL;
	var isSeparated = window.localStorage.getItem('isSeparated');
	var isCollapsed = window.localStorage.getItem('isCollapsed') || 'true';

	showUrlCtrl.checked = showUrl === 'true';
	denseListCtrl.checked = isCollapsed === 'true';
	separateCtrl.checked = isSeparated === 'true';

	showUrlCtrl.addEventListener('click', function(e) {
		window.localStorage.showURL = showUrlCtrl.checked ? 'true' : 'false';
	}, false);

	separateCtrl.addEventListener('click', function(e) {
		window.localStorage.setItem('isSeparated', separateCtrl.checked ? 'true' : 'false');
	}, false);

	denseListCtrl.addEventListener('click', function(e) {
		separateCtrl.checked = false;
		window.localStorage.removeItem('isSeparated');
		window.localStorage.setItem('isCollapsed', denseListCtrl.checked ? 'true' : 'false');
	}, false);
})();
