'use strict';

function parseImage(contentType, byteArray) {
  console.log('content type', contentType);
  console.log('buffer size', byteArray.length);
}

function grabData(url) {
  var result = fetch(url);
  var contentType = null;
  result.then(function (response) {
    contentType = response.headers.get('Content-Type');
    return response.arrayBuffer();
  }).then(function (arrayBuffer) {
    parseImage(contentType, new Uint8Array(arrayBuffer));
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
