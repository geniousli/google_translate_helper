window.addEventListener("click", clickEvent);
window.localStorage.__proto__.getItemSplit = function(name, split, def = []) {
  let val = this.getItem(name);
  if(val) {
    return val.split(split);
  }else {
    return def;
  }
}

// let ALL_CONTENTKEY = "all_content"; // content key
let DATEKEY = "date_key"; // save all keys of key

// date key should like this
function todayKey() {
  let time = new Date();
  let today = time.toISOString().substr(0, 10);
  return `${today}-contents`;
}

function addSaveBtn() {
  let dom = document.getElementsByClassName('AxqVh')[0];
  let info = '<div class="saveBtnDiv"><p class="saveBtnP" sign="saveBtn"> save words </p><div class="saveBtnPadding"></div></div>';
  let doc = new DOMParser().parseFromString(info, "text/xml");
  dom.appendChild(doc.firstChild);
}

function initHistoryDiv() {
  let fankui = document.getElementsByClassName('a88hkc')[0];

  let allContents = '';
  let allDates = window.localStorage.getItemSplit(DATEKEY, ',', []);
  allDates.forEach(function(item){
    let contents = window.localStorage.getItem(item);
    allContents += contents;
  });
  let div = historyDiv(allContents, 'history');
  let doc = new DOMParser().parseFromString(div, "text/xml");
  let parent = document.getElementsByClassName('WFnNle')[0].firstChild;
  parent.insertBefore(doc.firstChild, fankui);


  allDates.slice(0, 4).forEach(function(item){
    let contents = window.localStorage.getItem(item);
    let div = historyDiv(contents, item.substr(0, 10));
    let doc = new DOMParser().parseFromString(div, "text/xml");
    parent.insertBefore(doc.firstChild, fankui);
  });

}

function historyDiv(contents, title) {
  let cSpan = '';
  contents.split('\n').forEach(function(item) {
    cSpan += historySpan(item);
  });
  let history = `<div class="historyDiv"><p class="historyTitle">${title}:</p><span class="historyContainer"> ${cSpan}</span></div>`;
  return history;
}

function historySpan(content) {
  return '<span class="historySpan">' + content + '</span>';
}

// 1. save to today key , 2. save to all content, 3. add date key to datekey
function saveWord() {
  let newContent = getTranslateContent();
  if(newContent) {
    let key = todayKey();
    let todayCons = window.localStorage.getItemSplit(key, '\n', []);
    for (let word of newContent.split('\n')) {
      if(word && todayCons.indexOf(word) <= -1) {
        todayCons.push(word);
      }
    }
    window.localStorage.setItem(key, todayCons.join('\n'));

    let ary = window.localStorage.getItemSplit(DATEKEY, ',', []);
    if(ary.indexOf(key) <= -1) {
      ary.push(key);
    }
    window.localStorage.setItem(DATEKEY, ary.join(','));
  }
}

function clickEvent(event) {
  if(event.target.getAttribute("sign") == "saveBtn") {
    saveWord();
  }else if(event.target.className == "historySpan") {
    let word = event.target.innerHTML;
    let parsedUrl = new URL(document.URL);
    parsedUrl.searchParams.set("text", word);
    window.location.href = parsedUrl.toString();
  }
}


function getTranslateContent() {
  let content = document.getElementsByClassName('D5aOJc vJwDU')[0].innerHTML;
  return content;
}

addSaveBtn();
initHistoryDiv();
