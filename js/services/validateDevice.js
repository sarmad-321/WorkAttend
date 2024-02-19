export const validateDevice = (baseURLApp, tokenParam, employeeID, appVersion, manufacturer, deviceID) => {
    var details = {
      employeeID: employeeID,
      appVersion: appVersion, 
      storeProvider: manufacturer,
      deviceID: deviceID,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp+`/validateDevice`;
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
}