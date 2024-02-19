export const getAttributes = (baseURLApp, mobileAPIToken, companyID, navigation) => {
const URL = baseURLApp + `/GetPunchAttribute?companyID=`+companyID;
var bearer = 'Bearer ' + mobileAPIToken;
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) =>  response.json())
}