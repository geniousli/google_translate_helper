// document.body.addEventListener("mouseout", function( event ) {
//   // highlight the mouseover target
//   // reset the color after a short delay
// });


// document.body.addEventListener("click", function( event ) {
//   // highlight the mouseover target
//   // reset the color after a short delay
//   log("event is ---------- url is:" + event.target.href);
//   browser.runtime.sendMessage({"url": event.target.href});
// });

var log = console.log;
document.body.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  if(event.target.tagName == "A")  {
    // log(event.target);
    // log(event.taget.text);
    // document.body.appendChild(dom);
  }
  // reset the color after a short delay
});


document.body.addEventListener('mouseup', function(event) {
  var selection = document.getSelection();
  log('selection --------------------');
  log(selection);
  log('selection --------------------');
  var nodes = findNodes( selection.focusNode, selection.anchorNode);
  var textNodes = nodes.filter((node)=> {
    return (node.nodeType == Node.TEXT_NODE && node.textContent != "\n\n") || node.nodeType == Node.ELEMENT_NODE;
  });
  log('text nodes --------------------');
  textNodes.forEach((tab) => {
    console.log(tab.textContent || tab.innerText)
  })
  var domFrom = textNodes[0];
  var domTo = textNodes[textNodes.length - 1];
  // selection.anchorOffset
  // selection.focusOffset
  log(domFrom);
  log(domTo);
  log("selection ---------------------------------------------------------------------------------------------------");
  log(selection.toString());

});


function findNodes(lParent, rParent) {
  var rightParents = [];
  var leftParents = [];
  var parent = null;
  var olParent = lParent;
  var orParent = rParent;
  while(true) {
    rightParents.push(rParent);
    leftParents.push(lParent);
    if(rightParents.indexOf(lParent) > -1) {
      parent = lParent;
      break;
    }
    if(leftParents.indexOf(rParent) > -1) {
      parent = rParent;
      break;
    }
    rParent = rParent.parentNode;
    lParent = lParent.parentNode;
  }
  var index = rightParents.indexOf(parent);
  var rights = rightParents.slice(0, index);
  var topRight = rights.pop();
  var rightNodes =
      rights.map((tab) => {
        var next = tab.nextSibling;
        var ary = [];
        while(next) {
          ary.push(next);
          next = next.nextSibling;
        }
        return ary;
      }).flat(Infinity);


  var index = leftParents.indexOf(parent);

  var lefts = leftParents.slice(0, index);
  var topLeft = lefts.pop();

  var leftNodes =
      lefts.reverse().map((tab) => {
        var next = tab.previousSibling;
        var ary = [];
        while(next) {
          ary.push(next);
          next = next.previousSibling;
        }
        return ary;
      }).flat(Infinity);

  var topNodes = [];

  while((topRight = topRight.nextSibling) != topLeft) {
    topNodes.push(topRight);
  }
  log("left nodes----------------------------------------------------------------------------------------------------");
  leftNodes.forEach((tab) => {
    log(tab);
  })
  log("right nodes----------------------------------------------------------------------------------------------------");
  rightNodes.forEach((tab) => {
    log(tab);
  })

  log("middle nodes----------------------------------------------------------------------------------------------------");
  topNodes.forEach((tab) => {
    log(tab);
  })

  var nodes = rightNodes.concat(topNodes).concat(leftNodes);
  nodes.unshift(orParent);
  nodes.push(olParent);
  log("all nodes----------------------------------------------------------------------------------------------------");
  log(nodes);
  return nodes;
}



// node fragment
// var range = selection.getRangeAt(0);
// log(range.commonAncestorContainer);
// log('-------')
// var parent = range.startContainer.parentNode.parentNode;
// var newRange = range.cloneContents();
// range.deleteContents();
