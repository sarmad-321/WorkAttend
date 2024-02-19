export const savePunch = (baseURLApp, tokenParam,employeeID, date, time, punchType, locationID, createdOn, email) => {
    var details = {
      employeeID: employeeID,
       punchType: punchType,
       locationID: locationID,
         punchDate: date, 
         punchTime: time,
         createdBy: 'mobileApp', 
         createdOn:createdOn,
         employeeEmail: email,
  };

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const URL = baseURLApp+`/SaveGeoPunch`;
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