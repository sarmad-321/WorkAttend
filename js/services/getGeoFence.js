import DateTimePicker from "react-native-modal-datetime-picker";


export const getGeoFence = (baseURLApp, tokenParam, mobileUserID) => {

    var details = {
        userID: mobileUserID,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp + `/GetUserLocation?userID=` + mobileUserID;
var bearer = 'Bearer ' + tokenParam;
//alert(bearer);
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) =>  response.json()) 
}