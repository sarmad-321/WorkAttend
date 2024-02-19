import DateTimePicker from "react-native-modal-datetime-picker";

export const getLocation = (baseURLApp, mobileAPIToken, companyID) => {
const URL = baseURLApp + `/getLocation?companyId=`+companyID;
var bearer = 'Bearer ' + mobileAPIToken;
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) =>  response.json())
  /*  .then((responsenew) =>  
{
  alert(tokenParam +" *" + deviceIDParam +"* " + manufacturerParam +" *"+ JSON.stringify(responsenew) + responsenew.errorMessage)
}) */   
}