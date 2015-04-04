// The onClicked callback function.
function onClickHandler(info, tab) {
  console.log("It was selected.");
  console.log(info);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var id = chrome.contextMenus.create({
    "type": "normal",
    "id": "metaimg",
    "title": "Image Metadata", 
    "contexts": ["image"]
  });
});
