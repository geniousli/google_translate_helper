browser.runtime.onMessage.addListener(msgHandler);

function msgHandler(message) {
  let createData = {
    active: true,
    url: "history/window.html"
  };

  if(message.msg == "open_history"){
    browser.tabs.create(createData).then(function(tab) {
      browser.tabs.executeScript(
        tab.id,
        {
          file: 'history/window.js',
        }
      ).then(function() {
        const sending = browser.tabs.sendMessage(
          tab.id,
          {
            data: message.data
          },
        );
      });
    });
  }
  console.log("msg is ----------");
  console.log(message);
}
