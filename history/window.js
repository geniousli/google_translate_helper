var parent = document.getElementsByClassName('main')[0];
var fankui = document.getElementsByClassName('lastLine')[0];
function toDiv(contents, title) {
  var cSpan = '';
  contents.forEach(function(item) {
    if(item) {
      cSpan += toSpan(item);
    }
  });
  var data = `<div class="historyDiv"><p class="historyTitle" sign="${title}" >${title}:</p><span class="historyContainer" > ${cSpan}</span></div>`;
  var doc = new DOMParser().parseFromString(data, "text/xml");
  return doc.firstChild;
}

function toSpan(content) {
  return '<span class="historySpan">' + content + '</span>';
}

function insertAllHistory(msg) {
  for(var key in msg.data) {
    var contents = msg.data[key];
    var doc = toDiv(contents, key.substr(0, 10));
    parent.insertBefore(doc, fankui);
  }
}

browser.runtime.onMessage.addListener(insertAllHistory);
