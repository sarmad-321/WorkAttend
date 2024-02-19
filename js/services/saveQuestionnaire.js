import DateTimePicker from "react-native-modal-datetime-picker";

export const saveQuestionnaire = (baseURLApp, tokenParam, userID, latitude, longitude, punchType, email, companyID, questions, selectedAttributeID, selectedPunchAttValue) => {
    var details = {
         questionAnswers: questions,
         punchType: punchType,
         employeeID: userID, 
         longitude: longitude, 
         latitude: latitude,
         employeeEmail: email, 
         companyID: companyID,
         attributeValueID: selectedAttributeID, 
         attributeValue: selectedPunchAttValue
        };
  //alert(JSON.stringify(questions));

var formBody = [];
/*for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}*/
formBody = JSON.stringify(details);


var bearer = 'Bearer ' + tokenParam;
const URL = baseURLApp+`/saveEmployeeQuestionnaire`;
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      },
      body: formBody
    })
    .then((response) =>  response.json())
  /*  .then((responsenew) =>  
{
  alert(tokenParam +" *" + deviceIDParam +"* " + manufacturerParam +" *"+ JSON.stringify(responsenew) + responsenew.errorMessage)
}) */   
}