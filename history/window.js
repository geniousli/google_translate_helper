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

const noMeanings =   ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ">", "<", "?", "/", "[", "]", "{", "}", "|", "~", "\"", "'", ",", "."];
function trimWord(iword) {
  iword = iword.trim();
  var c = iword.at(0);
  var left = 0;
  if(c && noMeanings.indexOf(c) >= 0) {
    left += 1;
  }
  let right = iword.length ;
   c = iword.at(-1);
  if(c && noMeanings.indexOf(c) >= 0) {
    right -= 1;
  }
  return iword.slice(left, right);
}


function analysis(dictionary) {
  var lastFiveDayFreq = {}; // {key => count}
  var fiveday = Object.keys(dictionary).slice(0, 4);
  for(var key of fiveday) {
    dictionary[key].forEach(function(content) {
      // content is a sentences
      var words = [];
      if(content.indexOf(" ") >= 0 ) {
        words = content.split(" ");
      }else {
        words = [content];
      }
      words.forEach(function(word) {
        if(word) {
          if(word.length >= 2){
            word = trimWord(word);
            if(lastFiveDayFreq[word]) {
              lastFiveDayFreq[word] += 1;
            }else {
              lastFiveDayFreq[word] = 1;
            }
          }
        }
      });
    });
    var result = [];
    for (var key in lastFiveDayFreq) {
      if(lastFiveDayFreq[key] > 2) {
        result.push(key);
      }
    }
    return result;
  }
}

function insertAllHistory(msg) {
  var dictionary = msg.data;
  var lastFre = analysis(dictionary);

  var doc = toDiv(lastFre, "last Five day frequently checked");
  parent.insertBefore(doc, fankui);

  for(var key in dictionary) {
    var contents = dictionary[key];
    var doc = toDiv(contents, key.substr(0, 10));
    parent.insertBefore(doc, fankui);
  }
}

browser.runtime.onMessage.addListener(insertAllHistory);
