browser.runtime.onMessage.addListener(msgHandler);

function msgHandler(message) {
  // let time = new Date(message.time);
  // if(!bingTime) {
  //   bingTime = time;
  //   bingUrl = fetchUrl();
  // }else if(bingTime.day != time.day) {
  //   bingTime = time;
  //   bingUrl = fetchUrl();
  // }
  // browser.tabs.sendMessage(message.tabId, {"url": bingUrl});
  let createData = {
    active: true,
    url: "history/window.html"
  };

  if(message.msg == "open_history"){
    browser.tabs.create(createData);
  }
  console.log("msg is ----------");
  console.log(message);
}
