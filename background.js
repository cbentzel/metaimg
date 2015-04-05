'use strict';

function grabData(url) {
  var result = fetch(url, {'cache': 'no-cache'});
  result.then(function (response) {
    console.log('response', response);
    console.log('header', response.headers.get('Content-Type'));
    return response.arrayBuffer();
  }).then(function (buffer) {
    console.log('got buffer', buffer);
    console.log('buffer size', buffer.length);
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
