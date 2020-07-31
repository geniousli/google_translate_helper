let bingTime = null;
let bingUrl = null;

browser.runtime.onMessage.addListener(fetchBing);

function fetchBing(message) {
  let time = new Date(message.time);
  if(!bingTime) {
    bingTime = time;
    bingUrl = fetchUrl();
  }else if(bingTime.day != time.day) {
    bingTime = time;
    bingUrl = fetchUrl();
  }
  browser.tabs.sendMessage(message.tabId, {"url": bingUrl});
}


function fetchUrl() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cn.bing.com/', false);
  xhr.send(null);
  let urlMatch =  xhr.response.match(/background-image:\s?url\(.*?\.jpg.*?\)/)[0];
  let url = urlMatch.match(/\/.*[^\)]/)[0];
  return `url(https://cn.bing.com${url})`;
}
