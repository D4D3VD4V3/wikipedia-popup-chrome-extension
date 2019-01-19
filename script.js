window.addEventListener('load', function load(event) {
	chrome.storage.sync.get(['wiki_width'], function (result) {
		if (result.wiki_width !== undefined)
			document.forms["form1"]["width"].value = result.wiki_width;
		else
			document.forms["form1"]["width"].value = 500;
	});
	chrome.storage.sync.get(['wiki_height'], function (result) {
		if (result.wiki_height !== undefined)
			document.forms["form1"]["height"].value = result.wiki_height;
		else
			document.forms["form1"]["height"].value = 500;
	});
	document.getElementById('hotkey').onclick = function () {
		chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
		chrome.notifications.create(null, {
			type: "basic",
			iconUrl: "icon/wikipedia-logo-128.png",
			title: "Help message",
			buttons: [{
            title: "KTHX"
			}, {
            title: "Shut up"
			}],
			message: "Click on the text field in 'Invoke Wikipedia Popup' and perform your desired hotkey."}, function(){});
		};
	
	document.getElementById('save').onclick = function () {
		var width = document.forms["form1"]["width"].value;
		var height = document.forms["form1"]["height"].value;
		chrome.storage.sync.set({
			wiki_width: width
		}, function () {
			console.log('Width is set to ' + width);
		});
		chrome.storage.sync.set({
			wiki_height: height
		}, function () {
			console.log('Height is set to ' + height);
		});
		document.getElementById('save').value = "Saved!";
	};
});