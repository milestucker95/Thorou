chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
                // alert("hello");

    if (request.isShopping == true)
    {
      sendResponse({farewell: "goodbye"});
      chrome.browserAction.setIcon({
          path : {
            "128": "imgs/Thorou_logo_green.png",
            "16": "imgs/Thorou_logo_green.png",
            "48": "imgs/Thorou_logo_green.png"
          }
        });
    }

  });
