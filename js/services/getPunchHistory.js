import DateTimePicker from "react-native-modal-datetime-picker";

export const getPunchHistory = (baseURLApp, employeeID, companyID, mobileAPIToken,locationID, dateFrom, dateTo) => {

    var details = {
        employeeID: employeeID, 
        companyID: companyID,
        locationID: locationID, 
        dateFrom: dateFrom, 
        dateTo: dateTo, 
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp+`/getDakarPunches`;
var bearer = 'Bearer ' + mobileAPIToken;
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