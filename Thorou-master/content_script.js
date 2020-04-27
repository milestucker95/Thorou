chrome.runtime.sendMessage({isShopping: true}, function(response) {
});

var uri = location.href;
var category = undefined;

function appendButton(divClassName) {
  // console.log(	document.getElementsByClassName(divClassName));
    var div = document.createElement('div');
    div.classList.add('dropdown');
  	var buttonEl =  document.createElement("button");
    buttonEl.className = "website_button";
    buttonEl.innerHTML = '  Maximize Your Credit Card Points';
    div.appendChild(buttonEl);
    var divDropDown = document.createElement('div');
    divDropDown.classList.add('dropdown-content');
    var image = document.createElement('img');
    image.src = chrome.runtime.getURL('imgs/thorou_used-1.gif');
    image.style="width:300px;height:600px;"
    divDropDown.appendChild(image);
    div.appendChild(divDropDown);
    document.getElementsByClassName(divClassName)[0].appendChild(div);
}

if (uri.includes("tripadvisor") || uri.includes("expedia") || uri.includes("booking") ||
uri.includes("delta") || uri.includes("kayak") || uri.includes("https://www.google.com/flights") || uri.includes("alaskaair") ||
uri.includes("booking") || uri.includes("priceline") || uri.includes("orbitz") || uri.includes("travelocity") ||
uri.includes("aa.com/") || uri.includes("flyfrontier") || uri.includes("jetblue") || uri.includes("southwest") ||
uri.includes("spirit.com") || uri.includes("united.com") || uri.includes("hotels.com") || uri.includes("enterprise.com") ||
uri.includes("hotwire.com") || uri.includes("trivago") || uri.includes("travelsites.com") || uri.includes("google.com/flights") ||
uri.includes("cheapflights.com") || uri.includes("cheapoair") || uri.includes("skyscanner") || uri.includes("justfly") || uri.includes("momondo"))
{
  category = "travel";
}
else
{
  category = "other";
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getCategory":
                console.log("content script: " + category);
                sendResponse(category);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);

window.addEventListener('load', function() {
  if(uri.includes("amazon"))
  {
    appendButton("a-row continue-buttons place-order-button");
  }
  else if(uri.includes("expedia"))
  {
    appendButton("col secondary-content")
  }
});
