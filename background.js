var width, height;

function openWindow(param) {
	if (width === undefined)
		width = 500;
	if (height === undefined)
		height = 500;
	chrome.windows.create({
		url: "https://en.m.wikipedia.org/wiki/".concat(param),
		type: "popup",
		focused: true,
		incognito: true,
		width: parseInt(width, 10),
		height: parseInt(height, 10)
	})
}
chrome.commands.onCommand.addListener(function (command) {

	chrome.tabs.executeScript({
		code: "window.getSelection().toString();"
	}, function (selection) {

		chrome.storage.sync.get(['wiki_width'], function (result) {
			width = result.wiki_width;
		});
		chrome.storage.sync.get(['wiki_height'], function (result) {
			height = result.wiki_height;
			openWindow(selection[0]);
		});
		console.log(width);
		console.log(height);

	});

});