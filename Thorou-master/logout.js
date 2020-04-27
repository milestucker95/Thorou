
var list_of_cards = ["Chase Freedom", "Chase Freedom Unlimited", "Chase Sapphire Reserve"];

document.body.onload = function() {
var obj = {};

  for (var i = 0; i < list_of_cards.length; i++) {
    var card = "card";
    var b = card.concat(String([i+1]));
    obj[b] = list_of_cards[i];
    //alert(obj[b]);
    chrome.storage.sync.set(obj, function() {
      if (chrome.runtime.error) {
        alert("runtime error");
      }
    });
  }
}


document.getElementById("logout_button").onclick = function() {
  chrome.storage.sync.get(null, function(items) {
      const allKeys = Object.keys(items);
      alert(allKeys[3]);
      for(const key in allKeys){
        var tag = document.createElement("H3");
        //alert(key);
        var card = document.createTextNode(items[key]);
        tag.appendChild(card);
        var element = document.getElementById("list_cards");
        element.appendChild(tag);
      }

  });
}
