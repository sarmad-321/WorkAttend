export const storeAppVersion = (baseURLApp, tokenParam, employeeID, appVersion, manufacturer) => {
    var details = {
      employeeID: employeeID,
      appVersion: appVersion, 
      storeProvider: manufacturer,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp+`/updateAppVersion`;
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