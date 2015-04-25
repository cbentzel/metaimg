'use strict';

function parseImage(imageData) {
  console.log('buffer size', imageData.length);
}

function grabData(url) {
  var result = fetch(url);
  result.then(function (response) {
    console.log('response', response);
    console.log('header', response.headers.get('Content-Type'));
    return response.text();
  }).then(function (text) {
    parseImage(text);
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

chrome.runtime.onInstalled.addListener(function() {
  var id = chrome.contextMenus.create({
    "type": "normal",
    "id": "metaimg",
    "title": "Image Metadata", 
    "contexts": ["image"]
  },
  function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
});
