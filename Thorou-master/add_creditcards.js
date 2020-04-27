AWS.config.update({region: 'us-west-2'});

// Initialize the Amazon Cognito credentials provider
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:d3de270c-b044-44d8-ad38-cb31435198fd',
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

document.getElementById('complete_signup_button').onclick = function () {
  chrome.identity.getProfileUserInfo(function(userinfo){
           uniqueId=userinfo.id;
           addCreditCards(userinfo.id).then(function(JSON) {
             chrome.tabs.getCurrent(function(tab) {
               chrome.tabs.remove(tab.id, function() { });
             });
           });
         });
};

function addCreditCards(userId) {
  var table = "Users";
  var id = userId;
  var params = {
      TableName: table,
      Key:{
          "UserId": {
            N: id
        }
      },
      UpdateExpression: "SET SupportedCreditCards = :sc, UnsupportedCreditCards = :uc",
      ExpressionAttributeValues:{
        ':sc' : {
          "L": [
              {"M": {"hasChaseSapphire": {"BOOL": document.getElementById("ChaseSapphireReserveCheckBox").checked }}},
              {"M": {"hasChaseFreedomUnlimited": {"BOOL": document.getElementById("ChaseFreedomUnlimitedCheckbox").checked }}},
              {"M": {"hasChaseFreedom": {"BOOL": document.getElementById("ChaseFreedomCheckbox").checked }}},
              {"M": {"hasOtherCards": {"BOOL": document.getElementById("OtherCheckbox").checked }}},
            ]
          },
        ':uc': { "S": document.getElementById("textAreaSignup").value }

        },
      ReturnValues:"UPDATED_NEW"
    };
    return new Promise((resolve, reject) =>  {
      ddb.updateItem(params, function(err, data) {
          if (err) {
              console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
              reject(JSON.stringify(err, null, 2));
          } else {
              console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
              resolve(JSON.stringify(data, null, 2))
          }
      });
    });
}
