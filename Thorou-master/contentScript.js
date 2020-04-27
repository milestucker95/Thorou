chrome.runtime.sendMessage({isShopping: true}, function(response) {
});

var uri = location.href;

function appendButton(divClassName) {
    var div = document.createElement('div');
    div.classList.add('dropdown');
  	var buttonEl =  document.createElement("button");
    buttonEl.href = chrome.extension.getURL('css/main.css');
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

window.addEventListener('load', function() {

var price = undefined;
var category = "other";

if(uri.includes("amazon"))
{
  var element = document.getElementsByClassName("a-color-price a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap")[0];
  var priceString = element.innerText;
  price =  parseFloat(priceString.substring(1));
  appendButton("a-row continue-buttons place-order-button");
}
else if(uri.includes("nordstrom"))
{
var element = document.getElementsByClassName("_2SCqQ")[0].getElementsByClassName("_28K-E")[0];
var priceString = element.innerText;
price =  parseFloat(priceString.substring(1));
}
else if(uri.includes("walmart"))
{
var element = document.getElementsByClassName("order-summary-grand-total order-summary-line")[0].getElementsByClassName("Discount order-summary-price text-right")[0];

var priceString = element.innerText;
price =  parseFloat(priceString.substring(1));
}
else if(uri.includes("ebay"))
{
var element = document.getElementsByClassName("val-col total-row")[0];
var priceString = element.innerText;
price =  parseFloat(priceString.substring(1));
}
else if(uri.includes("booking"))
{
var element = document.getElementsByClassName("jq-tooltip bp_pricedetails_total_value")[0];
var priceString = element.innerText;
price =  parseFloat(priceString.substring(1));
category = "travel";
}
else if(uri.includes("expedia"))
{
var element = document.getElementsByClassName("package-price-total right sub-price-amount")[0].getElementsByClassName("visuallyhidden")[0];
var priceString = element.innerText;
price =  parseFloat(priceString.substring(1));
category = "travel";

}
else if(uri.includes("tripadvisor"))
{
var element = document.getElementsByClassName("items_price_total")[0].getElementsByClassName("total_price")[0].innerText;
}

var obj = {
  "price": price,
  "category": category
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getPrice":
                console.log("content script: " + obj);
                sendResponse(obj);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);
});
