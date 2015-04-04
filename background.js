'use strict';

function grabData(url) {
  var result = fetch(url);
  result.then(function (response) {
    console.log('response', response);
    console.log('header', response.headers.get('Content-Type'));
  }).then(function (text) {
    console.log('got text', text);
  }).catch(function (ex) {
    console.log('failed', ex);
  });
}

// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.mediaType != "image")
    return;
  grabData(info.srcUrl);
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
