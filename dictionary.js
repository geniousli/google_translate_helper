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
  var parent = document.getElementsByClassName('WFnNle')[0].firstChild;

  function toDiv(contents, title) {
    var cSpan = '';
    contents.forEach(function(item) {
      if(item) {
        cSpan += toSpan(item);
      }
    });
    var history = `<div class="historyDiv"><p class="historyTitle">${title}:</p><span class="historyContainer" > ${cSpan}</span></div>`;
    return history;
  }

  function toSpan(content) {
    return '<span class="historySpan">' + content + '</span>';
  }

  function insertLastFiveDay() {
    var div = toDiv(allContents, 'history');
    var doc = new DOMParser().parseFromString(div, "text/xml");
    parent.insertBefore(doc.firstChild, fankui);

    dates.slice(0, 4).forEach(function(item){
      var contents = map[item];
      var div = toDiv(contents, item.substr(0, 10));
      var doc = new DOMParser().parseFromString(div, "text/xml");
      parent.insertBefore(doc.firstChild, fankui);
    });
  }

  function insertHistoryLink() {
    let div = `<div class="historyDiv"><a class="historyLink" href="#">all histories</a></div>`;
    var doc = new DOMParser().parseFromString(div, "text/xml");
    parent.insertBefore(doc.firstChild, fankui);
  }

  function loadData() {
    dates = window.localStorage.getItemSplit(DATEKEY, ',', []);
    dates.reverse();
    dates.forEach(function(item){
      var contents = window.localStorage.getItemSplit(item, '\n', []);
      map[item] = contents;
      allContents = allContents.concat(contents);
    });
  }

  return {
    loadData: loadData,
    insertLastFiveDay: insertLastFiveDay,
    insertHistoryLink: insertHistoryLink,
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
    var key = todayKey();
    var todayCons = window.localStorage.getItemSplit(key, '\n', []);
    for (var word of newContent.split('\n')) {
      if(word && todayCons.indexOf(word) <= -1) {
        todayCons.push(word);
      }
    }
    window.localStorage.setItem(key, todayCons.join('\n'));

    var ary = window.localStorage.getItemSplit(DATEKEY, ',', []);
    if(ary.indexOf(key) <= -1) {
      ary.push(key);
    }
    window.localStorage.setItem(DATEKEY, ary.join(','));
  }
}

function getSpecialWordInfo() {
  var dom = document.getElementsByClassName('aia4Ud')[0];
  if(dom){
    return dom.firstChild.textContent;
  }
}

function clickEvent(event) {
  if(event.target.getAttribute("sign") == "saveBtn") {
    var newContent = getTranslateContent();
    saveWord(newContent);
    popToast('add success');
  }else if(event.target.className == "historySpan") {
    var word = event.target.innerHTML;
    var parsedUrl = new URL(document.URL);
    parsedUrl.searchParams.set("text", word);
    window.location.href = parsedUrl.toString();
  }else if (event.target.getAttribute("sign") == "saveDicBtnDiv") {
    var newContent = getSpecialWordInfo();
    saveWord(newContent);
    popToast('add success');
  }
}


function popToast(msg) {
  const options = {
    settings: {
      duration: 1000,
    },
    style: {
      main: {
        background: "#1a73e8",
        color: "white",
      },
    },
  };
  toast.toast(msg, options);
}

function getTranslateContent() {
  var content = document.getElementsByClassName('D5aOJc vJwDU')[0].innerHTML;
  return content;
}

addSaveBtn();
observeDomChange();
initHistoryDiv();

const textChangeCallback = function(mutationsList, observer) {

};
var doc = document.getElementsByClassName('er8xn')[0];
const config = { childList: true, subtree: true };
const observer = new MutationObserver(textChangeCallback);
observer.observe(doc, config);
