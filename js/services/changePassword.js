export const changePassword = (baseURLApp,tokenParam,email,oldPassword, newPassword) => {
    var details = {
      userName: email,
      newPassword: newPassword, 
      oldPassword: oldPassword,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp + `/changePassword`;
var bearer = 'Bearer ' + tokenParam;
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) =>  response.json())
  /*  .then((responsenew) =>  
{
  alert(tokenParam +" *" + deviceIDParam +"* " + manufacturerParam +" *"+ JSON.stringify(responsenew) + responsenew.errorMessage)
}) */   
}