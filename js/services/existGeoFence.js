import DateTimePicker from "react-native-modal-datetime-picker";

export const existGeoFence = (baseURLApp, tokenParam, userID, latitude, longitude, punchType, email, attributeValueID, attributeValue) => {
    var details = {
       punchType: punchType,
         employeeID: userID, 
         longitude: longitude, 
         latitude: latitude,
         employeeEmail: email, 
         attributeValueID: attributeValueID, 
         attributeValue: attributeValue,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");


var bearer = 'Bearer ' + tokenParam;
const URL = baseURLApp+`/ExistInLocation`;
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