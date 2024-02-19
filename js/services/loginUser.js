import DateTimePicker from "react-native-modal-datetime-picker";

export const loginUser = (baseURLApp, tokenParam, deviceIDParam, manufacturerParam) => {
    var details = {
        token: tokenParam,
        deviceID: deviceIDParam, 
        manufacturer: manufacturerParam
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
var URL = baseURLApp.toLowerCase();
URL = URL.replace('/resource','/home/login');

//const URL = baseURLApp+`https://mobileapi.dakarhr.com/api/home/login`;
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