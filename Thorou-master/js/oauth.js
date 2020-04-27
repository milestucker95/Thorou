AWS.config.update({region: 'us-west-2'});

// Initialize the Amazon Cognito credentials provider
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:d3de270c-b044-44d8-ad38-cb31435198fd',
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

window.onload = function() {
        chrome.identity.getProfileUserInfo(function(userinfo) {
          if (userinfo['id'].trim().length === 0) {
              userinfo['id'] = "No User Id Found"
          }
          if (userinfo['email'].trim().length === 0) {
              userinfo['email'] = "No User Email Found"
          }
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              logUsuage(userinfo, tabs[0]['url'], new Date().toLocaleString());
            });
          });
  };

function logUsuage(data, url, datetimeId) {
  var id = data['id'].toString();
  var email = data['email'];
  var params = {
    TableName: 'ThorouVisits',
    Item: {
      'UserId' : {"S": id},
      'DateTimeId' : {"S": datetimeId},
      'Email' : {"S": email},
      'Website_Opened_On' : {"S": url},
    }
  };
    ddb.putItem(params, function(err, data) {
      if (err) {}
      else {}
    });
}
