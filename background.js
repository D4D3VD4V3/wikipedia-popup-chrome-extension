var width, height, lang;

function openWindow(param) {
	if (width === undefined)
		width = 500;
	if (height === undefined)
		height = 500;
	if (lang === undefined)
		lang = "en";
	
	chrome.windows.create({
		url: "https://" + lang + ".m.wikipedia.org/wiki/"+ param,
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
		});
		chrome.storage.sync.get(['wiki_lang'], function (result) {
			lang = result.wiki_lang;
			openWindow(selection[0]);
		});
		console.log(width);
		console.log(height);

	});

});

chrome.contextMenus.create({
    id: "lelel",
    title: "Search Wikipedia for '%s'",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "lelel") {
        openWindow(info.selectionText);
    }
});