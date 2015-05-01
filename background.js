'use strict';

(function() {

function determineFileType(byteArray) {
  if (byteArray[0] == 0xFF && byteArray[1] == 0xD8) {
    // See if this is an EXIF or a JFIF file.
    if (byteArray[2] == 0xFF && byteArray[3] == 0xE0) {
      return 'jpeg/jfif';
    } else if (byteArray[2] == 0xFF && byteArray[3] == 0xE1) {
      return 'jpeg/exif';
    }
  }
  return 'unknown';
}

function parseJpeg(byteArray) {
}

function parseImage(contentType, byteArray) {
  console.log('content type', contentType);
  console.log('buffer size', byteArray.length);
  var fileType = determineFileType(byteArray);
  console.log('fileType is ', fileType);
  if (fileType.startsWith('jpeg/') {
    parseJpeg(byteArray);
  }
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

})();
