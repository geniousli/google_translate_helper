// const iqwerty = require('./toast.js');
window.addEventListener("click", clickEvent);
window.localStorage.__proto__.getItemSplit = function(name, split, def = []) {
  var val = this.getItem(name);
  if(val) {
    return val.split(split);
  }else {
    return def;
  }
}

Array.prototype.uniqueUnshift = function(word) {
  if(word instanceof Array){
    var that = this;
    word.forEach(function(item) {
      if(that.indexOf(item) <= -1) {
        that.unshift(item);
      }
    })
  }else {
    if(this.indexOf(word) <= -1) {
      this.unshift(word);
    }
  }
};



// var ALL_CONTENTKEY = "all_content"; // content key
var DATEKEY = "date_key"; // save all keys of key

// date key should like this
function todayKey() {
  var time = new Date();
  var today = time.toISOString().substr(0, 10);
  return `${today}-contents`;
}

function addSaveBtn() {
  var dom = document.getElementsByClassName('AxqVh')[0];
  var info = '<div class="saveBtnDiv"><p class="saveBtnP" sign="saveBtn"> save words </p><div class="saveBtnPadding"></div></div>';
  var doc = new DOMParser().parseFromString(info, "text/xml");
  dom.appendChild(doc.firstChild);
}

const domChangeCallback = function(mutationsList, observer) {
  var targetExist = false;
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.target && mutation.target.className == "aia4Ud") {
      targetExist = true;
      break;
    }
  }
  observer.disconnect();
  if(targetExist) {
    addDicBtn();
  }
  observeDomChange();
};

function addDicBtn() {
  var dom = document.getElementsByClassName('aia4Ud')[0];
  if(!dom.getElementsByClassName('saveDicBtnDiv')[0]) {
    var info = '<div class="saveDicBtnDiv" ><span sign="saveDicBtnDiv">add to dic</span></div>';
    var doc = new DOMParser().parseFromString(info, "text/xml");
    dom.appendChild(doc.firstChild);
  }
}

function observeDomChange() {
  var dom = document.getElementsByClassName('kGmWO')[0];
  var cwiz = dom.getElementsByTagName('c-wiz')[0];
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(domChangeCallback);
  observer.observe(cwiz, config);
}

const historyFromStorage = (function() {
  var map = {}; // data => []
  var dates = []; // [2021-11-01, '2021-12-01']
  var allContents = []; // ['xx', 'xx1]

  var fankui = document.getElementsByClassName('a88hkc')[0];
  var parent = document.getElementsByClassName('WFnNle')[0].firstChild;// c-wiz

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

  function refreshDiv(contents, title) {
    var coll = parent.getElementsByClassName("historyTitle");
    var domFind = null;
    for(var i = 0 ; i < coll.length; i ++ ) {
      if(coll.item(i).getAttribute("sign") == title) {
        domFind = coll.item(i);
        break;
      }
    }
    let dom = toDiv(contents, title);
    if(domFind) {
      domFind.parentElement.replaceWith(dom);
    }else {
      let before = coll[1];
      parent.insertBefore(dom, before);
    }
  }

  function toSpan(content) {
    return '<span class="historySpan">' + content + '</span>';
  }

  function insertLastFiveDay() {
    var doc = toDiv(allContents, 'history');
    parent.insertBefore(doc, fankui);

    dates.slice(0, 4).forEach(function(item){
      var contents = map[item];
      var doc = toDiv(contents, item.substr(0, 10));
      parent.insertBefore(doc, fankui);
    });
  }

  function insertHistoryLink() {
    let div = `<div class="historyDiv"><a class="historyLink" href="#" sign="historyLink">all histories</a></div>`;
    var doc = new DOMParser().parseFromString(div, "text/xml");
    parent.insertBefore(doc.firstChild, fankui);
  }

  function loadData() {
    dates = window.localStorage.getItemSplit(DATEKEY, ',', []);
    dates.slice(0, 4).forEach(function(item){
      var contents = window.localStorage.getItemSplit(item, '\n', []);
      map[item] = contents;
      allContents = allContents.concat(contents);
    });
  }

  function saveTodayData() {
    var dateStr = dates.join(",");
    window.localStorage.setItem(DATEKEY, dateStr);
    let today = todayKey();
    window.localStorage.setItem(today, map[today].join('\n'));
  }

  function addNewWord(newWord) {
    if(newWord) {
      var key = todayKey();
      dates.uniqueUnshift(key);
      allContents.uniqueUnshift(newWord);

      if(!map[key]) {
        map[key] = [];
      }
      map[key].uniqueUnshift(newWord);
      refreshDiv(allContents, 'history');
      refreshDiv(map[key], key.substr(0, 10));
    }
  }

  return {
    loadData: loadData,
    insertLastFiveDay: insertLastFiveDay,
    insertHistoryLink: insertHistoryLink,
    addNewWord: addNewWord,
    saveTodayData: saveTodayData,
  };
})();


function initHistoryDiv() {
  historyFromStorage.loadData();
  historyFromStorage.insertLastFiveDay();
  historyFromStorage.insertHistoryLink();
}

// 1. save to today key , 2. save to all content, 3. add date key to datekey
function saveWord(newContent) {
  if(newContent) {
    historyFromStorage.addNewWord(newContent.split('\n'));
    historyFromStorage.saveTodayData();
  }
}

initHistoryDiv();
