// browser.runtime.onMessage.addListener(notify);

// function notify(message) {
//   console.log("message is -------" + message);
//   // browser.notifications.create({
//   //   "type": "basic",
//   //   "iconUrl": browser.extension.getURL("link.png"),
//   //   "title": "You clicked a link!",
//   //   "message": message.url
//   // });
// }

// // var currentTab = undefined;
// // function listTabs() {
// //   browser.tabs.query({currentWindow: true}).then((tabs) => {
// //     tabs.forEach((item, index) => {
// //       console.log("tabs is -------------------- \n");
// //       console.log(`id: ${item.id}, title: ${item.title}, `);
// //       console.log(item);
// //     })
// //   })


// //   browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
// //     console.log('******************************');
// //     currentTab = tabs[0];
// //     console.log(currentTab);
// //   })

// // }
// // browser.browserAction.onClicked.addListener(listTabs);


// browser.tabs.onRemoved.addListener((tabId, info) => {
//   console.log("tabId  is -------" + tabId);
//   console.log("info  is -------");
//   console.log(info);
//   browser.tabs.query({currentWindow: true}).then((tabs)=> {
//     tabs.forEach((tab, index) => {
//       console.log('tab id: ' + tab.id + " index: " + index);
//     })

//     var index = tabs.findIndex((tab) => tab.id == tabId);
//     console.log("index is --------------------"+ index);
//   })

// })

// browser.tabs.onActivated.addListener((info) => {
// })

// browser.tabs.onActivated.addListener((info) => {
// })
