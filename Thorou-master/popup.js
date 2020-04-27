document.getElementById("signup_or_login").onclick = function () {
        chrome.windows.create({'url': 'google_signin.html', 'type': 'popup'}, function(window) {
        });
    };
