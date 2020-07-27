document.addEventListener("DOMContentLoaded", listTabs);


function listTabs() {
  currentTabs().then((tabs) => {
    let tablist = document.getElementById('tabs-list');
    tablist.textContent = '';
    tabs.forEach((tab) => {
      let link = document.createElement('a');
      link.textContent = tab.title;
      link.setAttribute('href', tab.id);
      link.classList.add('switch-tabs');
      link.dataset.url = tab.url;
      let br = document.createElement('br');
      tablist.appendChild(link);
      tablist.appendChild(br);
    })
  })
}

function currentTabs() {
  return browser.tabs.query({currentWindow: true});
}


document.addEventListener("click", (e) => {
  if(e.target.tagName == "A")  {
    console.log(e.target.id);
    if(e.target.classList.contains("switch-tabs")) {
      var tabId = parseInt(e.target.getAttribute('href'));
      console.log("tabId is ----------" + tabId);
      browser.tabs.update(tabId, {
        active: true
      });
      e.preventDefault();
    }
    if(e.target.id == "tabs-move-beginning") {
      browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        var curTab = tabs[0];
        var tabId = curTab.id;
        console.log(curTab);
        browser.tabs.move(tabId, {
          windowId: curTab.windowId,
          index: 0
        });
      })
    }

    if(e.target.id == "tabs-resort") {
      console.log("tabs-resort is ---------");
      browser.tabs.query({currentWindow: true}).then((tabs) => {
        var ary = tabs.map((item)=> {
          console.log(item);
          return {"url": (new URL(item.url)).hostname, "title": item.title, "icon": "xx", "tabid": item.id};
        });

        console.log("ary is ---------");
        console.log(ary);

       var newAry =  ary.sort((one, two) => {
          var aryOne = [one.url, one.title, one.icon];
          var aryTwo = [two.url, two.title, two.icon];
          var newAry = [];
          aryOne.forEach((item, index) => {
            newAry.push([item, aryTwo[index]]);
          })
          return newAry.reduce((preValue, curr, index) => {
            if(preValue == 0 ){
              var one = curr[0];
              var two = curr[1];
              if(one < two){
                return 1;
              }else if(one > two){
                return -1;
              }else {
                return 0;
              }
            }else {
              return preValue;
            }
          }, 0);
       });
        console.log("ary is ********************");
        console.log(newAry);

        newAry.forEach((item, index) => {
          browser.tabs.move(item.tabid, {
            index: index
          })
        })

      })
    }
  }
})


// var ary = [{"url": "https://www.zhihu.com/org/signup", title: "手机注册", "favIconUrl": "chrome://browser/skin/window.svg"}, {"url": "https://www.zhihu.com/term/institution-settle", title: "知乎机构号入驻服务协议",  "favIconUrl": "asfaf"}, {"url": "https://www.baidu.com/", title: "百度一下", "favIconUrl": "aefafaf"}, {
//   "url": "https://www.baidu.com/s?cl=3&tn=baidutop10&fr=top1000&wd=%E4%B9%98%E9%A3%8E%E7%A0%B4%E6%B5%AA%E7%9A%84%E5%A7%90%E5%A7%90+%E5%81%87%E5%94%B1&rsv_idx=2&rsv_dl=fyb_n_homepage&hisfilter=1",
//   "title": "乘风破浪的姐姐 假唱",
//   "favIconUrl": "asdfa"
// }, {
//   "url": "https://new.qq.com/omn/20200725/20200725A0J5W600.html",
//   "title": "《乘风破浪的姐姐》又翻车，第三次公演假唱？",
//   "favIconUrl": "asdfa"
// }]

// ary.sort((one, two) => {
//   var urlOne = new URL(one.url);
//   var urlTwo = new URL(two.url);
//   var aryOne = [urlOne, one.title, one.favIconUrl];
//   var aryTwo = [urlTwo, two.title, two.favIconUrl];
//   var newAry = [];
//   aryOne.forEach((item, index) => {
//     newAry.push([item, aryTwo[index]]);
//   })
//   return newAry.reduce((preValue, curr, index) => {
//     if(preValue == 0 ){
//       var one = curr[0];
//       var two = curr[1];
//       if(one < two){
//         return 1;
//       }else if(one > two){
//         return -1;
//       }else {
//         return 0;
//       }
//     }else {
//       return preValue;
//     }
//   });
// })
