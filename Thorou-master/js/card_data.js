var Chase_Sapphire_Reserve = {
  "dining": 3,
  "travel": 3,
  "other": 1
}

var Chase_Freedom = {
  "dining": 1,
  "grocery_store": 1.05,
  "travel": 1,
  "other": 1
}

var Chase_Freedom_Unlimited = {
  "dining": 1.015,
  "travel": 1.015,
  "other": 1.015
}

var Discover_it = {
  "travel": 1.05,
  "other": 1.05
}

var Citi_Double_Cash = {
  "travel": 1.02,
  "other": 1.02
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
       chrome.tabs.sendMessage(tabs[0].id, {type: "getPrice"}, function(obj) {
      var price = obj.price;
      var category = obj.category;
         if(price == undefined)
         {
           return;
         }
         if(obj.category == "travel")
         {

         }
         if (user.cards.chase_freedom)
         {
           var travel_points = 0;
           var cash_back = 0;

           travel_points = (Math.round(price * Chase_Freedom.travel * 100) / 100).toFixed(2);

            var travel_text = document.getElementById("chase_freedom_points");
            travel_text.innerText = travel_points + points;

         }
         else{
           var card = document.getElementById("chase_freedom");
           card.style.display = "none";
         }

         if (user.cards.chase_sapphire_reserve)
         {
           var travel_points = 0;
           var cash_back = 0;

           travel_points = (Math.round(price * Chase_Sapphire_Reserve[category]* 100) / 100).toFixed(2);
           var travel_text = document.getElementById("chase_sapphire_points");
           travel_text.innerText = travel_points + points;

         }
         else{
           var card = document.getElementById("chase_sapphire_reserve");     // t.innerText = travel_points;
           card.style.display = "none";
         }

         if (user.cards.chase_freedom_unlimited)
         {
           var travel_points = 0;
           var cash_back = 0;

           travel_points = (Math.round(price * Chase_Freedom_Unlimited.travel * 100) / 100).toFixed(2);
           var travel_text = document.getElementById("freedom_unlimited_points");
           travel_text.innerText = travel_points + points;

         }
         else{
           var card = document.getElementById("chase_freedom_unlimited");     // t.innerText = travel_points;
           card.style.display = "none";
         }
         if (user.cards.discover)
         {
           var travel_points = 0;
           var cash_back = 0;
           travel_points = (Math.round(price * Discover_it.online_shopping * 100) / 100).toFixed(2);
           var travel_text = document.getElementById("discover_it_points");
           travel_text.innerText = travel_points + points;

         }
         else{
           var card = document.getElementById("discover_it");     // t.innerText = travel_points;
           card.style.display = "none";
         }

         if (user.cards.citi_double_cash)
         {
           var travel_points = 0;
           var cash_back = 0;
           travel_points = (Math.round(price * Citi_Double_Cash.all * 100) / 100).toFixed(2);
           var travel_text = document.getElementById("citi_double_cash_points");
           travel_text.innerText = travel_points + points;

         }
         else{
           var card = document.getElementById("citi_double_cash");     // t.innerText = travel_points;
           card.style.display = "none";
         }
       });
   });
