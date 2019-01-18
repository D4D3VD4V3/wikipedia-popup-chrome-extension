window.addEventListener('load', function load(event) {
	document.getElementById('save').onclick = function () {
		var width = document.forms["form1"]["width"].value;
		var height = document.forms["form1"]["height"].value;
		chrome.storage.sync.set({
			wiki_width: width
		}, function () {
			console.log('Value is set to ' + width);
		});
		chrome.storage.sync.set({
			wiki_height: height
		}, function () {
			console.log('Value is set to ' + height);
		});
	};
});