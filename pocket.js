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
  if(selection.isCollapsed) {
    return;
  }
  log('selection --------------------');
  log(selection);
  log('selection --------------------');
  var result = findNodes(selection.focusNode, selection.anchorNode);
  var nodes = result.nodes;
  var commParent = result.parent;
  log('nodes after filter --------------------');
  log(nodes);

  var first = nodes[0];
  var last = nodes[nodes.length - 1];
  nodes.slice(1, -1).forEach((node)=> highlight(node))
  log('text nodes --------------------');
  log(first);
  log(last);
  highlightWithOffest(last, 0, selection.focusOffset);
  highlightWithOffest(first, selection.anchorOffset);
  // textNodes.forEach((tab) => {
  //   console.log(tab.textContent || tab.innerText)
  // })
  // log(textNodes);
});


function lightSpan(content) {
  var span = document.createElement('span');
  span.style.backgroundColor = 'yellow';
  span.innerHTML = content;
  return span;
}

function highlightWithOffest(node, from, to) {
  if(nodeIstext(node)) {
    var parent = node.parentElement;
    var sib = node.nextSibling;
    node.remove();
    var content = node.textContent;
    if(!to){
      to = content.length;
    }
    var ary = [0, from, to, content.length];
    var u_ary = [];
    ary.forEach((item)  => {
      if(u_ary.indexOf(item) <= -1){
        u_ary.push(item);
      }
    })

    var domAry = [];
    var start = 0;
    while(start < content.length) {
      var end = u_ary.shift();
      if(end == start) {
        continue;
      }
      var str = content.substring(start, end);

      if(start == from && end == to) {
        domAry.push(lightSpan(str));
      }else {
        domAry.push(document.createTextNode(str));
      }
      start = end;
    }
    domAry.forEach((node) => {
      parent.insertBefore(node, sib);
    })

  }
}

function nodeIstext(node) {
  return (node.nodeType == Node.TEXT_NODE && !node.textContent.match(/^\s\s*\s$/) && node.textContent.trim() != "");
}

function highlight(node) {
  node.childNodes.forEach((node) => {
    highlight(node)
  })
  if(nodeIstext(node)) {
    var parent = node.parentElement;
    var sib = node.nextSibling;
    node.remove();
    var newNode = null
    if(node.nodeType == Node.TEXT_NODE) {
      newNode = lightSpan(node.textContent);
    }else {
      newNode = lightSpan(node.textContent);
    }
    parent.insertBefore(newNode, sib);
  }
}


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
  log("---------------------------------------------------------------------------------------------------- left nodes begins");
  leftNodes.forEach((tab) => {
    log(tab);
  })
  log("---------------------------------------------------------------------------------------------------- right nodes begins");
  rightNodes.forEach((tab) => {
    log(tab);
  })

  log("---------------------------------------------------------------------------------------------------- right nodes begins");

  topNodes.forEach((tab) => {
    log(tab);
  })
  var nodes = rightNodes.concat(topNodes).concat(leftNodes);
  nodes.unshift(orParent);
  nodes.push(olParent);
  log(nodes);
  return {"nodes": nodes, "parent": parent};
}
