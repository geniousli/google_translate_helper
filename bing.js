function bing() {
  var time = Date.now();
  browser.tabs.query({currentWindow: true, active: true}).then((tabs)=> {
    var tab = tabs[0];
    browser.runtime.sendMessage({"timestamp": time, "tabId": tab.id});
  })
}

function updatePageUrl(message) {
  console.log("page messae is --------------");
  console.log(message);
  var div = document.getElementById("bgDiv");
  div.style.backgroundImage = message.url;
}

document.addEventListener("DOMContentLoaded", bing);
browser.runtime.onMessage.addListener(updatePageUrl);
