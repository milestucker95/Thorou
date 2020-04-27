var Chase_Sapphire_Reserve = {
  "dining": "3x",
  "travel": "3x",
  "other": "1x"
}

var Chase_Freedom = {
  "dining": "1x",
  "grocery_store": "1.05x",
  "travel": "1x",
  "other": "1x"
}

var Chase_Freedom_Unlimited = {
  "dining": "1.015x",
  "travel": "1.015x",
  "other": "1.015x"
}

var Discover_it = {
  "travel": "1.05x",
  "other": "1.05x"
}

var Citi_Double_Cash = {
  "travel": "1.02x",
  "other": "1.02x"
}

const points = " points";


var user = {
"email" : "miles@gmail.com",
"cards" : {
  "chase_sapphire_reserve": true,
  "chase_freedom": true,
  "chase_freedom_unlimited": true,
  "discover": true,
  "citi_double_cash": true
  }
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {type: "getCategory"}, function(category) {

      if(category == "travel")
      {
        var freedom_travel_text = document.getElementById("chase_freedom_points");
        freedom_travel_text.innerText = Chase_Freedom.travel;

        var sapphire_travel_text = document.getElementById("chase_sapphire_points");
        sapphire_travel_text.innerText = Chase_Sapphire_Reserve.travel;

        var freedom_unlimited_travel_text = document.getElementById("freedom_unlimited_points");
        freedom_unlimited_travel_text.innerText = Chase_Freedom.travel;

        var citi_travel_text = document.getElementById("citi_double_cash_points");
        citi_travel_text.innerText = Citi_Double_Cash.travel;

        var discover_travel_text = document.getElementById("discover_it_points");
        discover_travel_text.innerText = Discover_it.travel;
      }
      else if(category == "other")
      {
        var freedom_travel_text = document.getElementById("chase_freedom_points");
        freedom_travel_text.innerText = Chase_Freedom.other;

        var sapphire_travel_text = document.getElementById("chase_sapphire_points");
        sapphire_travel_text.innerText = Chase_Sapphire_Reserve.other;

        var freedom_unlimited_travel_text = document.getElementById("freedom_unlimited_points");
        freedom_unlimited_travel_text.innerText = Chase_Freedom.other;

        var citi_travel_text = document.getElementById("citi_double_cash_points");
        citi_travel_text.innerText = Citi_Double_Cash.other;

        var discover_travel_text = document.getElementById("discover_it_points");
        discover_travel_text.innerText = Discover_it.other;
      }
   });
 });
