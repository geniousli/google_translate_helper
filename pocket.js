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

  var result = findNodes(selection.focusNode, selection.anchorNode, selection.focusOffset, selection.anchorOffset);
  result.nodes.forEach((node)=> highlight(node))

  var leftNode = result.lNode;
  var rightNode = result.rNode;

  var leftOffset = result.lOffset;
  var rightOffset = result.rOffset;

  if(leftNode == rightNode) {
    highlightWithOffest(rightNode, rightOffset, leftOffset);
  }else {
    highlightWithOffest(leftNode, 0, leftOffset);
    highlightWithOffest(rightNode, rightOffset);
  }
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
      if(end == start) {continue;}
      var str = content.substring(start, end);

      if(start == from && end == to) {
        domAry.push(lightSpan(str));
      }else {
        domAry.push(document.createTextNode(str));
      }
      start = end;
    }
    domAry.forEach((node) => parent.insertBefore(node, sib));
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
    var newNode = null
    if(node.nodeType == Node.TEXT_NODE) {
      newNode = lightSpan(node.textContent);
    }else {
      newNode = lightSpan(node.textContent);
    }
    parent.replaceChild(newNode, node);
  }
}

function findCommonNode(aNode, bNode, aOffset, bOffset) {
  var aPath = [];
  var bPath = [];
  var oaNode = aNode;
  var obNode = bNode;
  var parent = null;
  while(true) {
    bPath.push(obNode);
    aPath.push(oaNode);
    if(bPath.indexOf(oaNode) > -1) {
      parent = oaNode;
      break;
    }
    if(aPath.indexOf(obNode) > -1) {
      parent = obNode;
      break;
    }
    obNode = obNode.parentNode;
    oaNode = oaNode.parentNode;
  }
  var aindex = aPath.indexOf(parent);
  var aIsRight = true;
  if(aindex == 0 ){
    if(aOffset > bOffset) {
      aIsRight = false
    }
  }else {
    var bindex = bPath.indexOf(parent);
    var aTop = aPath[aindex - 1];
    var bTop = bPath[bindex - 1];
    while(aTop = aTop.nextSibling) {
      if(aTop == bTop) {
        break;
      }
    }
    if(aTop != bTop) {
      aIsRight = false
    }
  }
  if(aIsRight) {
    return {"parent": parent, "rNode": aNode, "rPath": aPath, "lNode": bNode, "lPath": bPath, "lOffset": bOffset, "rOffset": aOffset};
  }else {
    return {"parent": parent, "rNode": bNode, "rPath": bPath, "lNode": aNode, "lPath": aPath, "lOffset": aOffset, "rOffset": bOffset};
  }
}

function findNodes(lParent, rParent, lOffset, rOffset) {
  var result = findCommonNode(lParent, rParent, lOffset, rOffset);

  var parent = result.parent;
  var rightParents = result.rPath;
  var leftParents = result.lPath;
  var orParent = result.rNode;
  var olParent = result.lNode;

  var index = rightParents.indexOf(parent);
  var rights = rightParents.slice(0, index);
  var topRight = rights.pop();

  var rightNodes =
      rights.map((tab) => {
        var next = tab;
        while(next = next.nextSibling) {
          ary.push(next);
        }
        return ary;
      }).flat(Infinity);


  var index = leftParents.indexOf(parent);
  var lefts = leftParents.slice(0, index);
  var topLeft = lefts.pop();

  var leftNodes =
      lefts.reverse().map((tab) => {
        var next = tab;
        while(next = next.nextSibling) {
          ary.push(next);
        }
        return ary;
      }).flat(Infinity);

  var topNodes = [];
  if(topRight && topLeft) {
    while((topRight = topRight.nextSibling) != topLeft) {
      topNodes.push(topRight);
    }
  }

  log("---------------------------------------------------------------------------------------------------- left nodes begins");
  leftNodes.forEach((tab) => log(tab) )

  log("---------------------------------------------------------------------------------------------------- right nodes begins");
  rightNodes.forEach((tab) => log(tab) )

  log("---------------------------------------------------------------------------------------------------- right nodes begins");
  topNodes.forEach((tab) => log(tab))

  var nodes = rightNodes.concat(topNodes).concat(leftNodes);
  log(nodes);

  return {"nodes": nodes, "parent": parent, "rNode": orParent, "lNode": olParent, "lOffset": result.lOffset, "rOffset": result.rOffset};
}
