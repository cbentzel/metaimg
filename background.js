// The onClicked callback function.
function onClickHandler(info, tab) {
  console.log("It was selected.");
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  console.log("Being installed.");
  var id = chrome.contextMenus.create({
    "type": "normal",
    "id": "metaimg",
    "title": "Image Metadata", 
    "contexts": ["image"]
  });
  console.log(id);
});
