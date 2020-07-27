/*
Just draw a border round the document.body.
*/
// var dom = new DOMParser().parseFromString('<div class="Popover position-absolute" style="display: none; outline: currentcolor none medium; position: absolute !important;" tabindex="0">  <div class="Popover-message Popover-message--large Box box-shadow-large Popover-message--bottom-left" style="width:360px;"></div></div>');

var log = console.log;
document.body.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  if(event.target.tagName == "A")  {
    // log(event.target);
    // log(event.taget.text);
    log("event is ---------- url is:" + event.target.href);
    browser.runtime.sendMessage({"url": event.target.href});
    // document.body.appendChild(dom);
  }
  // reset the color after a short delay
});


document.body.addEventListener("mouseout", function( event ) {
  // highlight the mouseover target
  // reset the color after a short delay
});


document.body.addEventListener("click", function( event ) {
  // highlight the mouseover target
  // reset the color after a short delay
  log("event is ---------- url is:" + event.target.href);
  browser.runtime.sendMessage({"url": event.target.href});
});
